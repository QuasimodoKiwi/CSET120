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