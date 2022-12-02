// Lorenzo Smith

let loggedUser = sessionStorage.getItem("loggedUser");
let users = JSON.parse(localStorage.getItem("users"));
let user = null;
users.forEach(userInUsers => {
    if (userInUsers.name == loggedUser) {
        user = userInUsers;
    }
});

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}

function ready() {
    // Adding all the items from the inventory to the menu.
    // TODO don't add the item if qty is 0
    let inventory = JSON.parse(localStorage.getItem("inventory"));
    inventory.forEach(itemInInventory => {
        let itemElement = document.createElement("div");
        itemElement.classList.add("shop-item");
        itemElement.innerHTML =
            "<h2 class=\"shop-item-title\">" + itemInInventory.name + "</h2>" +
            "<img class=\"shop-item-image\" src=\"./assets/images/inventory/" + itemInInventory.img + "\">" +
            "<div class=\"shop-item-details\">" +
            "<div class=\"shop-item-description-and-allergies\">" +
            "<p class=\"shop-item-description\">Description: " + itemInInventory.description + "</p>" +
            "<p class=\"shop-item-allergies\">Allergies: " + itemInInventory.allergies + "</p>" +
            "</div>" +
            "<div class=\"shop-item-price-and-add-to-cart\">" +
            "<p class=\"shop-item-price\">$" + itemInInventory.price.toFixed(2) + "</p>" +
            "<button class=\"btn btn-primary shop-item-button\" type=\"button\"> ADD TO CART</button>" +
            "</div>" +
            "</div>";
        document.getElementsByClassName("content-section")[0].appendChild(itemElement);
    });

    // Register all the events for the buttons
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChange)
    }

    var addToCartButtons = document.getElementsByClassName("shop-item-button")
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    // TODO purchase the cart in the user's cart from localStorage
    alert('Thank you for your purchase');
}

function removeCartItem(event) {
    // TODO remove the item from the user's cart from localStorage
    updateCart()
}

function quantityChange(event) {
    // TODO update the quantity of the item in the user's cart from localStorage    
    updateCart()
}

function addToCartClicked(event) {
    let shopItem = event.target;
    while (!shopItem.classList.contains("shop-item")) {
        shopItem = shopItem.parentElement;
    }
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText

    if (user.cart == undefined) user.cart = [];
    user.cart.push({ "name": title, "price": price, "qty": 1 });

    for (i = 0; i < users.length; i++) {
        let userInUsers = users[i];
        if (userInUsers.name == user.name) {
            users[i] = user;
            break;
        }
    }

    localStorage.setItem("users", JSON.stringify(users));

    updateCart()
}

function updateCart() {

}
