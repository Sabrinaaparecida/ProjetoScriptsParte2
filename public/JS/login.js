function login(event) {
    event.preventDefault();

    const user = document.getElementById("email").value;
    const pass = document.getElementById("senha").value;

    const usuarioCorreto = "teste@teste";
    const senhaCorreta = "teste";

    if (user === usuarioCorreto && pass === senhaCorreta) {
        showToast("Sucesso", "Login realizado com sucesso!", "success");
        setTimeout(() => {
            window.location.href = "PaginaDeHome.html";
        }, 1000);
    } else {
        showToast("Erro", "Usuário ou senha incorretos!", "danger");
    }
}
