// Lorenzo Smith

function getUsers() {
    return JSON.parse(localStorage.getItem("users"));
}

function getUser() {
    let users = getUsers();
    let user = null;
    users.forEach(userInUsers => {
        if (userInUsers.name == loggedUser) {
            user = userInUsers;
        }
    });
    return user;
}

function setUser(user) {
    let users = getUsers();
    for (i = 0; i < users.length; i++) {
        let userInUsers = users[i];
        if (userInUsers.name == user.name) {
            users[i] = user;
            break;
        }
    }
    localStorage.setItem("users", JSON.stringify(users));
}


let loggedUser = sessionStorage.getItem("loggedUser");
let users = getUsers();
let user = getUser();

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}

function ready() {
    // Add all the items in the cart to the cart panel
    updateCart();

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
            "<button class=\"btn btn-primary shop-item-button\" type=\"button\" onclick=\"addToCartClicked(this)\"> ADD TO CART</button>" +
            "</div>" +
            "</div>";
        document.getElementsByClassName("menu-items")[0].appendChild(itemElement);
    });

    // document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    // TODO purchase the cart in the user's cart from localStorage
    alert('Thank you for your purchase');
}

function removeItemFromCart(element) {
    let itemElement = element.target;
    while (!itemElement.classList.contains("cart-trash-btn")) {
        itemElement = itemElement.parentElement;
    }

    let itemName = itemElement.getAttribute("cart-item");

    let user = getUser();
    let cart = user.cart;
    for (i = 0; i < cart.length; i++) {
        let cartItem = cart[i];
        if (cartItem.name == itemName) {
            cart.splice(i, 1);
        }
    }

    setUser(user);

    updateCart()
}

function quantityChange(element) {
    let qty = parseInt(element.value);
    let user = getUser();

    let tr = element;
    while (!tr.classList.contains("cart-item")) {
        tr = tr.parentElement;
    }

    let itemName = tr.getElementsByClassName("cart-title")[0].innerHTML;

    let cart = user.cart;
    for (i = 0; i < cart.length; i++) {
        let itemInCart = cart[i];
        if (itemInCart.name == itemName) {
            itemInCart.qty = qty;
            cart[i] = itemInCart;
            user.cart = cart;
            setUser(user);
            break;
        }
    }

    updateCart()
}

function addToCartClicked(element) {
    let shopItem = element;
    while (!shopItem.classList.contains("shop-item")) {
        shopItem = shopItem.parentElement;
    }
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText

    let users = getUsers();
    let user = getUser();

    if (user.cart == undefined) user.cart = [];

    let contains = false;
    user.cart.forEach(itemInCart => {
        if (itemInCart.name == title) contains = true;
    });

    if (contains) {
        alert("You already have that item in your cart!");
        return;
    }

    user.cart.push({ "name": title, "qty": 1 });

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
    while (document.getElementsByClassName("cart-item").length > 0) {
        let cartItemParent = document.getElementsByClassName("cart-item")[0].parentElement;
        cartItemParent.removeChild(document.getElementsByClassName("cart-item")[0]);
    }

    let user = getUser();

    let cart = user.cart;
    if (cart == null) cart = [];

    let total = 0;

    cart.forEach(cartItem => {
        let item = null;
        let inventory = JSON.parse(localStorage.getItem("inventory"));
        inventory.forEach(itemInInventory => {
            if (itemInInventory.name == cartItem.name) {
                item = itemInInventory;
            }
        });

        let cartItemNode = document.createElement("tr");
        cartItemNode.classList.add("cart-item");
        cartItemNode.innerHTML =
            "<td class=\"trash-td\"></td>" +
            "<td>" +
            "<div class=\"cart-img-title\">" +
            "<h3 class=\"cart-title\">" + item.name + "</h3>" +
            "<img src=\"./assets/images/inventory/" + item.img + "\" class=\"cart-img\">" +
            "</div>" +
            "</td>" +
            "<td class=\"cart-price\">$" + item.price.toFixed(2) + "</td>" +
            "<td>" +
            "<input type=\"number\" min=\"1\" value=\"" + cartItem.qty + "\" class=\"cart-qty-input\" onclick=\"quantityChange(this)\">" +
            "</td>";

        let removeBtnElement = document.createElement("button");
        removeBtnElement.classList.add("cart-trash-btn");
        removeBtnElement.setAttribute("cart-item", cartItem.name);
        removeBtnElement.addEventListener('click', removeItemFromCart);
        removeBtnElement.innerHTML = "<ion-icon class=\"trash-icon\" name=\"trash-outline\"></ion-icon>";

        cartItemNode.getElementsByClassName("trash-td")[0].appendChild(removeBtnElement)

        document.getElementsByClassName("cart-table")[0].appendChild(cartItemNode);

        total += item.price * cartItem.qty;
    });
    document.getElementsByClassName("cart-total")[0].innerHTML = "TOTAL: $" + total.toFixed(2);
}

function proceedToCheckout() {
    window.location = "./checkout.html";
}