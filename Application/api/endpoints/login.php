<?php
ob_start();

if (session_status() === PHP_SESSION_NONE) 
{
    session_start();
}

function signup($connection, $data)
{
    // Check for required fields (everything from the request is required)
    $required = ['name', 'surname', 'cell_number', 'email', 'password'];
    foreach ($required as $field) 
    {
        if (empty($data[$field])) 
        {
            sendResponse(false, null, "Missing required field: $field", 400);
        }
    }

    // Validate all the fields
    if (!preg_match('/^[A-Za-z]{2,}$/', $data['name'])) 
    {
        sendResponse(false, null, "Invalid name format.", 400);
    }
    if (!preg_match('/^[A-Za-z]{2,}$/', $data['surname'])) 
    {
        sendResponse(false, null, "Invalid surname format.", 400);
    }

    if (!preg_match('/^\d{10,15}$/', $data['cell_number'])) 
    {
        sendResponse(false, null, "Invalid phone number format.", 400);
    }

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) 
    {
        sendResponse(false, null, "Invalid email format.", 400);
    }

    if (!preg_match('/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/', $data['password'])) 
    {
        sendResponse(false, null, "Password must be at least 8 characters and include uppercase, lowercase, digit, and special character.", 400);
    }

    $stmt = $connection->prepare("SELECT user_id FROM users WHERE email_address = ?");
    $stmt->bind_param("s", $data['email']);
    $stmt->execute();
    $stmt->store_result();

    // Check that there won't be 1+ user with the same email
    if ($stmt->num_rows > 0)
    {
        sendResponse(false, null, "Email already registered.", 409);
    }
    $stmt->close();

    $hashed = password_hash($data["password"], PASSWORD_DEFAULT);
    $apikey = bin2hex(random_bytes(16));


    $stmt = $connection->prepare("
        INSERT INTO users (password_hash, first_name, last_name, cell_number, email_address, apikey)
        VALUES (?, ?, ?, ?, ?, ?)
    ");

    if (!$stmt) 
    {
        sendResponse($success=false, $data=null,$message='Preparation failed: ' . $connection->error, $statusCode=500);
    }

    $stmt->bind_param(
        "ssssss",
        $hashed,
        $data["name"],
        $data["surname"],
        $data["cell_number"],
        $data["email"],
        $apikey
    );

    $result = $stmt->execute();

    // Set session variables to ensure user is automatically logged in after signup
    if ($result)
    {
        $user_id = $connection->insert_id;
        $user_type = 'user';
        $_SESSION['user_id'] = $user_id;
        $_SESSION['user_type'] = $user_type;

        sendResponse($success=true, $data=['apikey' => $apikey ], $message='User registered successfully.', $statusCode=200);
    } 
    else 
    {
        sendResponse($success=false, $data=null,$message='Registration failed: ' . $stmt->error, $statusCode=500);
    }
}

function login($connection, $data)
{
    // Validate required fields
    if (empty($data['email']) || empty($data['password']))
    {
        sendResponse(false, null, "Email and password required.", 400);
    }

    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) 
    {
        sendResponse(false, null, "Invalid email format.", 400);
    }

    $email = $data['email'];
    $password = $data['password'];

    $stmt = $connection->prepare("SELECT user_id, password_hash, apikey FROM users WHERE email_address = ?");

    if (!$stmt) 
    {
        sendResponse(false, null, 'Preparation failed: ' . $connection->error, 500);
        ob_end_flush();
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $row = $result->fetch_assoc()) 
    {
        if (password_verify($password, $row['password_hash'])) // Password matches
        {
            $user_id = $row['user_id'];
            $user_type = 'user';                                                // default, normal user - minimal privledges

            if (isAdmin($connection, $user_id)) 
            {
                $user_type = 'admin';                                           // administrative users - max priveldges
            } 
            elseif (isRetailer($connection, $user_id)) 
            {
                $user_type = 'retailer';                                        // retailer - can control their products
            }

            $_SESSION['user_id'] = $user_id;
            $_SESSION['user_type'] = $user_type;

            sendResponse(true, ['apikey' => $row['apikey'], 'user_type' => $user_type], 'Login successful.', 200);
        } 
        else 
        {
            sendResponse(false, null, 'Invalid password.', 401);
        }
    } 
    else 
    {
        sendResponse(false, null, 'User not found.', 404);
    }
}