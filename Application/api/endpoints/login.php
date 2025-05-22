<?php
ob_start();
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
    $email = $data['email'];
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

            sendResponse(true, ['apikey' => $row['apikey'], 'user_type' => $user_type], 'Login successful.', 200);
        } else {
            sendResponse(false, null, 'Invalid password.', 401);
        }
    } else {
        sendResponse(false, null, 'User not found.', 404);
    }
}
