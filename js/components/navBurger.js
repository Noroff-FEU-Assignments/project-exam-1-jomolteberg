const burgerElement = document.querySelector('.nav-burger');
const navMenuElement = document.querySelector('.nav-menu');

burgerElement.addEventListener('click', () => {
    const isExpanded = burgerElement.getAttribute('aria-expanded') === 'true';
    burgerElement.setAttribute('aria-expanded', !isExpanded);
    navMenuElement.classList.toggle('expanded');
});


