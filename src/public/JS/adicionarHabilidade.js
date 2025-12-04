let listaHabilidades = [];

document.addEventListener('DOMContentLoaded', () => {
    const inputHidden = document.getElementById('habilidades-hidden');
    
    if (inputHidden && inputHidden.value) {
        try {
            listaHabilidades = JSON.parse(inputHidden.value);
            renderizarHabilidades();
        } catch (e) {
            console.error("Erro ao carregar habilidades:", e);
            listaHabilidades = [];
        }
    }
});

function adicionarHabilidade() {
    const input = document.getElementById('habilidade-input');
    const valor = input.value.trim();
    
    if (valor && !listaHabilidades.includes(valor)) {
        listaHabilidades.push(valor);
        
        renderizarHabilidades();
        atualizarInputHidden();
        
        input.value = ''; 
        input.focus(); 
    } else if (listaHabilidades.includes(valor)) {
        alert('Esta habilidade já foi adicionada!');
    }
}

function removerHabilidade(index) {
    listaHabilidades.splice(index, 1); 
    renderizarHabilidades(); 
    atualizarInputHidden(); 
}

function atualizarInputHidden() {
    const inputHidden = document.getElementById('habilidades-hidden');
    inputHidden.value = JSON.stringify(listaHabilidades);
}

function renderizarHabilidades() {
    const listaUl = document.getElementById('habilidades-lista');
    listaUl.innerHTML = ''; 

    listaHabilidades.forEach((habilidade, index) => {
        const item = document.createElement('div');
        item.className = 'd-inline-block bg-primary text-white rounded-pill px-3 py-2 m-1';
        
        item.innerHTML = `
            ${habilidade}
            <span style="cursor: pointer; margin-left: 8px; font-weight: bold;" 
                  onclick="removerHabilidade(${index})" title="Remover">
                &times;
            </span>
        `;
        
        listaUl.appendChild(item);
    });
}