let users = JSON.parse(localStorage.getItem("users"));
let usersView = document.getElementsByClassName("users-view")[0];

if (users == null) {
    users = [];
}

if (users.length === 0) {
    let infoNode = document.createElement("p");
    infoNode.classList.add("no-users-msg");
    infoNode.innerHTML = "No user data found...";
    usersView.appendChild(infoNode);
}

userNames = [];

users.forEach(user => {
    userNames.push(user.name);
});

userNames.sort();

sortedUsers = [];

userNames.forEach(userName => {
    users.forEach(user => {
        if (user.name === userName) {
            sortedUsers.push(user);
        }
    });
});
users = sortedUsers;

users.forEach(user => {
    let userNode = document.createElement("button");
    userNode.classList.add("user");
    userNode.addEventListener('click', userClicked, false)

    let totalOrders = user.orderHistory;
    if (totalOrders === undefined) totalOrders = 0;
    else totalOrders = totalOrders.length;

    userNode.innerHTML =
        "<h2>" + user.lastName + " " + user.firstName + "</h2>" +
        "<h3>Total orders: " + totalOrders + "</h3>";
    userNode.name = user.name;

    usersView.appendChild(userNode);
});

function userClicked(element) {
    let userNode = element.target;
    while (!userNode.classList.contains("user")) {
        userNode = userNode.parentNode;
    }

    sessionStorage.setItem("manageUser", userNode.name);

    window.location = "./manage-user.html";
}