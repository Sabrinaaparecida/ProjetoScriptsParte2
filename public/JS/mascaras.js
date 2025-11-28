document.addEventListener('DOMContentLoaded', function () {

    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        const cpfMaskOptions = {
            mask: '000.000.000-00'
        };
        const cpfMask = IMask(cpfInput, cpfMaskOptions);
    }

    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        const telefoneMaskOptions = {
            mask: [
                { mask: '(00) 0000-0000' },
                { mask: '(00) 00000-0000' }
            ]
        };
        const telefoneMask = IMask(telefoneInput, telefoneMaskOptions);

        telefoneInput.addEventListener('input', function () {
            telefoneInput.classList.remove('is-valid', 'is-invalid');

            const numero = telefoneInput.value.replace(/\D/g, '');

            if (numero.length > 0) {
                if (numero.length === 10 || numero.length === 11) {
                    telefoneInput.classList.add('is-valid');
                } else {
                    telefoneInput.classList.add('is-invalid');
                }
            }
        });
    }

    const emailInput = document.getElementById('email');
    if (emailInput) {
        const emailMaskOptions = {
            mask: /^\S*@?\S*$/
        };
        const emailMask = IMask(emailInput, emailMaskOptions);

        emailInput.addEventListener('input', function () {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            emailInput.classList.remove('is-valid', 'is-invalid');

            if (emailInput.value) {
                if (emailRegex.test(emailInput.value)) {
                    emailInput.classList.add('is-valid');
                } else {
                    emailInput.classList.add('is-invalid');
                }
            }
        });
    }

});
