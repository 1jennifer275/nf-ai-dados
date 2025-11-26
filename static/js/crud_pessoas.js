// Estado global
let currentTab = 'FORNECEDOR';
let currentSort = { column: '', direction: 'asc' };
let pessoas = [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    mostrarEstadoVazio();
});

// Configurar tabs
function setupTabs() {
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach((tab, index) => {
        // Ativar primeira tab
        if (index === 0) {
            tab.classList.add('text-black', 'border-black');
        } else {
            tab.classList.add('text-gray-600', 'border-transparent');
        }
        
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab.toUpperCase();
            switchTab(tabName, tab);
        });
    });
}

// Trocar de tab
function switchTab(tabName, clickedTab) {
    currentTab = tabName;
    
    // Atualizar aparência dos tabs
    document.querySelectorAll('.tab-button').forEach(tab => {
        tab.classList.remove('text-black', 'border-black');
        tab.classList.add('text-gray-600', 'border-transparent');
    });
    clickedTab.classList.remove('text-gray-600', 'border-transparent');
    clickedTab.classList.add('text-black', 'border-black');
    
    // Limpar tabela
    mostrarEstadoVazio();
    document.getElementById('search-input').value = '';
}

// Buscar com filtro
function buscar() {
    const searchInput = document.getElementById('search-input');
    const busca = searchInput.value.trim();
    
    if (!busca) {
        mostrarAlerta('Digite algo para buscar', 'error');
        return;
    }
    
    carregarPessoas(busca, false);
}

// Carregar todos (apenas ATIVOS)
function carregarTodos() {
    carregarPessoas('', true);
}

// Carregar pessoas da API
async function carregarPessoas(busca = '', todos = false) {
    const loading = document.getElementById('loading');
    const emptyState = document.getElementById('empty-state');
    const tableWrapper = document.getElementById('table-wrapper');
    
    loading.classList.remove('hidden');
    emptyState.classList.add('hidden');
    tableWrapper.classList.add('hidden');
    
    try {
        let url = `/api/pessoas?tipo=${currentTab}`;
        
        if (todos) {
            url += '&status=ATIVO&todos=false';
        } else if (busca) {
            url += `&busca=${encodeURIComponent(busca)}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        pessoas = data;
        renderizarTabela(data);
        
    } catch (error) {
        mostrarAlerta('Erro ao carregar dados: ' + error.message, 'error');
    } finally {
        loading.classList.add('hidden');
    }
}

// Renderizar tabela
function renderizarTabela(data) {
    const emptyState = document.getElementById('empty-state');
    const tableWrapper = document.getElementById('table-wrapper');
    const tbody = document.getElementById('table-body');
    
    if (!data || data.length === 0) {
        emptyState.classList.remove('hidden');
        tableWrapper.classList.add('hidden');
        return;
    }
    
    emptyState.classList.add('hidden');
    tableWrapper.classList.remove('hidden');
    
    tbody.innerHTML = data.map(pessoa => `
        <tr class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${pessoa.idPessoas}</td>
            <td class="px-6 py-4 text-sm text-gray-900 font-semibold">${pessoa.razaosocial}</td>
            <td class="px-6 py-4 text-sm text-gray-600">${pessoa.fantasia || '-'}</td>
            <td class="px-6 py-4 text-sm text-gray-600 font-mono">${pessoa.documento}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2.5 py-1 text-xs font-semibold rounded-lg ${
                    pessoa.status === 'ATIVO' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
                }">${pessoa.status}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center space-x-2">
                    <button onclick="editarPessoa(${pessoa.idPessoas})" class="p-2 text-black hover:bg-gray-100 rounded-lg transition-colors" title="Editar">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    </button>
                    ${pessoa.status === 'ATIVO' ? `
                        <button onclick="excluirPessoa(${pessoa.idPessoas})" class="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="Excluir">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    ` : ''}
                </div>
            </td>
        </tr>
    `).join('');
}

// Mostrar estado vazio
function mostrarEstadoVazio() {
    const emptyState = document.getElementById('empty-state');
    const tableWrapper = document.getElementById('table-wrapper');
    emptyState.classList.remove('hidden');
    tableWrapper.classList.add('hidden');
}

// Ordenar tabela
function ordenar(coluna) {
    if (currentSort.column === coluna) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = coluna;
        currentSort.direction = 'asc';
    }
    
    pessoas.sort((a, b) => {
        let valueA = a[coluna] || '';
        let valueB = b[coluna] || '';
        
        valueA = String(valueA).toLowerCase();
        valueB = String(valueB).toLowerCase();
        
        if (currentSort.direction === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });
    
    renderizarTabela(pessoas);
}

// Abrir modal para nova pessoa
function abrirModalNovo() {
    document.getElementById('modal-title').textContent = `Novo ${currentTab}`;
    document.getElementById('pessoa-id').value = '';
    document.getElementById('pessoa-tipo').value = currentTab;
    document.getElementById('form-pessoa').reset();
    document.getElementById('modal').classList.remove('hidden');
}

// Editar pessoa
async function editarPessoa(id) {
    try {
        const response = await fetch(`/api/pessoas/${id}`);
        const pessoa = await response.json();
        
        if (pessoa.error) {
            mostrarAlerta('Erro ao carregar pessoa', 'error');
            return;
        }
        
        document.getElementById('modal-title').textContent = `Editar ${pessoa.tipo}`;
        document.getElementById('pessoa-id').value = pessoa.idPessoas;
        document.getElementById('pessoa-tipo').value = pessoa.tipo;
        document.getElementById('razaosocial').value = pessoa.razaosocial;
        document.getElementById('fantasia').value = pessoa.fantasia || '';
        document.getElementById('documento').value = pessoa.documento;
        
        document.getElementById('modal').classList.remove('hidden');
    } catch (error) {
        mostrarAlerta('Erro ao carregar pessoa: ' + error.message, 'error');
    }
}

// Excluir pessoa (exclusão lógica)
async function excluirPessoa(id) {
    if (!confirm('Tem certeza que deseja excluir esta pessoa?\n\nEsta é uma exclusão lógica (STATUS será alterado para INATIVO).')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/pessoas/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            mostrarAlerta('Pessoa excluída com sucesso!', 'success');
            carregarTodos();
        } else {
            mostrarAlerta('Erro ao excluir: ' + (result.error || 'Erro desconhecido'), 'error');
        }
    } catch (error) {
        mostrarAlerta('Erro ao excluir pessoa: ' + error.message, 'error');
    }
}

// Fechar modal
function fecharModal() {
    document.getElementById('modal').classList.add('hidden');
    document.getElementById('form-pessoa').reset();
}

// Salvar pessoa (criar ou atualizar)
document.getElementById('form-pessoa').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('pessoa-id').value;
    const tipo = document.getElementById('pessoa-tipo').value;
    const dados = {
        tipo: tipo,
        razaosocial: document.getElementById('razaosocial').value,
        fantasia: document.getElementById('fantasia').value,
        documento: document.getElementById('documento').value
    };
    
    try {
        let response;
        if (id) {
            response = await fetch(`/api/pessoas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
        } else {
            response = await fetch('/api/pessoas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
        }
        
        const result = await response.json();
        
        if (result.success || result.data) {
            mostrarAlerta(id ? 'Pessoa atualizada com sucesso!' : 'Pessoa criada com sucesso!', 'success');
            fecharModal();
            carregarTodos();
        } else {
            mostrarAlerta('Erro: ' + (result.error || 'Erro desconhecido'), 'error');
        }
    } catch (error) {
        mostrarAlerta('Erro ao salvar: ' + error.message, 'error');
    }
});

// Mostrar alerta
function mostrarAlerta(mensagem, tipo) {
    const alert = document.getElementById('alert');
    const alertIcon = document.getElementById('alert-icon');
    const alertMessage = document.getElementById('alert-message');
    
    alert.className = `flex items-start space-x-3 mb-6 rounded-xl p-4 border ${
        tipo === 'success' ? 'bg-white border-gray-200 shadow-sm' : 'bg-white border-gray-200 shadow-sm'
    }`;
    
    alertIcon.className = `w-5 h-5 mt-0.5 text-black`;
    alertIcon.innerHTML = tipo === 'success' 
        ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>'
        : '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293z" clip-rule="evenodd"/>';
    
    alertMessage.textContent = mensagem;
    alertMessage.className = `text-sm font-semibold text-gray-900`;
    
    alert.classList.remove('hidden');
    
    setTimeout(() => {
        alert.classList.add('hidden');
    }, 5000);
}

// Fechar modal ao clicar fora
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        fecharModal();
    }
});
