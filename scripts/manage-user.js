function redirectBack() {
    window.location = "./manage-users.html";
}

function updateBanStatusBtn() {
    let statusBtn = document.getElementsByClassName("status-btn")[0];

    let users = JSON.parse(localStorage.getItem("users"));
    let user;
    users.forEach(userInUsers => {
        if (userInUsers.name == name) {
            user = userInUsers;
        }
    });

    statusBtn.classList.forEach(classInClassList => {
        statusBtn.classList.remove(classInClassList);
    });

    if (user.status == "banned") {
        statusBtn.classList.add("status-btn");
        statusBtn.classList.add("status-btn--unban");
        statusBtn.innerHTML = "Unban User"
    } else {
        statusBtn.classList.add("status-btn");
        statusBtn.classList.add("status-btn--ban");
        statusBtn.innerHTML = "Ban User"
    }
}

function toggleBanStatus() {
    let name = sessionStorage.getItem("manageUser");
    let users = JSON.parse(localStorage.getItem("users"));
    users.forEach(user => {
        if (user.name === name) {
            if (user.status == "banned") {
                user.status = "available";
            } else {
                user.status = "banned";
            }
            localStorage.setItem("users", JSON.stringify(users));
            updateBanStatusBtn();
        }
    });
    alert("User's ban status has been updated");
}

let name = sessionStorage.getItem("manageUser");
if (name == null) {
    redirectBack();
}

let user = null;

JSON.parse(localStorage.getItem("users")).forEach(userInUsers => {
    if (userInUsers.name == name) {
        user = userInUsers;
    }
});

if (user == null) {
    redirectBack();
}

// ============ .title =========
document.getElementsByClassName("title")[0].innerHTML += user.firstName + " " + user.lastName;

// ============= General Info ============
document.getElementsByClassName("first-name")[0].innerHTML = user.firstName;
document.getElementsByClassName("last-name")[0].innerHTML = user.lastName;
document.getElementsByClassName("email")[0].innerHTML = user.email;
document.getElementsByClassName("is-manager")[0].innerHTML = (user.isManager != undefined ? user.isManager : false) == true ? "Yes" : "No";

// ============ Address ================
document.getElementsByClassName("address-row-1")[0].innerHTML = (user.address != undefined && user.address.address != undefined) ? user.address.address : "Not set yet...";
document.getElementsByClassName("address-row-2")[0].innerHTML = (user.address != undefined && user.address.city != undefined && user.address.state != undefined && user.address.zipCode != undefined) ? user.address.city + ", " + user.address.state + " " + user.address.zipCode : "Not set yet...";

// ========= Order History ===============
let orderHistoryList = document.getElementsByClassName("orders")[0];
let orderHistory = user.orderHistory;
if (orderHistory != undefined) {
    orderHistory.forEach(order => {
        let orderNode = document.createElement("button");
        orderNode.classList.add("order");
        orderNode.innerHTML =
            "<div class=\"order-date-id-div\">" +
            "<h2 class=\"order-date\">Date: " + order.date + "</h2>" +
            "<h2 class=\"order-id-msg\">ID#: <span class=\"order-id\">" + order.id + "</span></h2>" +
            "</div>" +
            "<p class=\"order-total\"> Order Total: " + order.total + "</p>";
        orderNode.addEventListener('click', (element) => {
            element = element.target;
            while (!element.classList.contains("order")) {
                element = element.parentNode;
            }

            console.log(element);
            let id = parseInt(element.getElementsByClassName("order-id")[0].innerHTML);
            sessionStorage.setItem("manage-order-id", id.toString());

            window.location = "./manage-user-order.html";
            return;

        }, false);

        orderHistoryList.appendChild(orderNode);
    });
} else {
    let noOrdersMessage = document.createElement("p");
    noOrdersMessage.classList.add("no-orders-message");
    noOrdersMessage.innerHTML = "No order history..."
    orderHistoryList.appendChild(noOrdersMessage)
}

// ======= Ban Button ============
let statusBtn = document.getElementsByClassName("status-btn")[0];
statusBtn.addEventListener('click', toggleBanStatus, false);
updateBanStatusBtn();