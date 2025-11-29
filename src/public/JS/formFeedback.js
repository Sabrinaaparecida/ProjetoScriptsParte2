document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('curriculo-form');
    const toastTemplate = document.getElementById('toast-template');


    function showToast(message, title, type) {

        const newToast = toastTemplate.cloneNode(true);
        newToast.removeAttribute('id');

        const toastTitle = newToast.querySelector('.toast-title');
        const toastBody = newToast.querySelector('.toast-body');
        const toastHeader = newToast.querySelector('.toast-header');

        toastTitle.textContent = title;
        toastBody.textContent = message;

        if (type === 'danger') {
            toastHeader.classList.add('bg-danger', 'text-white');
            newToast.querySelector('.btn-close').classList.add('btn-close-white');
        } else {
            toastHeader.classList.add('bg-success', 'text-white');
            newToast.querySelector('.btn-close').classList.add('btn-close-white');
        }

        document.getElementById('toast-container').appendChild(newToast);
        const toast = new bootstrap.Toast(newToast, { delay: 5000 });
        toast.show();

        newToast.addEventListener('hidden.bs.toast', () => {
            newToast.remove();
        });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let isFormValid = true;

        form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

        form.querySelectorAll('[required]').forEach(input => {
            if (!input.value.trim()) {
                isFormValid = false;
                input.classList.add('is-invalid');
            }
        });

        if (!isFormValid) {
            showToast(
                'Por favor, preencha todos os campos destacados em vermelho.',
                'Campos Obrigatórios',
                'danger'
            );
        }
        else {
            showToast(
                'Seu currículo foi enviado com sucesso!',
                'Envio Concluído',
                'success'
            );


            form.reset();
            form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
                el.classList.remove('is-valid', 'is-invalid');
            });
            document.getElementById('habilidades-lista').innerHTML = '';
        }
    });

});
