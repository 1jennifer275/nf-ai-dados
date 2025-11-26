// Estado global
let currentSort = { column: '', direction: 'asc' };
let movimentos = [];
let pessoas = [];
let classificacoes = [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    mostrarEstadoVazio();
    carregarPessoasEClassificacoes();
});

// Carregar pessoas e classificações para os selects
async function carregarPessoasEClassificacoes() {
    try {
        const [pessoasRes, classificacoesRes] = await Promise.all([
            fetch('/api/pessoas?status=ATIVO&todos=false'),
            fetch('/api/classificacoes?status=ATIVO&todos=false')
        ]);
        
        pessoas = await pessoasRes.json();
        classificacoes = await classificacoesRes.json();
    } catch (error) {
        console.error('Erro ao carregar pessoas e classificações:', error);
    }
}

// Buscar com filtro
function buscar() {
    const searchInput = document.getElementById('search-input');
    const busca = searchInput.value.trim();
    
    if (!busca) {
        mostrarAlerta('Digite algo para buscar', 'error');
        return;
    }
    
    carregarMovimentos(busca, false);
}

// Carregar todos (apenas ATIVOS)
function carregarTodos() {
    carregarMovimentos('', true);
}

// Carregar movimentos da API
async function carregarMovimentos(busca = '', todos = false) {
    const loading = document.getElementById('loading');
    const emptyState = document.getElementById('empty-state');
    const tableWrapper = document.getElementById('table-wrapper');
    
    loading.classList.remove('hidden');
    emptyState.classList.add('hidden');
    tableWrapper.classList.add('hidden');
    
    try {
        let url = '/api/movimentos?';
        
        if (todos) {
            url += 'status=ATIVO&todos=false';
        } else if (busca) {
            url += `busca=${encodeURIComponent(busca)}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        movimentos = data;
        renderizarTabela(data);
        
    } catch (error) {
        mostrarAlerta('Erro ao carregar dados: ' + error.message, 'error');
    } finally {
        loading.classList.remove('hidden');
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
    
    tbody.innerHTML = data.map(mov => {
        const fornecedorNome = mov.fornecedor_cliente ? mov.fornecedor_cliente.razaosocial : '-';
        const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(mov.valortotal || 0);
        
        return `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${mov.idMovimentoContas}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-gray-100 text-gray-900">${mov.tipo}</span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">${mov.numeronotafiscal || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-600">${mov.dataemissao || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-900">${mov.descricao || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-900 font-semibold">${fornecedorNome}</td>
                <td class="px-6 py-4 text-sm text-gray-900 font-bold">${valorFormatado}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2.5 py-1 text-xs font-semibold rounded-lg ${
                        mov.status === 'ATIVO' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
                    }">${mov.status}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                    <div class="flex items-center justify-center space-x-2">
                        <button onclick="editarMovimento(${mov.idMovimentoContas})" class="p-2 text-black hover:bg-gray-100 rounded-lg transition-colors" title="Editar">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                        </button>
                        ${mov.status === 'ATIVO' ? `
                            <button onclick="excluirMovimento(${mov.idMovimentoContas})" class="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="Excluir">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
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
    
    movimentos.sort((a, b) => {
        let valueA = a[coluna];
        let valueB = b[coluna];
        
        if (valueA === null || valueA === undefined) valueA = '';
        if (valueB === null || valueB === undefined) valueB = '';
        
        valueA = String(valueA).toLowerCase();
        valueB = String(valueB).toLowerCase();
        
        if (currentSort.direction === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });
    
    renderizarTabela(movimentos);
}

// Abrir modal para novo movimento
async function abrirModalNovo() {
    document.getElementById('modal-title').textContent = 'Novo Movimento';
    document.getElementById('movimento-id').value = '';
    document.getElementById('form-movimento').reset();
    
    await carregarPessoasNoSelect();
    await carregarClassificacoesNoModal();
    
    document.getElementById('modal').classList.remove('hidden');
}

// Carregar pessoas no select
async function carregarPessoasNoSelect() {
    if (pessoas.length === 0) {
        await carregarPessoasEClassificacoes();
    }
    
    const fornecedorSelect = document.getElementById('fornecedor');
    const faturadoSelect = document.getElementById('faturado');
    
    fornecedorSelect.innerHTML = '<option value="">Selecione...</option>';
    faturadoSelect.innerHTML = '<option value="">Selecione...</option>';
    
    pessoas.forEach(pessoa => {
        const option1 = document.createElement('option');
        option1.value = pessoa.idPessoas;
        option1.textContent = `${pessoa.razaosocial} (${pessoa.tipo})`;
        fornecedorSelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = pessoa.idPessoas;
        option2.textContent = `${pessoa.razaosocial} (${pessoa.tipo})`;
        faturadoSelect.appendChild(option2);
    });
}

// Carregar classificações no modal
async function carregarClassificacoesNoModal(classificacoesSelecionadas = []) {
    if (classificacoes.length === 0) {
        await carregarPessoasEClassificacoes();
    }
    
    const container = document.getElementById('classificacoes-list');
    container.innerHTML = '';
    
    if (classificacoes.length === 0) {
        container.innerHTML = '<p class="text-sm text-gray-600">Nenhuma classificação cadastrada</p>';
        return;
    }
    
    classificacoes.forEach(classif => {
        const div = document.createElement('div');
        div.className = 'flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = classif.idClassificacao;
        checkbox.id = `classif-${classif.idClassificacao}`;
        checkbox.className = 'w-4 h-4';
        
        if (classificacoesSelecionadas.includes(classif.idClassificacao)) {
            checkbox.checked = true;
        }
        
        const label = document.createElement('label');
        label.htmlFor = `classif-${classif.idClassificacao}`;
        label.textContent = `${classif.descricao} (${classif.tipo})`;
        label.className = 'text-sm text-gray-900 font-medium cursor-pointer';
        
        div.appendChild(checkbox);
        div.appendChild(label);
        container.appendChild(div);
    });
}

// Editar movimento
async function editarMovimento(id) {
    try {
        const response = await fetch(`/api/movimentos/${id}`);
        const mov = await response.json();
        
        if (mov.error) {
            mostrarAlerta('Erro ao carregar movimento', 'error');
            return;
        }
        
        document.getElementById('modal-title').textContent = 'Editar Movimento';
        document.getElementById('movimento-id').value = mov.idMovimentoContas;
        document.getElementById('tipo').value = mov.tipo;
        document.getElementById('numeronotafiscal').value = mov.numeronotafiscal || '';
        
        if (mov.dataemissao) {
            const [dia, mes, ano] = mov.dataemissao.split('/');
            document.getElementById('dataemissao').value = `${ano}-${mes}-${dia}`;
        }
        
        document.getElementById('valortotal').value = mov.valortotal || 0;
        document.getElementById('descricao').value = mov.descricao || '';
        
        await carregarPessoasNoSelect();
        
        if (mov.fornecedor_cliente) {
            document.getElementById('fornecedor').value = mov.fornecedor_cliente.idPessoas;
        }
        if (mov.faturado) {
            document.getElementById('faturado').value = mov.faturado.idPessoas;
        }
        
        const classificacoesSelecionadas = mov.classificacoes ? mov.classificacoes.map(c => c.idClassificacao) : [];
        await carregarClassificacoesNoModal(classificacoesSelecionadas);
        
        document.getElementById('modal').classList.remove('hidden');
    } catch (error) {
        mostrarAlerta('Erro ao carregar movimento: ' + error.message, 'error');
    }
}

// Excluir movimento (exclusão lógica)
async function excluirMovimento(id) {
    if (!confirm('Tem certeza que deseja excluir este movimento?\n\nEsta é uma exclusão lógica (STATUS será alterado para INATIVO).')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/movimentos/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            mostrarAlerta('Movimento excluído com sucesso!', 'success');
            carregarTodos();
        } else {
            mostrarAlerta('Erro ao excluir: ' + result.error, 'error');
        }
    } catch (error) {
        mostrarAlerta('Erro ao excluir movimento: ' + error.message, 'error');
    }
}

// Fechar modal
function fecharModal() {
    document.getElementById('modal').classList.add('hidden');
    document.getElementById('form-movimento').reset();
}

// Salvar movimento (criar ou atualizar)
document.getElementById('form-movimento').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('movimento-id').value;
    
    const classificacoesSelecionadas = [];
    document.querySelectorAll('#classificacoes-list input[type="checkbox"]:checked').forEach(checkbox => {
        classificacoesSelecionadas.push(parseInt(checkbox.value));
    });
    
    const dados = {
        tipo: document.getElementById('tipo').value,
        numeronotafiscal: document.getElementById('numeronotafiscal').value,
        dataemissao: document.getElementById('dataemissao').value,
        valortotal: parseFloat(document.getElementById('valortotal').value),
        descricao: document.getElementById('descricao').value,
        Pessoas_idFornecedorCliente: parseInt(document.getElementById('fornecedor').value),
        Pessoas_idFaturado: parseInt(document.getElementById('faturado').value),
        classificacoes: classificacoesSelecionadas
    };
    
    try {
        let response;
        if (id) {
            response = await fetch(`/api/movimentos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
        } else {
            response = await fetch('/api/movimentos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
        }
        
        const result = await response.json();
        
        if (result.success || result.data) {
            mostrarAlerta(id ? 'Movimento atualizado com sucesso!' : 'Movimento criado com sucesso!', 'success');
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
    
    alert.className = 'flex items-start space-x-3 mb-6 rounded-xl p-4 border bg-white border-gray-200 shadow-sm';
    
    alertIcon.className = 'w-5 h-5 mt-0.5 text-black';
    alertIcon.innerHTML = tipo === 'success' 
        ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>'
        : '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293z" clip-rule="evenodd"/>';
    
    alertMessage.textContent = mensagem;
    alertMessage.className = 'text-sm font-semibold text-gray-900';
    
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
