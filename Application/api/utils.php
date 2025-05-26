<?php
// isAdmin($connection, $user_id):
// returns true if there exists at least 1 administrator with a matching id, therefore the user is an administrator
// retuns false otherwise - making the logged in user either a retailer or a normal user
function isAdmin($connection, $user_id)
{
    $stmt = $connection->prepare("SELECT 1 FROM administrator WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    return $stmt->get_result()->num_rows > 0;
}

// isRetailer($connection, $user_id):
// returns true if there exists at least 1 retailer with a matching id, therefore the user is an retailer
// retuns false otherwise - making the logged in user either a administrator or a normal user
function isRetailer($connection, $user_id)
{
    $stmt = $connection->prepare("SELECT 1 FROM retailers WHERE retailer_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    return $stmt->get_result()->num_rows > 0;
}

function sendResponse($success, $data = null, $message = '', $statusCode = 200)
{
    http_response_code($statusCode);

    if (ob_get_length()) {
        ob_clean();
    }

    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'statusCode' => $statusCode ,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}

function validateEmail($email) {
    return preg_match("/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i", $email);
}

function validatePhone($phoneNum) {
    return preg_match("/^\+?\d{11}$|^\d{10}$/", $phoneNum);
}