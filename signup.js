function createUser(){
    let userInfo = {
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    console.log(password);

    if(userInfo.password == ""){
        alert("Please create a password.");
        return;
    }

    userInfo.name = userInfo.lastName.toLowerCase() + "_" + userInfo.firstName.toLowerCase();

    
    let users = JSON.parse(localStorage.getItem("users"));
    
    if(users == null){
        users = [];
    }

    for(let i = 0; i < users.length; i++){
        if(users[i].name == userInfo.name){
            alert("The username is already taken.");
            return;
        }
    }
    
    users.push(userInfo);

    localStorage.setItem("users", JSON.stringify(users));    
    
    console.log(JSON.parse(localStorage.getItem("users")));
}