import os
from mysql.connector import Error
from dotenv import load_dotenv
import mysql.connector

# Load environment variables from .env file
load_dotenv()

try:
    connection = mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASS"),
        database=os.getenv("DB_NAME")
    )
    if connection.is_connected():
        print("Connected to MySQL database")
        cursor = connection.cursor()
        cursor.execute("SELECT products.product_id, retailers.retailer_id FROM products, retailers WHERE products.retailer = retailers.retailer_name")
        results = cursor.fetchall()
        cursor.close()

        for result in results:
            cursor = connection.cursor()
            cursor.execute(f"UPDATE products SET retailer_id = {result[1]} WHERE product_id = {result[0]}")
            connection.commit()
            print("Matched retailer for product " + str(result[0]))
            cursor.close()

except Error as e:
    print(f"Error: {e}")

finally:
    if 'connection' in locals() and connection.is_connected():
        connection.close()
