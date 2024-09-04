// Navbar Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Image Carousel
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

// Buttons( prev & next)
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');


nextBtn.addEventListener('click', () => {
    if (counter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

prevBtn.addEventListener('click', () => {
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

carouselSlide.addEventListener('transitionend', () => {
    if (carouselImages[counter].id === 'lastClone') {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
    if (carouselImages[counter].id === 'firstClone') {
        carouselSlide.style.transition = "none";
        counter = carouselImages.length - counter;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
});


let cart = [];

document.querySelectorAll('.add-to-bag').forEach((button) => {
    button.addEventListener('click', function() {
        let productCard = this.parentElement;
        let productName = productCard.querySelector('h3').textContent;
        let priceText = productCard.querySelector('p.price').textContent.trim();
        let priceMatch = priceText.match(/₹([\d,\.]+)/);
        let productPrice = priceMatch ? parseFloat(priceMatch[1].replace(/,/g, '')) : NaN;
        cart.push({ name: productName, price: productPrice });
        document.getElementById('cart-button').textContent = `Cart (${cart.length})`;
    });
});


let modal = document.getElementById('cart-modal');
let cartButton = document.getElementById('cart-button');
let span = document.getElementsByClassName('close')[0];

cartButton.onclick = function() {
    let cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; 

    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price;
        let cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `<span>${item.name}</span><span>₹${item.price.toFixed(2)}</span>`;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update total price
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);

    
    modal.style.display = 'block';
}


span.onclick = function() {
    modal.style.display = 'none';
}


window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}



document.getElementById('purchase-btn').addEventListener('click', function() {
    const paymentMethod = document.getElementById('payment-method').value;
    alert('You selected ' + paymentMethod + ' for payment.');
});
