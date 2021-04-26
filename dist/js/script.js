'use strict'

window.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach (item => {
            item.style.display = 'none';
        });
        
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };
    


    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    };




    /* Вызов функций */
    hideTabContent();
    showTabContent();


   tabsParent.addEventListener('click', (e) => { 
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

   });


    //Timer

    const deadLine = '2021-05-11';


    // В функции переменная t получает разницу между установленным временем и реальным временем пльзователя, как на компьютере. Переменная получает результат (разницу) в миллисекундах, которые нужно перевести в год, месяц, день, час, минуты, секунды и миллисекунды. 
    // Переменная days вычисляет количество дней, оставшихся до заданной даты выше. 1000 миллисекунд (1 сек) умножаем на 60 сек (в 1 минуте), умножаем на 60 (в 1 часу) и умножаем на количество часов в сутках (24).
    // Переменная hours вычисляет количество часов и делит все на 24 (макс. часов в сутках), возвращается остаток, который помещается в ЧАСЫ, а целые (то что разделилось на 24) помещается в сутки. Если в переменной получаем 26 часов -> целое (24) уходит в сутки (+1), а остаток (2 часа) уходит в часы. Остается нам 1 сутки и 2 часа. 



    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / 1000) % 60);


        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock('.timer', deadLine);



    // Modal window

    const modalTriger = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal');


    function openModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(openModalTimer);
    }

    modalTriger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModalWindow() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    };


    // Закрытие модального окна на неактивное поле (overflow).

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == "") {
            closeModalWindow();
        };
    });


    // Закрытие модального окна на кнопку Esc (Escape).

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            closeModalWindow();
        }
    });

    const openModalTimer = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Class constructor Menu Cards

    class MenuCards {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transform = 32;
            this.convertToUAH();
        }

        convertToUAH() {
            this.price = this.price * this.transform;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">Меню "Фитнес"</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCards(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

    new MenuCards(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container'
    ).render();

    new MenuCards(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        23,
        '.menu .container'
    ).render();


    // Отправка данных из формы на сервер

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Well Done!',
        fail: 'Fail'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading
            statusMessage.style.cssText = `
                display: block;
                margin: 0, auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);


            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });        



            fetch('server.php', {
                method: "POST",
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify(object)
            })
            .then(data => data.text())
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
            })


                        



        });

    }

    function showThanksModal(message) {
        const prevThanksModal = document.querySelector('.modal__dialog');

        prevThanksModal.classList.add('hide');
        openModal();

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
            closeModalWindow();
        }, 4000);

    }

});