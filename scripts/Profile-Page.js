let loggedUser = sessionStorage.getItem("loggedUser");
let users = JSON.parse(localStorage.getItem("users"));
let user = null;
users.forEach(userInUsers => {
    if (userInUsers.name == loggedUser) {
        user = userInUsers;
    }
});

document.getElementsByClassName("firstname")[0].innerHTML += user.firstName;
document.getElementsByClassName("lastname")[0].innerHTML += user.lastName;
document.getElementsByClassName("email")[0].innerHTML += user.email;
document.getElementsByClassName("username")[0].innerHTML += user.name;
document.getElementsByClassName("password")[0].innerHTML += user.password;
document.getElementsByClassName("active-banned")[0].innerHTML += user.status;
document.getElementsByClassName("manager")[0].innerHTML += user.isManager;