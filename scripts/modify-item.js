let name = sessionStorage.getItem("itemToModify");

if (name == null) {
    redirectBack();
}

item = null;

JSON.parse(localStorage.getItem("inventory")).forEach(invItem => {
    if (invItem.name == name) {
        item = invItem
        return;
    }
});

if (item == null) {
    redirectBack();
}

document.getElementById("item-name").value = item.name;
document.getElementById("item-price").value = item.price;
document.getElementById("item-description").value = item.description;
document.getElementById("item-allergies").value = item.allergies;
document.getElementById("item-qty").value = item.qty;
document.getElementById("item-img").value = item.img;

function submitForm() {
    let name = document.getElementById("item-name").value;
    let price = document.getElementById("item-price").value;
    let description = document.getElementById("item-description").value;
    let allergies = document.getElementById("item-allergies").value;
    let qty = document.getElementById("item-qty").value;
    let img = document.getElementById("item-img").value;

    if (name == "" || price == "" || description == "" ||
        allergies == "" || qty == "") {
        alert("Please complete the form before moving on!");
        return;
    }

    price = parseFloat(price);
    qty = parseInt(qty);

    let item = {
        name: name,
        price: price,
        description: description,
        allergies: allergies,
        qty: qty,
        img: img
    }

    let inventory = JSON.parse(localStorage.getItem("inventory"));

    let itemToModifyIndex = -1;
    inventory.forEach(invItem => {
        if (invItem.name == item.name) {
            itemToModifyIndex = inventory.indexOf(invItem);
        }
    });

    if (itemToModifyIndex == -1) {
        redirectBack();
        return;
    }

    inventory[itemToModifyIndex] = item;

    localStorage.setItem("inventory", JSON.stringify(inventory));
    redirectBack();
}

function redirectBack() {
    sessionStorage.removeItem("itemToModify");
    window.location = "./manage-inventory.html";
}