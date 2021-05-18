function timer(id, deadLine) {



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
        };
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

    setClock(id, deadLine);
}

export default timer;