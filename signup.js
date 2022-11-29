function createUser(){
    let userInfo = {
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        email: document.getElementById("email").value
    };

    userInfo.name = userInfo.lastName.toLowerCase() + "_" + userInfo.firstName.toLowerCase();

    let users = JSON.parse(localStorage.getItem("users"));
    
    if(users == null){
        users = [];
    }
    users.push(userInfo);

    localStorage.setItem("users", JSON.stringify(users));    
    
    console.log(JSON.parse(localStorage.getItem("users")));


}