if (localStorage.getItem("inventory") === null) {
    let inventory = [
        {
            "name": "Chicken Nuggets",
            "price": 5.00,
            "allergies": "none",
            "description": "Yum, we love chicken nuggets!",
            "qty": 10,
            "img": "chicken_nuggets.png"
        },
        {
            "name": "Chicken Patties",
            "price": 4.00,
            "allergies": "none",
            "description": "MMMMMMM",
            "qty": 7,
            "img": "chicken_patties.jpg"
        },
        {
            "name": "Chicken Tortilla Soup",
            "price": 7.55,
            "allergies": "Spicy stuff",
            "description": "e",
            "qty": 8,
            "img": "chicken_tortilla_soup.jpg"
        },
        {
            "name": "Chicken Tenders",
            "price": 4.50,
            "allergies": "none",
            "description": "YUSS",
            "qty": 5000,
            "img": "chicken_tenders.jpg"
        }
    ];

    localStorage.setItem("inventory", JSON.stringify(inventory));
}

let inventory = JSON.parse(localStorage.getItem("inventory"));

let list = document.getElementsByClassName("inventory-view")[0];

updateScreen();

function updateScreen() {
    while (list.firstChild) {
        list.firstChild.remove();
    }

    inventory.forEach(item => {
        let itemNode = document.createElement("div");
        itemNode.classList.add("inventory-item");
        itemNode.innerHTML =
            "<img class=\"food-icon\" src=\"./assets/images/inventory/" + item.img + "\">" +
            "<br>" +
            "<div class=\"name-price-div\">" +
            "<h2 class=\"item-name\">" +
            item.name +
            "</h2>" +
            "<span class=\"item-price\">$" + item.price.toFixed(2) + "</span>" +
            "</div>" +
            "<p>" + item.description + "</p>" +
            "<p>Allergies: " + item.allergies + "</p>" +
            "<hr class=\"divider-bar\">" +
            "<div class=\"qty-and-remove\">" +
            "<div>" +
            "<label>Quantity:</label>" +
            "<input onchange=\"changeQty(this)\" type=\"number\" value=\"" + item.qty + "\">" +
            "</div>" +
            "<button class=\"remove-btn\" onClick=\"removeItem(this)\">Remove</button>" +
            "</div>";

        list.appendChild(itemNode);
    });

    if (list.children.length <= 0) {
        let element = document.createElement("p");
        element.innerHTML = "You don't have any inventory...";
        element.classList.add("no-inv-msg");
        list.appendChild(element);
    }
}

function changeQty(element) {
    let name = element.parentNode.parentNode.parentNode.getElementsByClassName("item-name")[0].innerHTML;

    item = getInventoryItem(name);
    if (item == null) return;

    itemInInv.qty = element.value;
    updateInventory(inventory);
}

function removeItem(element) {
    let name = element.parentNode.parentNode.getElementsByClassName("item-name")[0].innerHTML;

    item = getInventoryItem(name);
    if (item == null) return;

    index = 0;
    for (i = 0; i < inventory.length; i++) {
        if (inventory[i] == item) index = i;
    }

    console.log(index);

    inventory.splice(index, 1);

    updateInventory(inventory);
    updateScreen();
}

function updateInventory(inventory) {
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

function getInventoryItem(itemName) {
    itemInInv = null;
    inventory.forEach(item => {
        if (item.name === itemName) itemInInv = item;
    });
    return itemInInv;
}