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
    let currentUser = inputEmail;
    
    document.getElementById("passwordLabel").innerHTML = "New Password: ";
    
    let warningMessage = document.getElementById("warningText");
 
    let confirmationButton = document.getElementById("submit");
    confirmationButton.innerHTML = "Save Password";

    confirmationButton.addEventListener("click", passwordCreation());


    function passwordCreation(){
        let users = JSON.parse(localStorage.getItem("users"));
        for(let i = 0; i < users.length; i++){
            let user = users[i];
            if(inputEmail == user.email  && inputPassword != user.password ){
                localStorage.setItem(email, JSON.stringify(user.password));     
                document.getElementById("warningText").style.color = "black";
                document.getElementById("warningText").innerHTML = "Password saved."
                location.reload;
            }
            else if(inputEmail != user.email){
                document.getElementById("warningText").style.display = "block";
                document.getElementById("warningText").innerHTML = "The email does not exist."
            }
            else if(inputPassword == user.password){
                document.getElementById("warningText").style.display = "block"; 
                document.getElementById("warningText").innerHTML = "The password already exists."
            }
        }
    }


}