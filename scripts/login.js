function login() {
    let inputEmail = document.getElementById("email").value;
    let inputPassword = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users"));

    let userEmails = [];

    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        userEmails.push(user.email);
    }

    for (let i = 0; i < users.length; i++) {
        let user = users[i];

        if (!userEmails.includes(user.email)) {
            alert("email does not exist.");
            return;
        }

        else {
            if (inputEmail == user.email && inputPassword == user.password) {
                if (user.status == "banned") {
                    alert("Your account is banned.");
                    return;
                }

                sessionStorage.setItem("loggedUser", user.name);


                if (user.isManager) {
                    window.location = "./manager-page.html";
                    return;
                }
                else {
                    window.location = "./profile-page.html";
                    return;
                }
            }
        }

    }
    alert("The user nor the email matches.");
}

function signup() {
    window.location = "./signup.html";
}

function newPassword() {
    document.getElementById("passwordLabel").innerHTML = "New Password: ";


    let confirmationButton = document.getElementById("submit");
    confirmationButton.innerHTML = "Confirm Password";
    confirmationButton.setAttribute("onclick", "");
    confirmationButton.addEventListener("click", passwordCreation);
}
function passwordCreation() {
    let inputEmail = document.getElementById("email").value;
    let inputPassword = document.getElementById("password").value;
    let warningMessage = document.getElementById("warningText");
    let users = JSON.parse(localStorage.getItem("users"));

    let userExists = false;
    for (let i = 0; i < users.length; i++) {

        let user = users[i];
        if (user.email == inputEmail) {
            userExists = true;
            if (inputPassword != user.password) {
                user.password = inputPassword;
                users[i] = user;
                localStorage.setItem("users", JSON.stringify(users));
                warningMessage.style.display = "block";
                warningMessage.style.color = "black";
                warningMessage.innerHTML = "Password saved.";
                alert("Password saved.");
                location.reload();
            }
            else {
                warningMessage.style.display = "block";
                warningMessage.innerHTML = "The password already exists.";
                return;
            }
        }
    }
    if (!userExists) {
        warningMessage.style.display = "block";
        warningMessage.innerHTML = "The email does not exist.";
    }
}