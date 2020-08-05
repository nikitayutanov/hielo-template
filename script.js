'use strict';

const menuButton = document.querySelector('.menu__button');
const hamburger = document.querySelector('.menu__hamburger');
const menu = document.querySelector('.menu__list');

let menuVisible = false;

menuButton.addEventListener('click', toggleMenu);

function toggleMenu() {
    if (!menuVisible) {
        menu.classList.add('menu__list--open');
        hamburger.classList.add('menu__hamburger--open');
        menuVisible = true;
    } else {
        menu.classList.remove('menu__list--open');
        hamburger.classList.remove('menu__hamburger--open');
        menuVisible = false;
    }
}