export class ApiUtils {
    constructor() { }

    getRequest(requestObj) {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();

            request.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    resolve(response.data);
                } else if (this.readyState == 4) {
                    reject("Failed to fetch " + requestObj["type"] + ", status code: " + this.status);
                }
            }

            request.open("POST", "http://localhost/Application/api/api.php", true);
            request.send(JSON.stringify(requestObj));
        });
    }
}