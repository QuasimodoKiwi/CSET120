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
            "<button class=\"btn btn-primary shop-item-button\" type=\"button\"> ADD TO CART</button>" +
            "</div>" +
            "</div>";
        document.getElementsByClassName("content-section")[0].appendChild(itemElement);
    });

    // Register all the events for the buttons
    var removeCartItemButtons = document.getElementsByClassName('cart-remove-item-btn')
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

    // document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    // TODO purchase the cart in the user's cart from localStorage
    alert('Thank you for your purchase');
}

function removeItemFromCart(element) {
    // TODO remove the item from the user's cart from localStorage
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
            let left = cart.splice(0, i);
            let right = cart.splice(i, cart.length - 1);
            cart = left.concat(right);
        }
    }

    setUser(user);

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
    price = price.split("$")[1];

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
    while (document.getElementsByClassName("cart-item").length > 0) {
        let cartItemParent = document.getElementsByClassName("cart-item")[0].parentElement;
        cartItemParent.removeChild(document.getElementsByClassName("cart-item")[0]);
    }

    let users = JSON.parse(localStorage.getItem("users"));
    let user = null;
    users.forEach(userInUsers => {
        if (userInUsers.name == loggedUser) {
            user = userInUsers;
        }
    });

    let cart = user.cart;
    if (cart == null) cart = [];

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
            "<td>$" + parseInt(item.price).toFixed(2) + "</td>" +
            "<td>" +
            "<input type=\"number\" min=\"0\" value=\"" + cartItem.qty + "\" class=\"cart-qty-input\">" +
            "</td>";

        let removeBtnElement = document.createElement("button");
        removeBtnElement.classList.add("cart-trash-btn");
        removeBtnElement.setAttribute("cart-item", cartItem.name);
        removeBtnElement.addEventListener('click', removeItemFromCart);
        removeBtnElement.innerHTML = "<ion-icon class=\"trash-icon\" name=\"trash-outline\"></ion-icon>";

        cartItemNode.getElementsByClassName("trash-td")[0].appendChild(removeBtnElement)

        document.getElementsByClassName("cart-table")[0].appendChild(cartItemNode);
    });
}
