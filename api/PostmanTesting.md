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

Repeat for:

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
