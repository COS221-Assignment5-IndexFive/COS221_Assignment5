<?php
session_start();




function register($connection, $data)
{


    $hashed = password_hash($data["password"], PASSWORD_DEFAULT);
    $aoikey = bin2hex(random_bytes(16)); // generating the api key - 32 char alphanumeric


    // note user_id == auto increment
    $stmt = $connection->prepare("
        INSERT INTO users (password_hash, first_name, last_name, cell_number, email_address, apikey)
        VALUES (?, ?, ?, ?, ?, ?)
    ");

    if (!$stmt) {
        sendResponse($success=false, $data=null,$message='Preparation failed: ' . $connection->error, $statusCode=500);
    }

    $cellNumber = $data["cell_number"] ?? '';

    $stmt->bind_param(
        "ssssss",
        $hashed,
        $data["name"],
        $data["surname"],
        $cellNumber,
        $data["email"],
        $aoikey
    ) ;

    $result = $stmt->execute();

    if ($result) {
        sendResponse($success=true, $data=['apikey' => $aoikey ],$message='User registered successfully.', $statusCode=200);
    } else {
        sendResponse($success=false, $data=null,$message='Registration failed: ' . $stmt->error, $statusCode=500);
    }
}



// function login($connection, $data): check the email and password against the what is stored in the database
function login($connection, $data)
{
    $email = $data['email_address'];
    $password = $data['password'];

    $stmt = $connection->prepare("SELECT user_id, password_hash, apikey FROM users WHERE email_address = ?");
    if (!$stmt) {
        sendResponse(false, null, 'Preparation failed: ' . $connection->error, 500);
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $row = $result->fetch_assoc()) {
        if (password_verify($password, $row['password_hash'])) // Password matches
        {
            $user_id = $row['user_id'];

            // for the $_SESSION : determine what priveledges this suer has
            $user_type = 'user';                                                // default, normal user - minimal privledges

            if (isAdmin($connection, $user_id)) {
                $user_type = 'admin';                                           // administrative users - max priveldges
            } elseif (isRetailer($connection, $user_id)) {
                $user_type = 'retailer';                                        // retailer - can control their products
            }

            // save to SESSION[] - to control privledhes
            $_SESSION['user_id'] = $user_id;
            $_SESSION['user_type'] = $user_type;

            sendResponse($success=true, $data=['apikey' => $result['apikey'], 'user_type' => $user_type],  $message='Login successful.', $statusCode=200);
        } else {
            sendResponse(false, null, 'Invalid password.', 401);
        }
    } else {
        sendResponse(false, null, 'User not found.', 404);
    }
}

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
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'statusCode' => $statusCode ,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}


?>
