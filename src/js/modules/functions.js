/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */

export function isWebp() {
    // Проверка поддержки webp
    function testWebP(callback) {

        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    // Добавление класса _webp или _no-webp для HTML    
    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}

export function openModal() {
    const btnOpen = document.querySelectorAll('[data-modal]'),
        btnClose = document.querySelector('[data-close]'),
        modal = document.querySelector('.form');

    btnOpen.forEach(item => {
        item.addEventListener('click', showModal);
    });

    btnClose.addEventListener('click', hideModal);

    window.addEventListener('keyup', (e) => {
        if (modal.classList.contains('show') && e.code == 'Escape') {
            hideModal();
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
            hideModal();
        }
    });


    function showModal() {
        modal.classList.add('show');
        document.querySelector('body').style.overflow = 'hidden';
    }

    function hideModal() {
        modal.classList.remove('show');
        document.querySelector('body').style.overflow = '';
    }
}

export function postDataForms() {
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        complete: 'Спасибо! Мы с вами свяжемся, но это не точно &#128515;',
        fatal: 'Ошибка отправки данных'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('modal');
            statusMessage.innerHTML = `
                <p>${message.loading}</p>
            `;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'files/server.php');

            const formData = new FormData(form);
            request.send(formData);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.innerHTML = `
                        <p>${message.complete}</p>
                    `;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.innerHTML = `
                        <p>${message.fatal}</p>
                    `;
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 4000);
                }
            });
        });
    }
}