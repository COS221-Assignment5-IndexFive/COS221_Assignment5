<?php
header('Content-Type: application/json');
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require_once 'utils.php';
require_once 'endpoints/login.php';
require_once 'endpoints/retailers.php';
require_once 'endpoints/users.php';
require_once 'endpoints/products.php';
require_once 'endpoints/productsHandler.php';
require_once 'endpoints/watchList.php';

class API {

  private $conn;

	public static function instance() {
		static $instance = null;
		if ($instance === null)
			$instance = new API();
		return $instance;
	}

	private function __construct() {
    require_once 'config.php';
		$this->conn = $connection;
		$this->conn->select_db($_ENV['DB_NAME']);
	}

	public function __destruct() {
		$this->conn->close();
	}

	public function handleRequest() {

    $input = json_decode(file_get_contents("php://input"), true);
    // echo json_encode(['input' => $input]);

		$action = $input['type'] ?? $_POST['type'] ?? $_GET['type'] ?? null;

		if (!$action) {
			sendResponse($success=false, $data = null, $message = 'No action specified.', $statusCode = 400) ;
			exit;
		}

		switch ($action) 
    {
      case 'Signup':
				signup($this->conn,  $input);
        break;
      case 'Login':
				login($this->conn,  $input);
        break;
      case 'addRetailer':
        addRetailer($this->conn, $input);
        break;
      case 'updateRetailer':
        updateRetailer($this->conn, $input);
      case 'removeRetailer':
        removeRetailer($this->conn, $input);
        break;
      case 'getAllRetailers':
        getAllRetailers($this->conn);
        break;
      case 'addUser':
        addUser($this->conn, $input);
        break;
      case 'removeUser':
        removeUser($this->conn, $input);
        break;
      case 'getAllUsers':
        getAllUsers($this->conn);
        break;
      // only administrators or retails can use these
      case 'addProduct':
        addProduct($this->conn, $input);
        break;
      case 'deleteProduct':
        deleteProduct($this->conn, $input);
        break;
      case 'updateProduct':
        updateProduct($this->conn, $input);
        break;
      // everyone can use these
      case 'GetProducts': // retuns all products in the products table
        getProducts($this->conn, $input);
        break;
      case 'getProductByID': // retunrs details about a specific product (Id)
        getProductByID($this->conn, $input);
        break;
      case 'getCategories': // retunrs all unique categories currently in the products table
        getCategories($this->conn, $input);
        break;

      case 'AddWatchlist': 
        addToWatchlist($this->conn, $input);
        break;

      case 'GetWatchlist': 
        getWatchlist($this->conn);
        break;

      case 'DeleteWatchlist': 
        removeFromWatchlist($this->conn, $input);
        break;

      case 'UpdateUser':
        updateUser($this->conn, $input);
        break;   

			default:
        sendResponse($success=false, $data = null, $message = 'Invalid action', $statusCode = 400) ;
				break;
		}
	}
}

API::instance()->handleRequest();
?>