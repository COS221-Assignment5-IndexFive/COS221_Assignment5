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
from serpapi import GoogleSearch
from dotenv import load_dotenv

load_dotenv()

def fetch_and_save_shopping(queries, output_file="shopping_data_test.json"):
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

    # load existing data
    if os.path.isfile(output_file) and os.path.getsize(output_file) > 0:
        with open(output_file, "r", encoding="utf-8") as f:
            try:
                all_data = json.load(f)
            except json.JSONDecodeError:
                print("Could not load existing file, will overwrite...")
                all_data = []
    else:
        all_data = []

    for q in queries:
        print(f"Querying for ${q}...")
        # prepare params (omit api_key in output)
        params = {"engine": "google_shopping", "q": q, "num": 100}
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
        all_data.append(record)

        print(f"Finished processing query results for ${q}")

        # pause for rate-limit 
        time.sleep(1)

    # write back out
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)

    print(f"Saved {len(all_data)} total query records to '{output_file}'")

tech_categories = [
    "Laptops",
    "Desktop Computers",
    "Tablets",
    "Smartphones",
    "Monitors",
    "Computer Mice",
    "Keyboards",
    "Computer Speakers",
    "Headphones & Earbuds",
    "Webcams",
    "Routers & Networking Devices",
    "Internal Hard Drives & SSDs",
    "External Hard Drives",
    "USB Flash Drives",
    "Graphics Cards (GPUs)",
    "Motherboards",
    "Power Supplies (PSUs)",
    "Computer RAM",
    "Computer Cases",
    "CPU Processors",
    "Cables & Adapters",
    "Chargers & Power Banks",
    "Phone Cases & Screen Protectors",
    "Smartwatches & Fitness Trackers",
    "Wearable Tech Accessories",
    "Printers & Scanners",
    "Docking Stations & Hubs",
    "Cooling Pads & Laptop Stands",
    "Projectors",
    "VR Headsets"
]

fetch_and_save_shopping(tech_categories)