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

const prevBtn = document.querySelector('.slider__prev-button');
const nextBtn = document.querySelector('.slider__next-button');
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