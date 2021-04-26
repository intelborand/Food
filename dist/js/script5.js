'use strict'

const form = document.querySelectorAll('form');
const mess = {
    load: 'Загрузка',
    done: 'Готово!',
    fail: 'Ошибка'
};

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const messStatus = document.createElement('div');
        messStatus.textContent = mess.load;
        form.append(messStatus);

        const req = new XMLHttpRequest();
        req.open('POST', 'server.php');
        req.setRequestHeader('Content-type', 'application/json');

        const formData = new FormData(form);

        const object = {};

        formData.forEach(function(value, key) {
            object[key] = value;
        });

        const json = JSON.stringify(object);

        req.send(json);

        req.addEventListener('load', () => {
            if (req.status === 200) {
                console.log(req.response);
                messStatus.textContent = mess.done;
                form.reset();
            } else {
                messStatus.textContent = mess.fail;
            }
        });

    });
}