function getLoggedUser() {
    return sessionStorage.getItem("loggedUser");
}

function getUsers() {
    return JSON.parse(localStorage.getItem("users"));
}

function getUser() {
    let users = getUsers();
    users.forEach(userInUsers => {
        if (userInUsers.name == getLoggedUser()) {
            return userInUsers;
        }
    });
    return null;
}

function getInventory() {
    return JSON.parse(localStorage.getItem("inventory"));
}

















function main() {
    let users = getUsers();
    let user = getUser();
    let cart = user.cart;

    for (i = 0; i < cart.length; i++) {
        let item = cart[i];
        let cartItemElement = document.createElement("tr");

    }
}

main();