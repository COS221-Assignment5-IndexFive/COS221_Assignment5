// Add "click" event listeners to redirect to approprate details page

function redirectOnRowClick(entityType, newURL) {
    document.querySelectorAll(`.clickable-row-${entityType}`).forEach(row => {
        row.addEventListener("click", () => {
            var id = row.childNodes[0].innerHTML;
            window.location.href = `${newURL}?id=${id}`;
        });
    });
}

redirectOnRowClick("user", "single_user_view.php");
redirectOnRowClick("product", "product_details.php");
redirectOnRowClick("retailer", "retailer_detail.php");



