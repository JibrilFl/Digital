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

export function Modal() {
    const btnOpen = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    btnOpen.forEach(item => {
        item.addEventListener('click', openModal);
    });


    window.addEventListener('keyup', (e) => {
        if (modal.classList.contains('show') && e.code == 'Escape') {
            closeModal();
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });


    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.querySelector('body').style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.querySelector('body').style.overflow = '';
    }

    // form

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка',
        complete: 'Спасибо! Мы с вами свяжемся, но это не точно &#128515;',
        fatal: 'Ошибка отправки данных',
        closeIco: "img/close-icon.svg"
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const request = new XMLHttpRequest();
            request.open('POST', 'files/server.php');

            const formData = new FormData(form);
            request.send(formData);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    thanksMessageModal(message.complete);
                    form.reset();
                } else {
                    thanksMessageModal(message.fatal);
                }
            });
        });
    }

    function thanksMessageModal(message) {
        const prevModal = document.querySelector('.modal__wrapper');

        prevModal.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__wrapper');
        thanksModal.innerHTML = `
            <div class="modal__inner">
                <div class="modal__closed">
                    <img src="img/close-icon.svg" alt="close" data-close>
                </div>
                <h3 class="modal__title modal__title_mt">${message}</h3>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.remove('hide');
            closeModal();
        }, 4000);
    }
}