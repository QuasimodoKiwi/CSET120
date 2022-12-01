document.getElementsByClassName("title")[0].innerHTML += JSON.parse(sessionStorage.getItem("manage-order-id"));

let users = JSON.parse(localStorage.getItem("users"));
let user;
users.forEach(userInUsers => {
    if (userInUsers.name === sessionStorage.getItem("manageUser")) {
        user = userInUsers
    }
});

let id = sessionStorage.getItem("manage-order-id");
let order;
user.orderHistory.forEach(orderInHistory => {
    if (orderInHistory.id == id) {
        order = orderInHistory;
    }
});

document.getElementsByClassName("order-name")[0].innerHTML = user.firstName + " " + user.lastName;
document.getElementsByClassName("order-address")[0].innerHTML =
    "<div class=\"address-rows\">" +
    "<p>" + user.address.address + "</p>" +
    "<p>" + user.address.city + ", " + user.address.state + " " + user.address.zipCode + "</p>" +
    "</div>";
document.getElementsByClassName("order-date")[0].innerHTML = order.date;
document.getElementsByClassName("order-total")[0].innerHTML += order.total;
document.getElementsByClassName("order-payment-method")[0].innerHTML += order.paymentMethod;

let orderCartDiv = document.getElementsByClassName("order-cart")[0];

order.cart.forEach(item => {
    let itemElement = document.createElement("div");
    itemElement.classList.add("order");
    itemElement.innerHTML =
        "<table>" +
        "<tr>" +
        "<td class=\"item-name\">" + item.name + "</td>" +
        "<td class=\"item-qty\"> Qty: " + item.price + "</td>" +
        "<td class=\"item-price\">Price: $" + item.price + "</td>" +
        "</tr>"
    "</table>";
    orderCartDiv.appendChild(itemElement);
});