const specialOfferItems = [
    {
        imgSrc: '../Assets/P1.avif',
        category: 'MEN',
        size: 'XS-3XL',
        title: 'SUPIMA Cotton Crew Neck T-Shirt | Short Sleeve',
        price: 'Rp.199,000'
    },
    {
        imgSrc: '../Assets/P2.avif',
        category: 'WOMEN',
        size: 'S-XXL',
        title: 'Ribbed Tank Top',
        price: 'Rp.149,000'
    },
    {
        imgSrc: '../Assets/P3.avif',
        category: 'KIDS',
        size: '110-160',
        title: 'Graphic T-Shirt',
        price: 'Rp.129,000'
    },
    {
        imgSrc: '../Assets/P4.avif',
        category: 'BABY',
        size: '50-90',
        title: 'Cotton Bodysuit',
        price: 'Rp.99,000'
    },
    {
        imgSrc: '../Assets/P5.avif',
        category: 'MEN',
        size: 'XS-3XL',
        title: 'Linen Blend Long Sleeve Shirt',
        price: 'Rp.299,000'
    },
    {
        imgSrc: '../Assets/P6.avif',
        category: 'MEN',
        size: 'XS-3XL',
        title: 'Linen Blend Long Sleeve Shirt',
        price: 'Rp.299,000'
    }

];


const slides = document.querySelectorAll(".slides .slide");
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    if (slides.length > 0) {
        slides[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(nextSlide, 5000);
    }
}

function showSlide(index) {
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });

    slides[slideIndex].classList.add("displaySlide");
}

function previousSlide() {
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
});

document.addEventListener("click", (e) => {
    if (!offScreenMenu.contains(e.target) && !hamMenu.contains(e.target)) {
        offScreenMenu.classList.remove("active");
        hamMenu.classList.remove("active");
    }
});

const createSpecialOfferItem = (item) => {
    const bigDiv = document.createElement('div');
    bigDiv.className = 'big-div';

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'description';

    const img = document.createElement('img');
    img.className = 'img-item';
    img.src = item.imgSrc;
    img.alt = item.title;

    const spanDiv = document.createElement('div');
    spanDiv.className = 'span-div';

    const categoryH6 = document.createElement('h6');
    categoryH6.textContent = item.category;

    const sizeH6 = document.createElement('h6');
    sizeH6.textContent = item.size;

    spanDiv.appendChild(categoryH6);
    spanDiv.appendChild(sizeH6);

    const titleH2 = document.createElement('h2');
    titleH2.textContent = item.title;

    const priceDiv = document.createElement('div');
    priceDiv.className = 'price';

    const priceH3 = document.createElement('h3');
    priceH3.textContent = item.price;



    const button = document.createElement('button');
    button.textContent = 'Add';
    button.className = 'add-to-cart';
    button.setAttribute('data-title', item.title);
    button.setAttribute('data-price', item.price);

    priceDiv.appendChild(priceH3);
    priceDiv.appendChild(button);


    descriptionDiv.appendChild(img);
    descriptionDiv.appendChild(spanDiv);
    descriptionDiv.appendChild(titleH2);
    descriptionDiv.appendChild(priceDiv);

    return descriptionDiv;
};


const specialOfferContainer = document.querySelector('.big-div');


specialOfferItems.forEach(item => {
    const specialOfferItem = createSpecialOfferItem(item);
    specialOfferContainer.appendChild(specialOfferItem);
});



const carts = JSON.parse(localStorage.getItem('cartItems')) || [];

const cartItems = document.querySelector('.cart-items');
const totalDisplay = document.querySelector('.total');

const updateCartUI = () => {
    cartItems.innerHTML = '';
    let total = 0;
    carts.forEach(item => {
        const li = document.createElement('li');
        const priceStripped = parseFloat(item.price.replace('Rp.', '').replace(',', ''));
        li.textContent = `${item.title} - Rp. ${priceStripped.toLocaleString()}`;
        cartItems.appendChild(li);
        total += priceStripped;
    });
    totalDisplay.textContent = `Rp. ${total.toLocaleString()}`
};

const addToCart = (item) => {
    carts.push(item);
    localStorage.setItem('cartItems', JSON.stringify(carts));
    updateCartUI();
};

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const title = event.target.dataset.title;
        const price = event.target.dataset.price;
        const item = { title, price };
        addToCart(item);
    }
});

const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        carts = JSON.parse(savedCart);
        updateCartUI();
    }
};

let banner = document.querySelector('.banner');
let canvas = document.getElementById('dotsCanvas');
canvas.width = banner.offsetWidth;
canvas.height = banner.offsetHeight;
const ctx = canvas.getContext('2d');

const dots = [];
const arrayColors = ['#ff9c9c', '#ffc0c0', '#ff6666', '#ff484d', '#ff0000'];
for (let index = 0; index < 100; index++) {
    dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        color: arrayColors[Math.floor(Math.random() * arrayColors.length)],
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1
    });
}

let mouse = { x: null, y: null };

const drawDots = () => {
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

const updateDots = () => {
    dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
    });
}

const drawLines = () => {
    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if (distance < 200) {
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateDots();
    drawDots();
    if (mouse.x && mouse.y) {
        drawLines();
    }
    requestAnimationFrame(animate);
}

banner.addEventListener('mousemove', (event) => {
    mouse.x = event.pageX - banner.getBoundingClientRect().left;
    mouse.y = event.pageY - banner.getBoundingClientRect().top;
});

banner.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('resize', () => {
    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;

    dots.forEach(dot => {
        dot.x = Math.random() * canvas.width;
        dot.y = Math.random() * canvas.height;
    });
    drawDots();
});

drawDots();
animate();

const createModal = () => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    const message = document.createElement('p');
    message.textContent = 'Item has been added to cart';

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(message);
    modal.appendChild(modalContent);

    return modal;
};

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = createModal();
        document.body.appendChild(modal);
        modal.style.display = 'block';

        setTimeout(() => {
            modal.remove();
        }, 3000);
    });
});