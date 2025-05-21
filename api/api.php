<?php
header('Content-Type: application/json');

require_once 'endpoints/login.php';

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
    echo json_encode(['input' => $input]);

		$action = $input['type'] ?? $_POST['type'] ?? $_GET['type'] ?? null;

		if (!$action) {
			sendResponse($success=false, $data = null, $message = 'No action specified.', $statusCode = 400) ;
			exit;
		}

		switch ($action) {
      case 'Register':
				register($this->conn,  $input);
        break;
      case 'Login':
				login($this->conn,  $input);
        break;
			default:
        sendResponse($success=false, $data = null, $message = 'Invalid action', $statusCode = 400) ;
				break;
		}
	}
}

API::instance()->handleRequest();
?>
