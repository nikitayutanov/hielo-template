'use strict';

// Menu

const menu = {
    class: {
        list: {
            main: '.menu__list',
            wide: 'menu__list--wide',
            active: 'menu__list--active'
        },

        button: '.menu__button',
        open: 'menu--open'
    },

    nav: document.querySelector('.menu'),
    list: document.querySelector('.menu__list'),
    visible: false,

    open() {
        this.nav.classList.add(this.class.open);
        this.visible = true;
    },

    close() {
        this.nav.classList.remove(this.class.open);
        this.visible = false;
    },

    toggle(e) { 
        if (e.target.closest(this.class.button) && !this.visible) {
            this.open();
        } else if (!e.target.closest(this.class.list.main) && this.visible) {
            this.close();
        }
    }
}

menu.nav.addEventListener('click', (e) => menu.toggle(e));

const wideMenu = menu.list.cloneNode(true);
wideMenu.className = menu.class.list.wide;
menu.nav.appendChild(wideMenu);

// Slider

const slider = document.querySelector('.slider');
const btnClass = '.slider__button';
const buttons = document.querySelectorAll(btnClass);
const prevBtnClass = '.slider__side-button--prev';
const nextBtnClass = '.slider__side-button--next';
const firstSlide = 0;
const lastSlide = buttons.length - 1;
let currentSlide = firstSlide;

function nextSlide() {
    if (currentSlide != lastSlide) {
        currentSlide++;
    } else {
        currentSlide = firstSlide;
    }
    buttons[currentSlide].checked = true;
}

function prevSlide() {
    if (currentSlide != firstSlide) {
        currentSlide--;
    } else {
        currentSlide = lastSlide;
    }
    buttons[currentSlide].checked = true;
}

function changeSlide(e) {
    if (e.target.closest(prevBtnClass)) {
        prevSlide();
    } else if (e.target.closest(nextBtnClass)) {
        nextSlide();
    } else if (e.target.closest(btnClass)) {
        currentSlide = e.target.closest(btnClass).dataset.index;
    }
}

const timer = setInterval(nextSlide, 5000);

slider.addEventListener('click', (e) => {
    changeSlide(e);
    clearInterval(timer);
});

// Parallax + desktop menu

const slides = document.querySelectorAll('.slider__slide');
const speed = 0.7;
let offset;

const height = window.innerHeight;
const lgMediaQuery = window.matchMedia('(min-width: 992px)');

window.addEventListener('scroll', () => {
    offset = window.pageYOffset;
    slides.forEach(slide => slide.style.backgroundPositionY =  offset * speed + 'px');

    if (lgMediaQuery.matches) {
        if (offset >= height) {
            if (menu.visible) {
                menu.close();
            }
            wideMenu.classList.add(menu.class.list.active);
        } else {
            wideMenu.classList.remove(menu.class.list.active);
        }
    }
});

// Gallery

const gallery = document.querySelector('.gallery__main');
const modal = document.querySelector('.modal');
const modalImage = document.querySelector('.modal__image');
const imgClass = '.gallery__image';
const images = document.querySelectorAll(imgClass);
const prevImgBtnClass = '.modal__side-button--prev';
const nextImgBtnClass = '.modal__side-button--next';
const crossBtnClass = '.modal__cross-button';
const modalVisibleClass = 'modal--visible';
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

function showPopup(e) {
    if (e.target.closest(imgClass)) {
        currentImage = e.target.closest(imgClass).dataset.index;
        modalImage.src = e.target.closest(imgClass).src;
        modal.classList.add(modalVisibleClass);
    }
}

function closePopup(e) {
    if (e.target == modal || e.target.closest(crossBtnClass)) {
        modal.classList.remove(modalVisibleClass);
    }
}

function changeImage(e) {
    if (e.target.closest(prevImgBtnClass)) {
        prevImage();
    } else if (e.target.closest(nextImgBtnClass)) {
        nextImage();
    }
}

gallery.addEventListener('click', (e) => showPopup(e));

modal.addEventListener('click', (e) => {
    closePopup(e);
    changeImage(e);
});