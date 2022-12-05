//user gets sent to either their profile page or the management page
//Also include a link to the sign-up page if the user is directed here somehow
//use an if-statement for the authentication by checking local storage for matches

//Use session storage!!


function login(){
    let inputEmail = document.getElementById("email").value;
    let inputPassword = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users"));
    for(let i = 0; i < users.length; i++){
        let user = users[i]; 
        if(inputEmail == user.email && inputPassword == user.password){
            sessionStorage.setItem("loggedUser", user.name);
            if(user.isManager){
                window.location = "./manager-page.html";
            }
            else{
                window.location = "./profile-page.html";
            }
            return;
        }
        else{
            alert("Your username or password was invalid.");
            return;
        }
    }    
}

function signup(){
    window.location = "./signup-page.html";
}

function newPassword(){
    document.getElementById("passwordLabel").innerHTML = "New Password: ";
    
    
    let confirmationButton = document.getElementById("submit");
    confirmationButton.innerHTML = "Confirm Password";
    confirmationButton.setAttribute("onclick", "");
    confirmationButton.addEventListener("click", passwordCreation);
}
function passwordCreation(){
    let inputEmail = document.getElementById("email").value;
    let inputPassword = document.getElementById("password").value;
    let warningMessage = document.getElementById("warningText");
    let users = JSON.parse(localStorage.getItem("users"));
    
    let userExists = false;
    for(let i = 0; i < users.length; i++){

        let user = users[i];
        console.log(user.password);
        console.log(inputPassword);
        if(user.email == inputEmail){
            userExists = true;
            if(inputPassword != user.password){
                user.password = inputPassword;
                users[i] = user;
                localStorage.setItem("users", JSON.stringify(users));
                warningMessage.style.display = "block";
                warningMessage.style.color = "black";
                warningMessage.innerHTML = "Password saved.";
            }
            else{
                warningMessage.style.display = "block"; 
                warningMessage.innerHTML = "The password already exists.";
                return;
            }
        }
            }
            if(!userExists){
            warningMessage.style.display = "block";
            warningMessage.innerHTML = "The email does not exist.";
    }
}