document.getElementById("logout").addEventListener("click", (event) => {
    sessionStorage.clear();
    window.location.href = "../php/logout.php";
});