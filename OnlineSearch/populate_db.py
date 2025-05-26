import json
import mysql.connector
from mysql.connector import errorcode
from dotenv import load_dotenv
import os

class Populate:
    def __init__(self):
        load_dotenv()

        self.DB_CONFIG = {
            'host': '127.0.0.1',
            'user': os.getenv("DB_USER"),
            'password': os.getenv("DB_PASS"),
            'database': os.getenv("DB_NAME"),
            'raise_on_warnings': True,
        }

    def extract_products(self, raw):
        products = []
        # print(raw["shopping_results"])
        results = raw.get('shopping_results', [])
        products.extend(results)
        return products

    def get_existing_tuples(self, cursor):
        cursor.execute("""
            SELECT
            rating, title, image_url, product_link,
            price, discount_price, nr_reviews, category, retailer
            FROM products
        """)
        seen = set()
        for rating, title, img, link, price, dprice, revs, cat, ret in cursor:
            seen.add((
                float(rating) if rating is not None else None,
                title,
                img,
                link,
                float(price)   if price   is not None else None,
                float(dprice)  if dprice  is not None else None,
                revs,
                cat,
                ret
            ))
        return seen

    def price(self, p):
        if (p.get('extracted_old_price')):
            return float(p.get('extracted_old_price'))
        if (p.get('extracted_price')):
            return float(p.get('extracted_price'))
        return None

    def discountedPrice(self, p):
        if (p.get('extracted_old_price')):
            return float(p.get('extracted_price'))
        return None

    def main(self, record):
        # 1) Load & flatten JSON
        raw_items = json.loads(record)
        products  = self.extract_products(raw_items)

        # 2) Connect to MariaDB
        try:
            cnx = mysql.connector.connect(**self.DB_CONFIG)
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Access denied: check your credentials")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Database does not exist")
            else:
                print(err)
            return

        cur = cnx.cursor()
        existing = self.get_existing_tuples(cur)

        # 3) Prepare insertion 
        insert_sql = """
        INSERT INTO products
        (rating, title, image_url, product_link,
        price, discount_price, nr_reviews, category, retailer)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        added = 0
        allowed_categories = [
            "Laptops",
            "Desktop Computers",
            "Tablets",
            "Smartphones",
            "Monitors",
            "Keyboards & Computer Mice",
            "Headphones & Earbuds",
        ]

        most_recent_category = allowed_categories[0]
        for p in products:
            tup = (
                float(p.get('rating')) if p.get('rating') is not None else None,
                p.get('title'),
                p.get('thumbnail'),
                p.get('product_link'),
                self.price(p),
                self.discountedPrice(p),
                p.get('reviews'),
                p.get('category') if p.get('category') in allowed_categories else most_recent_category,
                p.get('source').split('-')[0].rstrip()
            )

            if (p.get('category') in allowed_categories and p.get('category') != most_recent_category):
                most_recent_category = p.get('category')
                print(f'Moving on to new category: {most_recent_category}')

            if tup in existing:
                continue

            cur.execute(insert_sql, tup)
            existing.add(tup)
            added += 1

        cnx.commit()
        cur.close()
        cnx.close()

        print(f"Inserted {added} new products; skipped exact duplicates.")
