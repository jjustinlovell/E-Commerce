const cartItemsList = document.querySelector('.cart-items');
const totalDisplay = document.querySelector('.total');
const clearCartButton = document.getElementById('clear-cart-btn');
let carts = JSON.parse(localStorage.getItem('cartItems')) || [];

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
const updateCartUI = () => {
    cartItemsList.innerHTML = '';
    let total = 0;
    carts.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.title} - ${item.price}`;
        const priceStripped = parseFloat(item.price.replace('Rp.', '').replace(',', ''));
        cartItemsList.appendChild(li);
        total += priceStripped;
    });
    totalDisplay.textContent = `Total: Rp. ${total.toLocaleString()}`;
};

const clearCart = () => {
    carts = [];
    localStorage.setItem('cartItems', JSON.stringify(carts));
    updateCartUI();
};

clearCartButton.addEventListener('click', clearCart);

updateCartUI();

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