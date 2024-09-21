const apiUrl = 'https://picsum.photos/v2/list?page=1&limit=4';

let activeIndex = 0; 
let images = [];

// API call to fetch carousel images
async function fetchImages() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        images = data.map(image => image.download_url);
        displayImages();
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

// Display the primary image and thumbnails
function displayImages() {
    document.getElementById('primary-img').src = images[activeIndex];

    const thumbnailsContainer = document.getElementById('thumbnails');
    thumbnailsContainer.innerHTML = ''; // Clear existing thumbnails

    images.forEach((imageSrc, index) => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.classList.add('carosuel-image');
        
        if (index === activeIndex) {
            img.classList.add('active-thumbnail'); // Highlight the active thumbnail
        }

        img.addEventListener('click', () => {
            updateActiveImage(index);
        });

        thumbnailsContainer.appendChild(img);
    });
}

// Update the main image based on the selected thumbnail
function updateActiveImage(index) {
    activeIndex = index;
    document.getElementById('primary-img').src = images[activeIndex];

    const thumbnailImages = document.querySelectorAll('#thumbnails img');
    thumbnailImages.forEach((img, idx) => {
        img.classList.remove('active-thumbnail'); // Remove the active class from all thumbnails
        if (idx === activeIndex) {
            img.classList.add('active-thumbnail'); // Add active class to the current thumbnail
        }
    });
}

// Fetch images on load
fetchImages();

// Color swatches functionality
const swatches = document.querySelectorAll('.color-swatch');
swatches.forEach(swatch => {
    swatch.addEventListener('click', function() {
        swatches.forEach(s => s.classList.remove('active'));
        this.classList.add('active');
    });
});

// Cart functionality
let productQuantity = 1;
const quantityDisplay = document.getElementById('product-quantity');
const decreaseBtn = document.getElementById('decrease-quantity');
const increaseBtn = document.getElementById('increase-quantity');

decreaseBtn.addEventListener('click', () => {
    if (productQuantity > 1) {
        productQuantity--;
        quantityDisplay.textContent = productQuantity;
    }
});

increaseBtn.addEventListener('click', () => {
    productQuantity++;
    quantityDisplay.textContent = productQuantity;
});

const addToCartBtn = document.getElementById('add-to-cart');
const cartMessage = document.getElementById('cart-message');

addToCartBtn.addEventListener('click', () => {
    cartMessage.textContent = `Added ${productQuantity} item(s) to cart!`;
    
    const cartCount = document.querySelector('.cart-count');
    let currentCartCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCartCount + productQuantity;
});

// Add event listeners for navigation buttons
document.getElementById('prev-button').addEventListener('click', () => {
    activeIndex = (activeIndex === 0) ? images.length - 1 : activeIndex - 1; // Wrap around to the last image
    updateActiveImage(activeIndex);
});

document.getElementById('next-button').addEventListener('click', () => {
    activeIndex = (activeIndex === images.length - 1) ? 0 : activeIndex + 1; // Wrap around to the first image
    updateActiveImage(activeIndex);
});
