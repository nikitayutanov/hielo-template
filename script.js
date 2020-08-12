'use strict';

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

document.addEventListener('click', () => {
    if (event.target.closest('.menu__button') && !menu.visible) {
        menu.open();
    } else if (!event.target.closest('.menu__list') && menu.visible) {
        menu.close();
    }
});