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

    // GET запрос на получение данных с сервера

    const getResource = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
           throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCards(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

    //  Использование библиотеки axios для GET запроса

    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCards(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    // Динамическое создание элементов, если не требуется шаблонизация (если достаточно создать один раз)

    // getResource('http://localhost:3000/menu')
    // .then(data => createCard(data));

    // // function createCard(data) {
    // //     data.forEach(({img, altimg, title, descr, price}) => {
    // //         const element = document.createElement('div');
    // //         element.classList.add('menu__item');
    // //         price = price*32;

    // //         element.innerHTML = `
    // //             <div class="menu__item">
    // //                 <img src=${img} alt=${altimg}>
    // //                 <h3 class="menu__item-subtitle">${title}</h3>
    // //                 <div class="menu__item-descr">${descr}</div>
    // //                 <div class="menu__item-divider"></div>
    // //                 <div class="menu__item-price">
    // //                     <div class="menu__item-cost">Цена:</div>
    // //                     <div class="menu__item-total"><span>${price}</span> грн/день</div>
    // //                 </div>
    // //             </div>
    // //         `;
    // //         document.querySelector(".menu .container").append(element);
    // //     })
        
    // // }


    // Отправка данных из формы на сервер

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Well Done!',
        fail: 'Fail'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                    'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
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

            // Перебор объекта в объект, который тоже можно использовать! 

            // const object = {};
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // })

            // Полученный объект приводится в формат JSON и исползуется в отправке формы

            const json = JSON.stringify(Object.fromEntries(formData.entries()));   //Способ быстрого превращения объекта FormData в формат JSON   


            postData('http://localhost:3000/requests', json)
            .then(data => data.text())
            .then(data => {
                // console.log(data);
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


    // Slider

    let slideIndex = 1;
    let offset = 0;
    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

    
    if(slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }


    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0,5s all'

    slidesWrapper.style.overflow = 'hidden'

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    
    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);

        if(i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }


    next.addEventListener('click', () => {
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[slideIndex - 1].style.opacity = 1;
    });
           
    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = (+width.slice(0, width.length - 2) * (slides.length - 1));
        } else {
            offset -= +width.slice(0, width.length - 2); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;
            
            if(slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => {
                dot.style.opacity = '.5';
            });
            dots[slideIndex - 1].style.opacity = 1;
        });
    });



    // showSlides(slideIndex);


    // function showSlides(n) {
    //     if(n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if(n < 1) {
    //          slideIndex = slides.length;
    //     } 

    //     slides.forEach(item => {
    //         item.style.display = 'none';
    //     });

    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent =  `0${slideIndex}`;
    //     } else {
    //         current.textContent =  slideIndex;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', function() {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', function() {
    //     plusSlides(1);
    // });
  



    // Calculator

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'male');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.55);
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = 'Введите ВСЕ данные';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        } 
    }

    calcTotal();

    function initLocalSettings(parent, activeClass) {
        const elem = document.querySelectorAll(parent);

        elem.forEach(el => {
            el.classList.remove(activeClass);

            if (el.getAttribute('id') === localStorage.getItem('sex')) {
                el.classList.add(activeClass);
            }

            if (el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                el.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(parentSelector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });      
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


   

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = '';
            }


          switch(input.getAttribute('id')) {
            case "height":
                height = +input.value;
                break;
            case "weight":
                weight = +input.value;
                break;
            case "age":
                age = +input.value;
                break;
            }

            calcTotal();
        });  

        

    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');



});