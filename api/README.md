# functionaity of the api
# structure
```bash
api/
│
├── api.php
├── .env # make git ignore this == password for DB
└── endpoints/
    ├── login.php
    ├── products.php # Admin & reailers can add / remove products Users can sort/filter/search products & add to watchlist
    ├── retailers.php # retailers can add / remove products they're sellring
    ├── watchlist.php # users add / remove from their watchlist
    └── administrator.php
```


# Expected JSON Structure for each endpoint:
## api.php
### expects:
```json
{
  "action":
}

```

## login.php
Functionality the login endpoint executes. <br>
users login, the user type is determined by the login endpoint in the following manner:
* the current user_id is compared to the administator table to see if one can find a matching user_id therefore the user is an admisnistrator and has specific privledges priveledges
* the current user_id is compared to the retailer table to see if one can find a matching retailer_id therefore the user is an retaioler and has specific privledges priveledges
### SIGNUP  Endpoint
```js

// Expected request structure:
{
    type: "Signup",
    name: nameField.value,
    surname: surnameField.value,
    email: emailField.value,
    password: passwordField.value,
    cell_number: cellPhoneField.value,
};
// Expected response structure
{
    status: <status message>
    data: [apikey: <user's apikey>]
}

```

### LOGIN  Endpoint
```js
// Expected request structure:
{
    type: "Login",
    email: emailField.value,
    password: passwordField.value,
};
// Expected response structure
{
    status: <status message>
    data: [apikey: <user's apikey>]
}
```

### products.php
Functionality the products endpoint executes. <br>
_This endpoint handles the following functions_ <br>
* adding a product from the products table
* removing a product from the products table
* This endpoint controls the following queries:
  * returning ALL products currently in the table
  * returing products of a specific rating (a filter from the users)
  * returing products of a specific price range (a filter from the users)
  * returing products of a specific / specified category(s) (a filter from the users)
  * etc
#### adding a product
NOTE: only admin and retailers can preform these actions

#### removing a product
NOTE: only admin and retailers can preform these actions

#### retuning all product(s)


### retailers.php
Functionality the retailers endpoint executes. <br>
_This endpoint handles the following functions_ <br>
* adding a retailer from the products table
* removing a retailer from the products table
* returning ALL retialers currently in the table

#### adding a retialer
NOTE: only admin can preform these actions

```json
{
  "type": "addRetailer",
  "retailer_name": "New Retailer Name"
}
```

**Success Response:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Retailer added successfully.",
  "data": {
    "retailer_id": 15
  }
}
```

#### removing a retailer
NOTE: only admin can preform these actions

**Request Format:**
```json
{
  "type": "removeRetailer",
  "retailer_id": 12
}
```

**Success Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Retailer removed successfully."
}
```

#### retuning all retailers

**Request Format:**
```json
{
  "type": "getAllRetailers"
}
```

**Success Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Retailers retrieved successfully.",
  "data": [
    {
      "retailer_id": 1,
      "retailer_name": "Retailer A",
      "num_products": 5
    },
    {
      "retailer_id": 2,
      "retailer_name": "Retailer B",
      "num_products": 8
    }
  ]
}
```


### watchlist.php
Functionality the watchlist endpoint executes. <br>
_This endpoint handles the following functions_ <br>
* addign products to the watchlist
* removing products from the watchlist
* retunring all producst in the watchlist

#### adding to watchlist

#### removing to watchlist

#### retuning all products in watchlist
