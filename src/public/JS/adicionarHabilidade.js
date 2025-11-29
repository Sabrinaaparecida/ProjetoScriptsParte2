let listaHabilidades = [];

// 1. INICIALIZAÇÃO (Quando a página carrega)
document.addEventListener('DOMContentLoaded', () => {
    const inputHidden = document.getElementById('habilidades-hidden');
    
    // Verifica se já tem algo salvo no input hidden (vindo do banco via EJS)
    if (inputHidden && inputHidden.value) {
        try {
            // Converte o texto '["HTML", "CSS"]' de volta para array
            listaHabilidades = JSON.parse(inputHidden.value);
            renderizarHabilidades();
        } catch (e) {
            console.error("Erro ao carregar habilidades:", e);
            listaHabilidades = [];
        }
    }
});

// 2. ADICIONAR
function adicionarHabilidade() {
    const input = document.getElementById('habilidade-input');
    const valor = input.value.trim();
    
    // Só adiciona se tiver texto e se ainda não existir na lista
    if (valor && !listaHabilidades.includes(valor)) {
        listaHabilidades.push(valor);
        
        renderizarHabilidades();
        atualizarInputHidden();
        
        input.value = ''; // Limpa o campo
        input.focus(); // Devolve o foco para digitar mais
    } else if (listaHabilidades.includes(valor)) {
        alert('Esta habilidade já foi adicionada!');
    }
}

// 3. REMOVER
function removerHabilidade(index) {
    listaHabilidades.splice(index, 1); // Remove do array
    renderizarHabilidades(); // Atualiza visual
    atualizarInputHidden(); // Atualiza o hidden
}

// 4. ATUALIZAR O INPUT ESCONDIDO (O que vai pro banco)
function atualizarInputHidden() {
    const inputHidden = document.getElementById('habilidades-hidden');
    // Transforma o array em texto JSON
    inputHidden.value = JSON.stringify(listaHabilidades);
}

// 5. RENDERIZAR (Criar os cardzinhos/badges visuais)
function renderizarHabilidades() {
    const listaUl = document.getElementById('habilidades-lista');
    listaUl.innerHTML = ''; // Limpa a lista atual

    // Para cada habilidade, cria um elemento visual
    listaHabilidades.forEach((habilidade, index) => {
        // Cria o elemento da lista (li) ou div
        const item = document.createElement('div');
        // Estilo Bootstrap (badge)
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