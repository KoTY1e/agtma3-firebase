// Sample data for products (replace with your own data)
const products = [
    { 
        id: 1,
        name: "logo",
        image: "css/img/logo.png",
        description: "joy.",
        price:  19.99,
    },

    { 
        id: 2,
        name: "Product 2",
        image: "product2.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: 24.99
    },

    { 
        id: 3,
        name: "Product 3",
        image: "product3.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: 50
    },

    // Add more products here
];

// Function to generate product elements
function createProductElement(product) {
    const productElement = document.createElement("div");
    productElement.className = "product";

    const imageElement = document.createElement("img");
    imageElement.src = product.image;
    imageElement.alt = product.name;
    productElement.appendChild(imageElement);

    const nameElement = document.createElement("h2");
    nameElement.textContent = product.name;
    productElement.appendChild(nameElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = product.description;
    productElement.appendChild(descriptionElement);

    const priceElement = document.createElement("p");
    priceElement.textContent = "Price: $ " + product.price.toFixed(2);
    productElement.appendChild(priceElement);

    const buttonElement = document.createElement("button");
    buttonElement.textContent = "Add to Cart";
    buttonElement.addEventListener("click", function() {
        addToCart(product);
    });
    productElement.appendChild(buttonElement);

    return productElement;
}

// Function to populate the product list
function populateProductList() {
    const productListElement = document.getElementById("product-list");

    products.forEach(function(product) {
        const productElement = createProductElement(product);
        productListElement.appendChild(productElement);
    });
}

// Function to add a product to the cart
function addToCart(product) {
    const cartItemsElement = document.getElementById("cart-items");
    const cartItemElement = document.createElement("li");
    cartItemElement.textContent = product.name;
    cartItemsElement.appendChild(cartItemElement);

    // Calculate and update total price
    const totalPriceElement = document.getElementById("total-price");
    const totalPrice = parseFloat(totalPriceElement.textContent.replace("Total Price: $", ""));
    const updatedTotalPrice = totalPrice + product.price;
    totalPriceElement.textContent = "Total Price: $" + updatedTotalPrice.toFixed(2);
}

// Call the function to populate the product list
populateProductList();

const market = document.querySelector(".products");
const cart = document.querySelector(".cart-items");

signUpBtn.addEventListener("click", () => {
    products.classList.toggle("change");
});