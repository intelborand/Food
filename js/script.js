    import tabs from './modules/tabs';
    import timer from './modules/timer';
    import slider from './modules/slider';
    import modal from './modules/modal';
    import form from './modules/form';
    import cards from './modules/cards';
    import calculator from './modules/calculator';
    import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const openModalTimer = setTimeout(() => openModal('.modal', openModalTimer), 5000);

          tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
          timer('.timer', '2021-06-23');
          slider({
            container: '.offer__slider',
            slide: '.offer__slide',
            prevArrow: '.offer__slider-prev',
            nextArrow: '.offer__slider-next',
            totalCounter: '#total',
            currentCounter: '#current',
            wrapper: '.offer__slider-wrapper',
            slideField: '.offer__slider-inner',
          });
          modal('[data-modal]', '.modal', openModalTimer);
          form('form', openModalTimer);
          cards();
          calculator();
});