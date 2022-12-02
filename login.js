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

//Forgot Password Steps:

//1: 
// Change the "Login" <h3> element to "Change Password:", the innerHTML of label for password to "New Password:".
// (optional) change the innerHTML of the Submit button to "Save Password".
//2:
//Upon clicking the confirmation button, check if a user's email exists within the local storage. 
//If the email does exist... 
    //the user is eligible to create a new password that will replace the value of password inside the users key.

    //If the following two were to happen, set the display of the warningText div to visible, and...

    //... if the password exists, change its innerHTML to "The password already exists. Please try again."
    
    //or if the email does NOT exist, change innerHTML to "The email does not exist."

    //or, The email nor the password exists. 

//3: 
//When iterated, create a new element for the label and the textbox using document.body.createElement.

//6: 
//If the confirmation button is clicked, set the items of the user to have the new password.

//7: 
//Reload the page when finished.

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