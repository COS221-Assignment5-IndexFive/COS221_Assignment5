"""
Dependencies:
- pip install serpapi
- pip install google-search-results
- pip install python-dotenv
- Valid API key stored in .env file (in same directory) -> SERPAPI_API_KEY=<key>
"""

import os
import json
import time
import copy
from serpapi import GoogleSearch
from dotenv import load_dotenv

class Products:
    def __init__(self):
        load_dotenv()

    def fetch(self, queries, num_products = 10):
        """
        For each query:
        • Build search_parameters (engine + q + num)
        • Fetch results via SerpApi
        • Flatten and filter all items with "position" into shopping_results
        • Append one parent record per query into output_file’s JSON array
        """
        api_key = os.getenv("SERPAPI_API_KEY")
        if not api_key:
            raise ValueError("Provide SerpApi API key via argument or SERPAPI_API_KEY env var")

        for q in queries:
            print(f"Querying for ${q}...")
            # prepare params (omit api_key in output)
            params = {"engine": "google_shopping", "q": q, "num": num_products}
            try:
                search = GoogleSearch({**params, "api_key": api_key})
                results = search.get_dict()
            except (Exception) as e:
                print(f"[ERROR] Query '{q}' failed: {e}, skipping...")
                continue
            print(f"Query for ${q} successful!")

            print(f"Processing query results for ${q}")
            # Flatten all shopping_results with a "position" key
            top  = [item for item in results.get("shopping_results", []) if "position" in item]
            flat = top[:]
            for cat in results.get("categorized_shopping_results", []):
                flat.extend([item for item in cat.get("shopping_results", []) if "position" in item])

            for item in flat:
                item["category"] = q
            
            # build the parent record
            record = {
                "search_parameters": params,
                "shopping_results": flat
            }

            print(f"Finished processing query results for ${q}")


            return record 

    def compile_out(self, search_str, output_file="shopping_data.json"):
        """
        Selects a product from a category, i.e. lenovo laptop, takes that title as search string
        Searches for more products that match the title, i.e. more lenovo laptops to facilitate
        price comparison.
        """
        requests_made = 0

        record = self.fetch([search_str])

        return json.dumps(record)