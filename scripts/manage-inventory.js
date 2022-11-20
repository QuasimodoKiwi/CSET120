let inventory;

let response = await fetch('../inventory.json');
if (response.ok) {
    inventory = await response.json();
} else {
    alert("ERROR getting inventory");
}

let list = document.getElementsByClassName("inventory-view")[0];

inventory.forEach(item => {
    let itemNode = document.createElement("div");
    itemNode.classList.add("inventory-item");
    itemNode.innerHTML = "<img class=\"food-icon\" src=\"./assets/images/inventory/" + item.img + "\">";

    list.appendChild(itemNode);
});

