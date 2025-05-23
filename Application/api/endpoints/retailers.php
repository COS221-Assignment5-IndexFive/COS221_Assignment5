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

    $retailer_name = $data['retailer_name'];
    $num_products = $data['num_products'] ?? -1;

    $stmt = $connection->prepare("INSERT INTO retailers (retailer_name, num_products) VALUES (?, ?)");
    if (!$stmt) {
        sendResponse(false, null, 'Failed to prepare statement: ' . $connection->error, 500);
    }
    $stmt->bind_param("si", $retailer_name, $num_products);

    if ($stmt->execute()) {
        sendResponse(true, ['retailer_id' => $stmt->insert_id], 'Retailer added successfully.', 201);
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

    $stmt = $connection->prepare("DELETE FROM retailers WHERE retailer_id = ?");
    if (!$stmt) {
        sendResponse(false, null, 'Failed to prepare statement: ' . $connection->error, 500);
    }
    $stmt->bind_param("i", $retailer_id);

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
    $stmt = $connection->prepare("SELECT retailer_id, retailer_name, num_products FROM retailers");
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
