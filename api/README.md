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
    └── dashboard.php # return top rated products from watchlist table
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
#### expects:
```json
{
  "action": "signup", // tells the api which endpoint to go to
  "first_name": "John",
  "last_name": "Doe",
  "cell_number": "1234567890",
  "email_address": "john@example.com",
  "password": "secret123" // will be hashed in the DB
}


```
#### successful return
```json
{
  "success": true,
  "message": "User registered successfully.",
  "data": null
}
```
### LOGIN  Endpoint
#### expects:
```json
{
  "action": "login",
  "email_address": "john@example.com",
  "password": "secret123"
}

```
#### successful return
```json
{
    "success": true,
    "statusCode": 200,
    "message": "Login successful.",
    "data": {
        "user_id": 1,
        "user_type": "user" // 'user_type' is stored in the $_SESSION[] - controls privledges of logged in users
    }
}
```

### products.php
#### expects:
```json

```
#### returns
```json

```

### retailers.php
#### expects:
```json

```
#### returns
```json

```


### watchlist.php
#### expects:
```json

```
#### returns
```json

```


### dashboard.php
#### expects:
```json

```
#### returns
```json

```



# Schemas:
### Users Table Schema

| #  | Column Name     | Type          | Collation            | Attributes      | Null | Default | Extra           | Notes             |
|----|------------------|---------------|-----------------------|------------------|------|---------|------------------|--------------------|
| 1  | `user_id`        | `int(11)`      |                       |                  | No   | None    | AUTO_INCREMENT  | Primary Key        |
| 2  | `password_hash`  | `varchar(255)` | `utf8mb4_general_ci`  |                  | No   | None    |                  | Hashed password    |
| 3  | `first_name`     | `varchar(50)`  | `utf8mb4_general_ci`  |                  | No   | None    |                  |                    |
| 4  | `last_name`      | `varchar(50)`  | `utf8mb4_general_ci`  |                  | Yes  | NULL    |                  | Optional           |
| 5  | `cell_number`    | `char(10)`     | `utf8mb4_general_ci`  |                  | No   | None    |                  |                    |
| 6  | `email_address`  | `varchar(150)` | `utf8mb4_general_ci`  |                  | Yes  | NULL    |                  | Indexedm           |


### Admin Table Schema

| #  | Name            | Type      | Collation           | Attributes | Null | Default | Extra          |
|----|-----------------|-----------|---------------------|------------|------|---------|----------------|
| 1  | `user_id`       | int(11)   | —                   | —          | No   | None    | AUTO_INCREMENT |
| 2  | `privilege_level` | int(11) | —                   | —          | Yes  | 0       | —              |


### Retailer Table Schema:
### 🏪 Retailers Table Schema

| #  | Name           | Type         | Collation           | Attributes | Null | Default | Extra          |
|----|----------------|--------------|----------------------|------------|------|---------|----------------|
| 1  | `retailer_id`   | int(11)      | —                    | —          | No   | None    | AUTO_INCREMENT |
| 2  | `retailer_name` | varchar(200) | utf8mb4_general_ci   | —          | No   | None    | —              |
| 3  | `num_products`  | int(11)      | —                    | —          | Yes  | -1      | —              |
