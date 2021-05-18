
function openModal(modalSelector, openModalTimer) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (openModalTimer) {
        clearInterval(openModalTimer);
    }

}


function closeModalWindow(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
    document.body.style.overflow = '';
}


function modal(trigerSelector, modalSelector, openModalTimer) {


    const modalTriger = document.querySelectorAll(trigerSelector),
          modalWindow = document.querySelector(modalSelector);



    modalTriger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, openModalTimer));
    });


    // Закрытие модального окна на неактивное поле (overflow).

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == "") {
            closeModalWindow(modalSelector);
        }
    });


    // Закрытие модального окна на кнопку Esc (Escape).

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            closeModalWindow(modalSelector);
        }
    });



    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, openModalTimer);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {openModal};
export {closeModalWindow};