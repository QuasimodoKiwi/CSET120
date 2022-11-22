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

    let item = {
        name: name,
        price: price,
        description: description,
        allergies: allergies,
        qty: qty,
        img: img
    }

    let inventory = JSON.parse(localStorage.getItem("inventory"));

    if (inventory == null) {
        inventory = [];
    }

    inventory.push(item);
    localStorage.setItem("inventory", JSON.stringify(inventory));
}