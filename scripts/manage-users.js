let users = JSON.parse(localStorage.getItem("users"));

if (users == null) {
    users = [];
}

if (users.length === 0) {
    let infoNode = document.createElement("p");
    infoNode.classList.add("no-users-msg");
    infoNode.innerHTML = "No user data found...";
    document.getElementsByClassName("users-view")[0].appendChild(infoNode);
}

userNames = []

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
    let userNode = document.createElement("div");
    userNode.classList.add("user");
});