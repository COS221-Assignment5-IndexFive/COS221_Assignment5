<?php
function authUsers($connection) {
    if (!isset($_SESSION['user_id']) || !isAdmin($connection, $_SESSION['user_id'])) {
        sendResponse(false, null, 'Unauthorized: Admin access required.', 403);
    }
}

function addUser($connection, $data) {
    authUsers($connection);
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
    $apikey = bin2hex(random_bytes(16));

    $stmt = $connection->prepare("INSERT INTO users (password_hash, first_name, last_name, cell_number, email_address, apikey) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $password, $first_name, $last_name, $cell, $email, $apikey);

    if ($stmt->execute()) {
        sendResponse(true, ['user_id' => $stmt->insert_id], 'User added successfully.', 200);
    } else {
        sendResponse(false, null, 'Failed to add user: ' . $stmt->error, 500);
    }
}


function removeUser($connection, $data) {
    authUsers($connection);
    if (empty($data['user_id'])) {
        sendResponse(false, null, 'User ID is required.', 400);
    }

    $stmt = $connection->prepare("DELETE FROM users WHERE user_id = ?");
    $stmt->bind_param("i", $data['user_id']);

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            sendResponse(true, null, 'User removed successfully.', 200);
        } else {
            sendResponse(false, null, 'No user found with that ID.', 404);
        }
    } else {
        sendResponse(false, null, 'Failed to remove user: ' . $stmt->error, 500);
    }
}

function getAllUsers($connection) {
    authUsers($connection);

    $stmt = $connection->prepare("SELECT user_id, first_name, last_name, email_address, cell_number FROM users WHERE user_id NOT IN (SELECT retailer_id FROM retailers)");
    if (!$stmt) {
        sendResponse(false, null, 'Failed to prepare statement: ' . $connection->error, 500);
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    $stmt->close();

    sendResponse(true, $users, 'Users fetched successfully.', 200);
}

function updateUser($connection, $data) {
    authUsers($connection);
    // Validate ID
    $id = null;
    if (!key_exists('user_id', $data)) {
        sendResponse(false, null, 'user_id field is missing from request', 400);
    }

    $id = $data['user_id'];

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
    
    if ($stmt->execute()) {
        $stmt->close();
        sendResponse(true, null, 'User ' . $id . " updated", 200);
    } else {
        $stmt->close();
        sendResponse(false, null, 'Failed to update user ' . $id , 500);
    }
}