'use strict';

// Menu

const menu = {
    nav: document.querySelector('.menu'),
    visible: false,

    open() {
        this.nav.classList.add('menu--open');
        this.visible = true;
    },

    close() {
        this.nav.classList.remove('menu--open');
        this.visible = false;
    }
}

document.addEventListener('click', (event) => {
    if (event.target.closest('.menu__button') && !menu.visible) {
        menu.open();
    } else if (!event.target.closest('.menu__list') && menu.visible) {
        menu.close();
    }
});

// Slider

const prevBtn = document.querySelector('.slider__side-button--prev');
const nextBtn = document.querySelector('.slider__side-button--next');
const buttons = document.querySelectorAll('.slider__button');
const startPosition = 0;
const lastSlide = buttons.length - 1;
let position = startPosition;


function nextSlide() {
    if (position != lastSlide) {
        position++;
    } else {
        position = startPosition;
    }
    buttons[position].checked = true;
}

function prevSlide() {
    if (position != startPosition) {
        position--;
    } else {
        position = lastSlide;
    }
    buttons[position].checked = true;
}

prevBtn.addEventListener('click', () => prevSlide());
nextBtn.addEventListener('click', () => nextSlide());

buttons.forEach((slide, index) => slide.addEventListener('click', () => position = index));

setInterval(nextSlide, 5000);

// Parallax

const slides = document.querySelectorAll('.slider__slide');
const speed = 0.7;
let offset;

window.addEventListener('scroll', () => {
    offset = window.pageYOffset;
    slides.forEach(slide => slide.style.backgroundPositionY =  offset * speed + 'px');
});

// Gallery

const images = document.querySelectorAll('.gallery__image');
const modalWindow = document.querySelector('.modal');
const modalImage = document.querySelector('.modal__image');
const prevBtnImg = document.querySelector('.modal__side-button--prev');
const nextBtnImg = document.querySelector('.modal__side-button--next');
let firstImage = 0;
let lastImage = images.length - 1;
let currentImage;

function nextImage() {
    if (currentImage != lastImage) {
        currentImage++;
        
    } else {
        currentImage = firstImage;
    }
    modalImage.src = images[currentImage].src;
}

function prevImage() {
    if (currentImage != firstImage) {
        currentImage--;
        
    } else {
        currentImage = lastImage;
    }
    modalImage.src = images[currentImage].src;
}

images.forEach((image, index) => {
    image.addEventListener('click', () => {
        currentImage = index;
        modalImage.src = image.src;
        modalWindow.classList.add('modal--visible');
    });
});

prevBtnImg.addEventListener('click', () => prevImage());
nextBtnImg.addEventListener('click', () => nextImage());

modalWindow.addEventListener('click', (event) => {
    if (event.target == modalWindow || event.target.closest('.modal__cross-button')) {
        modalWindow.classList.remove('modal--visible');
    }
});