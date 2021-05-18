import {getResource} from '../services/services';

function cards() {
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
}
export default cards;