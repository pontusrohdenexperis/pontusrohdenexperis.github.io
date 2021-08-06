const laptopsElement = document.getElementById("laptops");
const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");
const specsElement = document.getElementById("specs");
const priceElement = document.getElementById("price");
const imageElement = document.getElementById("image");
const buyLaptopButtonElement = document.getElementById("buyLaptopButton");

let laptops = [];
let selectedLaptop;

fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToList(laptops))

/**
 * Loops through the laptops in the list, then selects the first laptop in the
 * array and renders it on page.
 * @param {[]} laptops An array of the laptops from the api.
 */
const addLaptopsToList = (laptops) => {
    laptops.forEach(laptop => addLaptopToList(laptop));
    selectedLaptop = laptops[0];
    renderLaptop(selectedLaptop);
}
/**
 * Adds each laptop as an option to the select element.
 * @param {} laptop 
 */
const addLaptopToList = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);
}
/**
 * Changes the selected laptop and renders the new one on page.
 * @param {event} e Takes in an event as parameter. In this case, a change-event.
 */
const handleShowLaptop = (e) => {
    selectedLaptop = laptops[e.target.selectedIndex];
    renderLaptop(selectedLaptop);
}
/**
 * Used to display a laptop on page.
 * @param {laptop} laptop The selected laptop 
 */
const renderLaptop = (laptop) => {
    titleElement.innerText = laptop.title;
    descriptionElement.innerText = laptop.description;
    priceElement.innerText = "price: " + laptop.price + "kr";
    imageElement.src = "https://noroff-komputer-store-api.herokuapp.com/" + laptop.image;
    addSpecsToList(laptop.specs);
}
/**
 * Checks if you have enough money to buy a laptop. 
 * If you dont, you are shown an alert telling you "insufficient funds".
 * Otherwise it shows an alert telling you wich computer you bought.
 */
const handleBuyLaptop = () => {
    if (getBalance() < selectedLaptop.price) {
        const message = alert("insufficient funds!");
    } else {
        const message = alert("Congratulations on buying a " + selectedLaptop.title + "!");
        updateBalance(-selectedLaptop.price);
    }
}
/**
 * Takes in an array of specs and creates list items for each spec in the array,
 * then adds the li to the existing ul.
 * @param {[]} specs 
 */
const addSpecsToList = (specs) => {
    specsElement.innerText = "";
    specs.forEach(spec => {
        const specElement = document.createElement("li");
        specElement.appendChild(document.createTextNode(spec));
        specsElement.appendChild(specElement);
    })
}

laptopsElement.addEventListener("change", handleShowLaptop);
buyLaptopButtonElement.addEventListener("click", handleBuyLaptop);