// Add "click" event listeners to redirect to approprate details page

function redirectOnRowClick(entityType, newURL) {
    document.querySelectorAll(`.clickable-row-${entityType}`).forEach(row => {
        row.addEventListener("click", () => {
            console.log(`${entityType} clicked`);
            var id = row.childNodes[1].innerHTML;
            window.location.href = `${newURL}?id=${id}`;
        });
    });
}

redirectOnRowClick("user", "single_user_view.html");
redirectOnRowClick("product", "product_details.html");
redirectOnRowClick("retailer", "retailer_detail.html");



