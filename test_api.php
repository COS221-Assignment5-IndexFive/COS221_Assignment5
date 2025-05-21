<?php

class Api {
    private $requestData;

    public function __construct() {
        $raw = file_get_contents('php://input');

        $this->requestData = json_decode($raw, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo json_encode([
                'error' => 'Invalid JSON: ' . json_last_error_msg()
            ]);
            die;
        }

        $this->onlineSearch();

    }

    private function error($code, $message) {
        http_response_code($code);
        header('Content-Type: application/json');
        echo json_encode([
            "status" => "error",
            "Message" => $message
        ]);
    }   

    private function onlineSearch() {
        /*
        Proposed structure:
        {
            "type": "SearchOnline",
            "searchTerm": <String>,
            "apiKey": <String>
        }

        Where the api key is the users api key for authentication, if not authentication via api key
        then some other authentication
        */
        if (!key_exists("searchTerm", $this->requestData) || !is_string($this->requestData["searchTerm"])) {
            // Return 400 error, bad request
            $this->error(400, "Invalid search term");
        }
        
        $search_term = $this->requestData["searchTerm"];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "http://localhost:10111?search=" . urlencode($search_term));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);

        if ($response == "success") {
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode([
                "status" => "success",
                "Message" => "Search successful for " . $search_term 
            ]);
        } else {
            $this->error(500, "Search failed for " . $search_term);
        }
    }
}

new Api();
