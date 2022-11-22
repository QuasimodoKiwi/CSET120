function createUser(){
    console.log("Hello World");

    let userArray = {
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        email: document.getElementById("email").value
    };

    localStorage.setItem("userTest", JSON.stringify(userArray));    
    console.log(JSON.parse(localStorage.getItem("userArray")));
}