<?php
session_start() ;


function addUser($connection, $data) {
    if (!isset($_SESSION['user_id']) || !isAdmin($connection, $_SESSION['user_id'])) {
        sendResponse(false, null, 'Unauthorized: Admin access required.', 403);
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
    $apikey = bin2hex(random_bytes(32));

    $stmt = $connection->prepare("INSERT INTO users (password_hash, first_name, last_name, cell_number, email_address, apikey) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $password, $first_name, $last_name, $cell, $email, $apikey);

    if ($stmt->execute()) {
        sendResponse(true, ['user_id' => $stmt->insert_id], 'User added successfully.', 201);
    } else {
        sendResponse(false, null, 'Failed to add user: ' . $stmt->error, 500);
    }
}


function removeUser($connection, $data) {
    if (!isset($_SESSION['user_id']) || !isAdmin($connection, $_SESSION['user_id'])) {
        sendResponse(false, null, 'Unauthorized: Admin access required.', 403);
    }

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
    $stmt = $connection->prepare("SELECT user_id, first_name, last_name, email_address, cell_number, apikey FROM users");
    if (!$stmt) {
        sendResponse(false, null, 'Failed to prepare statement: ' . $connection->error, 500);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    sendResponse(true, $users, 'Users fetched successfully.', 200);
}
