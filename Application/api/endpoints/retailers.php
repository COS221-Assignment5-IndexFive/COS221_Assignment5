<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// adding a retailer into the retailers table - only an administrator is allowed
function addRetailer($connection, $data) {
    if (!isset($_SESSION['user_id']) || !isAdmin($connection, $_SESSION['user_id'])) {
        sendResponse(false, null, 'Unauthorized: Admin access required.', 403);
    }

    if (empty($data['retailer_name'])) {
        sendResponse(false, null, 'Retailer name is required.', 400);
    }

    $required = ['email_address', 'password', 'first_name'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            sendResponse(false, null, "$field is required.", 400);
        }
    }

    $email = $data['email_address'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    $first_name = $data['first_name'];
    $last_name = $data['last_name'] ?? null;
    $cell = $data['cell_number'] ?? null;

    $stmt = $connection->prepare("INSERT INTO users (password_hash, first_name, last_name, cell_number, email_address) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $password, $first_name, $last_name, $cell, $email);

    if (!$stmt->execute()) {
        sendResponse(false, null, 'Failed to add user: ' . $stmt->error, 500);
    } 
    $id = $connection->insert_id;
    $stmt->close();

    $retailer_name = $data['retailer_name'];
    $num_products = $data['num_products'] ?? -1;

    $stmt = $connection->prepare("INSERT INTO retailers (retailer_id, retailer_name, num_products) VALUES (?, ?, ?)");
    if (!$stmt) {
        sendResponse(false, null, 'Failed to prepare statement: ' . $connection->error, 500);
    }
    $stmt->bind_param("isi",$id, $retailer_name, $num_products);

    if ($stmt->execute()) {
        sendResponse(true, ['retailer_id' => $stmt->insert_id], 'Retailer added successfully.', 200);
    } else {
        sendResponse(false, null, 'Failed to add retailer: ' . $stmt->error, 500);
    }
}


// removing a retailer into the retailers table - only an administrator is allowed
function removeRetailer($connection, $data) {
    if (!isset($_SESSION['user_id']) || !isAdmin($connection, $_SESSION['user_id'])) {
        sendResponse(false, null, 'Unauthorized: Admin access required.', 403);
    }

    if (empty($data['retailer_id'])) {
        sendResponse(false, null, 'Retailer ID is required.', 400);
    }

    $retailer_id = intval($data['retailer_id']);

    $stmt = $connection->prepare("DELETE FROM users WHERE user_id = ?");
    $stmt->bind_param("i", $retailer_id);

    if (!$stmt->execute()) {
        $stmt->close();
        sendResponse(false, null, 'Failed to remove user: ' . $stmt->error, 500);
    }
    else
    {
        $stmt->close();
        sendResponse(true, null, 'Retailer removed successfully.', 200);
    }

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            sendResponse(true, null, 'Retailer removed successfully.', 200);
        } else {
            sendResponse(false, null, 'No retailer found with that ID.', 404);
        }
    } else {
        sendResponse(false, null, 'Failed to remove retailer: ' . $stmt->error, 500);
    }
}


function getAllRetailers($connection) {
    $stmt = $connection->prepare("SELECT * FROM retailers JOIN users ON retailers.retailer_id = users.user_id");
    if (!$stmt) {
        sendResponse(false, null, 'Failed to prepare statement: ' . $connection->error, 500);
    }
    $stmt->execute();
    $result = $stmt->get_result();

    $retailers = [];
    while ($row = $result->fetch_assoc()) {
        $retailers[] = $row;
    }

    sendResponse(true, $retailers, 'Retailers fetched successfully.', 200);
}

function updateRetailer($connection, $data) {
    echo var_dump($data);
    if (!key_exists("retailer_id", $data)) {
        sendResponse(false, null, 'retailer_id required', 400);
    }

    $ret_id = $data["retailer_id"];

    $id = $ret_id;

    $update = true;
    $updateString = "UPDATE users SET ";
    // Validate that none of the updated fields are null
    $newFirstName = null;
    if (key_exists('first_name', $data)) {
        if ($data['first_name'] != null && trim($data['first_name']) != '') {
            $updateString .= "first_name = ?, ";
            $newFirstName = $data['first_name'];
        } else {
            $update = false;
        }
    } else {
        sendResponse(false, null, 'first_name field is missing from request', 400);
    }

    $newLastName = null;
    if (key_exists('last_name', $data)) {
        if ($data['last_name'] != null && trim($data['last_name']) != '') {
            $updateString .= "last_name = ?, ";
            $newLastName = $data['last_name'];
        } else {
            $update = false;
        }
    } else {
        sendResponse(false, null, 'last_name field is missing from request', 400);
    }

    $newEmail = null;
    if (key_exists('email_address', $data)) {
        // email regex
        if (validateEmail($data['email_address'])) {
            $updateString .= 'email_address = ?, ';
            $newEmail = $data['email_address'];
        } else {
            $update = false;
        }
    } else {
        sendResponse(false, null, 'email_address field is missing from request', 400);
    }

    $newPhone = null;
    if (key_exists('cell_number', $data)) {
        if (validatePhone($data['cell_number'])) {
            $updateString .= 'cell_number = ?, ';
            $newPhone = $data['cell_number'];
        } else {
            $update = false;
        }
    } else {
        sendResponse(false, null, 'cell_number field is missing from request', 400);
    }

    if (!$update) {
        sendResponse(false, null, 'Invalid update request', 400);
    }

    $updateString = substr($updateString, 0, -2);
    $updateString .= " WHERE user_id = ?";

    $stmt = $connection->prepare($updateString);
    $stmt->bind_param('ssssi', $newFirstName, $newLastName, $newEmail, $newPhone, $id);
    
    if (!$stmt->execute()) {
        $stmt->close();
        sendResponse(false, null, 'Failed to update user ' . $id , 500);
    } else {
        $stmt->close();
    }

    if (key_exists("retailer_name", $data)) {
        $stmt = $connection->prepare("UPDATE retailers SET retailer_name = ? WHERE retailer_id = ?");
        $stmt->bind_param("si", $data["retailer_name"], $ret_id);
        if ($stmt->execute()) {
            sendResponse(true, $retailers, 'Retailers updated successfully.', 200);
        } else {
            sendResponse(false, null, 'Could not update retailer ' . $connection->error, 500);
        }
    }
}