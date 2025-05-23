from flask import Flask, request
from get_products import Products
from populate_db import Populate

prod = Products()
popl = Populate()

app = Flask(__name__)

@app.route('/')
def index():
    search_str = request.args.get("search")
    print(search_str)
    if search_str == "" or search_str == None:
        return "error"
    
    print("Searching for: " + search_str)

    try:
        rec = prod.compile_out(search_str)
        popl.main(rec)
        return "success"

    except BaseException as e:
        return "error"

if __name__ == '__main__':
    app.run(debug=True, port=10111)
