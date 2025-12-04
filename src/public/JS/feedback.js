document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const body = document.body;

    if (body.dataset.cadastroSucesso === 'true') {
        if (typeof showToast === 'function') {
            showToast("Sucesso!", "Conta criada com sucesso. Faça seu login.", "success");
        }
    }

    if (body.dataset.showWelcomeToast === 'true') {
        const userName = body.dataset.userName || 'Usuário';
        
        if (typeof showToast === 'function') {
            showToast(
              `Bem-vindo(a), ${userName.split(' ')[0]}!`,
              "Login realizado com sucesso.",
              "success"
            );
        }
    }
});