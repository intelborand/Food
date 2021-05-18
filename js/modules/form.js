import {openModal, closeModalWindow} from './modal';
import {postData} from '../services/services';

function form(formSelector, openModalTimer) {
    // Отправка данных из формы на сервер

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Well Done!',
        fail: 'Fail'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0, auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);


            const formData = new FormData(form);

            // Перебор объекта в объект, который тоже можно использовать! 

            // const object = {};
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // })

            // Полученный объект приводится в формат JSON и исползуется в отправке формы

            const json = JSON.stringify(Object.fromEntries(formData.entries()));   //Способ быстрого превращения объекта FormData в формат JSON


            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.fail);
            })
            .finally(() => {
                form.reset();
            });

        });

    }

    function showThanksModal(message) {
        const prevThanksModal = document.querySelector('.modal__dialog');

        prevThanksModal.classList.add('hide');
        openModal('.modal', openModalTimer);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('.modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevThanksModal.classList.add('show');
            prevThanksModal.classList.remove('hide');
            closeModalWindow('.modal');
        }, 4000);

    }
}

export default form;