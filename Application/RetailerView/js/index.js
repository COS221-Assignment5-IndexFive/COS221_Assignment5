// Add "click" event listeners to redirect to approprate details page


document.querySelectorAll(`.clickable-row-product`).forEach(row => {
    row.addEventListener("click", () => {
        var id = row.childNodes[1].innerHTML;
        window.location.href = `product_details.php?id=${id}`;
    });
});



