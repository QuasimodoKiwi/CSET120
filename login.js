//user gets sent to either their profile page or the management page
//Also include a link to the sign-up page if the user is directed here somehow
//use an if-statement for the authentication by checking local storage for matches

//Use session storage!!

let inputEmail = document.getElementById("email").value;
let inputPassword = document.getElementById("password").value;

function login(){

    let users = JSON.parse(localStorage.getItem("users"));
    for(let i = 0; i < users.length; i++){
        let user = users[i];
        if(inputEmail == user.email && inputPassword == user.password){
            sessionStorage.setItem("loggedUser", user.name);
            window.location = "./profile-page.html";
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

//Iterate through the users array and look for the email associated with the password.
//When iterated, create a new element for the label and the textbox using document.body.createElement.
//Replace the class of the login-input with the new label and textbox.
//When information is inputted, set the items of the user to have the new password.
//Reload the page when finished.

function newPassword(){
    let users = JSON.parse(localStorage.getItem("users"));
    for(let i = 0; i < users.length; i++){
        if(inputEmail == users.email){
            let target = document.getElementsByClassName("loginInput");
            target.forEach(loginInput => {
                loginInput.remove();
            });
        }
        else{
            alert("The email was not found. Please try again.");
        }
    }
}