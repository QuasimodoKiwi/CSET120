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

//1: Create a label and button.

//2: Put in a input box and check if a user's email exists within the local storage. 

//3: If the email does exist, enter an input box that allows for a new password to be created.

//4: When iterated, create a new element for the label and the textbox using document.body.createElement.
//Replace the class of the loginInput with the new label and textbox

//5: Create a confirmation button...

//6: If the confirmation button is clicked, set the items of the user to have the new password.

//7: Reload the page when finished.

function newPassword(){
    let newLabel = document.createElement("label");
    newLabel.innerHTML = "form";
    
    let newPassword = document.createElement("input");
    newPassword.setAttribute("type", "text");


    // document.getElementsByClassName("loginInput").createElement = "label";
    
    let users = JSON.parse(localStorage.getItem("users"));
    for(let i = 0; i < users.length; i++){
        if(inputEmail == users.email){
            let targets = document.getElementsByClassName("loginInput");
            targets.forEach(box => {
                box.remove();
            });

        }
        else{
            alert("The email was not found. Please try again.");
        }
       }

    document.body.append(newLabel, newPassword);
}