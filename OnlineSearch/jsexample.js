function searchOnline(searchStr) {
    let searchPromise = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve("Success!");
            } else if (this.readyState == 4) {
                reject("Failed : (");
            }
        }
        request.open("POST", "http://localhost/COS221_Assignment5/test_api.php");
        request.send(JSON.stringify({
            "type": "SearchOnline",
            "searchTerm": searchStr
        }));
    })
    console.log("Loading...");
    searchPromise.then((data) => {
        console.log(data);
        console.log("Done loading");
    })
    .catch((error) => {
        console.log(error);
    })
}

document.getElementById("search-form").addEventListener("submit", (event) => {
    event.preventDefault();
    let searchTerm = document.getElementById("search-term").value;
    // console.log(searchTerm);
    searchOnline(searchTerm);
})