import json
import mysql.connector
from mysql.connector import errorcode
from dotenv import load_dotenv
import os

load_dotenv()

JSON_PATH = 'shopping_data.json'

DB_CONFIG = {
    'host': '127.0.0.1',
    'user': os.getenv("DB_USER"),
    'password': os.getenv("DB_PASS"),
    'database': os.getenv("DB_NAME"),
    'raise_on_warnings': True,
}

def load_data(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_products(raw):
    products = []
    for record in raw:
        for key in ('parent_product', 'child_products'):
            results = record.get(key, {}).get('shopping_results', [])
            products.extend(results)
    return products

def get_existing_tuples(cursor):
    cursor.execute("""
        SELECT
          rating, title, image_url, product_link,
          price, discount_price, nr_reviews, category
        FROM products
    """)
    seen = set()
    for rating, title, img, link, price, dprice, revs, cat in cursor:
        seen.add((
            float(rating) if rating is not None else None,
            title,
            img,
            link,
            float(price)   if price   is not None else None,
            float(dprice)  if dprice  is not None else None,
            revs,
            cat,
        ))
    return seen

def main():
    # 1) Load & flatten JSON
    raw_items = load_data(JSON_PATH)
    products  = extract_products(raw_items)

    # 2) Connect to MariaDB
    try:
        cnx = mysql.connector.connect(**DB_CONFIG)
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Access denied: check your credentials")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
        return

    cur = cnx.cursor()
    existing = get_existing_tuples(cur)

    # 3) Prepare insertion 
    insert_sql = """
    INSERT INTO products
      (rating, title, image_url, product_link,
       price, discount_price, nr_reviews, category)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """

    added = 0
    for p in products:
        tup = (
            float(p.get('rating'))              if p.get('rating')             is not None else None,
            p.get('title'),
            p.get('thumbnail'),
            p.get('product_link'),
            float(p.get('extracted_price'))     if p.get('extracted_price')     is not None else None,
            float(p.get('extracted_old_price')) if p.get('extracted_old_price') is not None else None,
            p.get('reviews'),
            p.get('category'),
        )

        if tup in existing:
            continue

        cur.execute(insert_sql, tup)
        existing.add(tup)
        added += 1

    cnx.commit()
    cur.close()
    cnx.close()

    print(f"Inserted {added} new products; skipped exact duplicates.")

if __name__ == '__main__':
    main()
