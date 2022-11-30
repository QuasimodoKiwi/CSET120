function redirectBack() {
    window.location = "./manage-users.html";
}

function banUser() {
    let name = sessionStorage.getItem("manageUser");
    let users = JSON.parse(localStorage.getItem("users"));
    users.forEach(user => {
        if (user.name === name) {
            user.status = "banned";
        }
    });
    alert("User has been banned");
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
document.getElementsByClassName("address-row-2")[0].innerHTML = (user.address != undefined && user.address.city != undefined && user.address.state != undefined && user.address.zipCode != undefined) ? user.address.city + ", " + user.address.state + " " + user.zipCode : "Not set yet...";

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
            "<h2 class=\"order-id-msg\">ID: <span class=\"order-id\">" + order.id + "</span></h2>" +
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
document.getElementsByClassName("ban-btn")[0].addEventListener('click', banUser, false);

// let users = JSON.parse(localStorage.getItem("usersTest"));
// for (let i = 0; i < usersTest.length; i++) {
//     user = usersTest[i];
//     if (inputEmail == user.emaail && inputPassword == user.password) {
//         sessionStorage.setItem("loggedInUser", user.name);
//         if (user.isManager) {
//             window.location = "./manager-page.html";
//         } else {
//             window.location = "./profile-page.html";
//         }
//     }
// }