Absolutely! Here's the clean and simple version for your documentation or testing notes:

---

# Testing `retailers`:

## Step 1 – Login so that you have `user_type == admin`:

**Request** (POST to `api.php`):

```json
{
  "type": "Login",
  "email": "MorganWattrus@email.com",
  "password": "yourPasswordHere"
}
```

**Expected Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful.",
  "data": {
    "apikey": "e90a18557d2adfd915956360ea6b61e1",
    "user_type": "admin"
  }
}
```

 Make sure cookies/session in  postman are working so subsequent requests are authorised.

---

## Step 2 – Add Retailers:
**Request** (POST to `api.php`):

```json
{
  "type": "addRetailer",
  "retailer_name": "Tech Universe"
}
```

**Expected Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Retailer added successfully."
}
```

Repeat: 

```json
{
  "type": "addRetailer",
  "retailer_name": "Gadget Galaxy"
}
```

```json
{
  "type": "addRetailer",
  "retailer_name": "Device Depot"
}
```

---

## Step 3 – Get All Retailers:

**Request**:

```json
{
  "type": "getAllRetailers"
}
```

**Expected Response** (example):

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Retailers retrieved successfully.",
  "data": [
    {
      "id": 1,
      "retailer_name": "Tech Universe",
      "num_products": -1
    },
    {
      "id": 2,
      "retailer_name": "Gadget Galaxy",
      "num_products": -1
    },
    {
      "id": 3,
      "retailer_name": "Device Depot",
      "num_products": -1
    }
  ]
}
```

---

## Step 4 – Remove a Retailer:

**Request** (e.g., to remove retailer with `retailer_id = 2`):

```json
{
  "type": "removeRetailer",
  "retailer_id": 2
}
```

**Expected Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Retailer removed successfully."
}
```


---

# Testing `users`:
## Step 1 – Login so that you have `user_type == admin`:

**Request** (POST to `api.php`):
```json
{
  "type": "Login",
  "email": "MorganWattrus@email.com",
  "password": "yourPasswordHere"
}
```

**Expected Response**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login successful.",
  "data": {
    "apikey": "e90a18557d2adfd915956360ea6b61e1",
    "user_type": "admin"
  }
}
```

## Step 2 – Add Users:
**Request**:
```json
{
  "type": "addUser",
  "email_address": "testuser1@example.com",
  "password": "password123",
  "first_name": "Test",
  "last_name": "User1",
  "cell_number": "0123456789"
}
```
```json
{
  "type": "addUser",
  "email_address": "testuser2@example.com",
  "password": "password123",
  "first_name": "Test",
  "last_name": "User2",
  "cell_number": "0987654321"
}
```
```json
{
  "success": true,
  "statusCode": 201,
  "message": "User added successfully.",
  "data": {
    "user_id": 9
  }
}
```

---

## Step 3 – Get All Users:
**Request**:
```json
{
  "type": "getAllUsers"
}
```

**Expected Response** (example):
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Users fetched successfully.",
  "data": [
    {
      "user_id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email_address": "john@example.com",
      "cell_number": "1234567890",
      "apikey": "..."
    },
    {
      "user_id": 9,
      "first_name": "Test",
      "last_name": "User1",
      "email_address": "testuser1@example.com",
      "cell_number": "0123456789",
      "apikey": "..."
    }
  ]
}
```

## Step 4 – Remove a User:
**Request** (e.g., remove user with `user_id = 9`):
```json
{
  "type": "removeUser",
  "user_id": 9
}
```

**Expected Response**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User removed successfully."
}
```
