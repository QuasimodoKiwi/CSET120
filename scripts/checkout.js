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

function getInventory() {
    return JSON.parse(localStorage.getItem("inventory"));
}

function cartOverview() {
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
        total += item.price * cartItem.qty;
    }
    document.getElementsByClassName("cart-total")[0].innerHTML = "Total: $" + total.toFixed(2);
}

function updatePaymentType() {
    let cardRadioBtn = document.getElementById("payment-type--card");
    let cashRadioBtn = document.getElementById("payment-type--cash");

    if (cardRadioBtn.checked && !cashRadioBtn.checked) {
        document.getElementsByClassName("card-section")[0].style.display = "block";
    } else {
        document.getElementsByClassName("card-section")[0].style.display = "none";
    }
}

function purchase() {
    if ((!document.getElementById("payment-type--card").checked &&
        !document.getElementById("payment-type--cash").checked) ||
        (document.getElementById("address").value == "" ||
            document.getElementById("city").value == "" ||
            document.getElementById("state").value == "" ||
            document.getElementById("zipCode").value == "")) {
        alert("Please fill out the forms before purchasing!");
        return;
    }

    if (document.getElementById("payment-type--card").checked &&
        (document.getElementById("card-type-input").value == "" ||
            document.getElementById("card-number-input").value == "" ||
            document.getElementById("card-cvv-input").value == "" ||
            document.getElementById("card-expiration-input").value == "" ||
            document.getElementById("card-name-input").value == "")) {
        alert("Please fill out the forms before purchasing!");
        return;
    }

    let user = getUser();

    let order = {};
    order.id = "";
    for (i = 0; i < 8; i++) {
        order.id += Math.floor(Math.random() * 10);
    }
    let current = new Date();
    order.date = current.getMonth() + "/" + current.getDay() + "/" + current.getFullYear() + "@" + current.getHours() + ":" + current.getMinutes();
    order.total = parseInt(total).toFixed(2);
    order.paymentMethod = document.getElementById("payment-type--card").checked ? (
        "card(" + document.getElementById("card-number-input").value + ")"
    ) : "cash";
    order.cart = user.cart;
    user.cart.forEach(cartItem => {
        let currentPrice = null;
        getInventory().forEach(itemInInventory => {
            if (itemInInventory.name == cartItem.name) {
                currentPrice = itemInInventory.price;
            }
        });
        cartItem.price = currentPrice.toFixed(2);
    });

    order.address = {};
    order.address.address = document.getElementById("address").value;
    order.address.city = document.getElementById("city").value;
    order.address.state = document.getElementById("state").value;
    order.address.zipCode = document.getElementById("zipCode").value;

    if (user.orderHistory == undefined) user.orderHistory = [];
    user.orderHistory.unshift(order);
    user.cart = [];
    setUser(user);
    window.location = "./receipt-page.html";
}

function main() {
    cartOverview();
    updatePaymentType();
}
let total = 0;
main();