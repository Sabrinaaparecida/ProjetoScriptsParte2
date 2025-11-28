function checarCPF(input) {
    const cpf = input.value;
    const feedbackDiv = document.getElementById('feedback-cpf');

    if (cpf.trim() === '') {
        input.classList.remove('is-valid', 'is-invalid');
        feedbackDiv.textContent = '';
        return;
    }

    if (validarEstruturaCPF(cpf)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        feedbackDiv.textContent = ''; 
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        feedbackDiv.textContent = 'CPF inválido. Por favor, verifique os dígitos.';
    }
}
function validarEstruturaCPF(cpf) {
    const cpfLimpo = cpf.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) {
        return false;
    }

    if (/^(\d)\1+$/.test(cpfLimpo)) {
        return false;
    }

    const digitos = cpfLimpo.split('').map(Number);

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += digitos[i] * (10 - i);
    }

    let resto = 11 - (soma % 11);
    let digitoVerificador1 = (resto === 10 || resto === 11) ? 0 : resto;

    if (digitoVerificador1 !== digitos[9]) {
        return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += digitos[i] * (11 - i);
    }

    resto = 11 - (soma % 11);
    let digitoVerificador2 = (resto === 10 || resto === 11) ? 0 : resto;

    if (digitoVerificador2 !== digitos[10]) {
        return false;
    }

    return true;
}