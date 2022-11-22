function createUser(){
    let userInfo = {
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        email: document.getElementById("email").value
    };

    localStorage.setItem("userTest", JSON.stringify(userInfo));    
    
    console.log(JSON.parse(localStorage.getItem("userInfo")));

    let users = JSON.parse(localStorage.getItem("userInfo"));
    
    return users;
}

const saveToLocalStorage = () => {
    localStorage.setItem("");
}