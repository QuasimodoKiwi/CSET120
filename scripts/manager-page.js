let loggedUser = sessionStorage.getItem("loggedUser");
let user = null;
let users = JSON.parse(localStorage.getItem("users"));
users.forEach(userInUsers => {
    if (userInUsers.name == loggedUser) {
        user = userInUsers;
    }
    console.log(user);
});

let message = "";

if (user == null) {
    message = "Manager"
} else {
    message = user.firstName + " " + user.lastName;
}

document.getElementsByClassName("logged-manager-name")[0].innerHTML = message;