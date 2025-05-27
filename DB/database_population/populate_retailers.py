import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
import requests

load_dotenv()

url = "http://172.27.112.1/COS221_Assignment5/Application/api/api.php"

try:
    connection = mysql.connector.connect(
        host = os.getenv("DB_HOST"),
        user = os.getenv("DB_USER"),
        password = os.getenv("DB_PASS"),
        database = os.getenv("DB_NAME")
    )
    if connection.is_connected():
        print("Connected to MySQL database")
        cursor = connection.cursor()
        cursor.execute("SELECT retailer_name FROM retailers")
        results = cursor.fetchall()

        existing_retailers = []

        for result in results:
            existing_retailers.append(result[0])

        cursor.close()

        cursor = connection.cursor()
        cursor.execute("SELECT DISTINCT retailer FROM products")
        results = cursor.fetchall()
        retailers = []
        # I know this is inefficient but I tired
        for result in results:
            retailers.append(result[0])
        
        for retailer in retailers:
            if (retailer in existing_retailers):
                continue
            retailer_name = retailer
            retailer_email = "comparit.retailer@" + retailer.lower().replace(" ", "").split(".")[0] + ".com"
            password = os.getenv("DEFAULT_PASS")

            cell_num = "0000000000" # Placeholders

            data = {
                "type": "addRetailer",
                "retailer_name": retailer,
                "email_address": retailer_email,
                "first_name": retailer,
                "last_name": retailer,
                "password": password,
                "cell_number": cell_num
            }

            response = requests.post(url, json=data)

            if response.status_code == 200:
                print("Successfully added retailer profile for retailer " + retailer)
                print(response.text)
            else:
                print("Failed to add retailer profile for retailer " + retailer)
                print(response.text)
            

except Error as e:
    print(f"Error: {e}")

finally:
    if 'connection' in locals() and connection.is_connected():
        connection.close()
        print("MySQL connection closed")