function getLoggedUser() {
    return sessionStorage.getItem("loggedUser");
}

function getUsers() {
    return JSON.parse(localStorage.getItem("users"));
}

function getUser() {
    let users = getUsers();
    let user = null;
    users.forEach(userInUsers => {
        if (userInUsers.name == getLoggedUser()) {
            user = userInUsers;
        }
    });
    return user;
}

function getInventory() {
    return JSON.parse(localStorage.getItem("inventory"));
}

















function main() {
    let user = getUser();

    let cart = user.cart;
    for (i = 0; i < cart.length; i++) {
        let cartItem = cart[i];

        let item = null;
        let items = getInventory();
        items.forEach(itemInInventory => {
            if (itemInInventory.name == cartItem.name) {
                item = itemInInventory;
            }
        });

        let cartItemElement = document.createElement("tr");
        cartItemElement.classList.add("cart-item");
        cartItemElement.innerHTML =
            "<td class=\"item-img-title\">" +
            "<h3 class=\"item-name\">" + item.name + "</h3>" +
            "<img src=\"./assets/images/inventory/" + item.img + "\" class=\"item-img\">" +
            "</td>" +
            "</td>" +
            "<td class=\"item-price\">$" + item.price.toFixed(2) + "</td>" +
            "<td>" +
            "<p class=\"item-qty\">" + cartItem.qty + "</p>" +
            "</td>";

        document.getElementsByClassName("cart-table")[0].appendChild(cartItemElement);
    }
}

main();