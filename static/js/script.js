// Estado global
let selectedFile = null;
let currentData = null;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    setupDragAndDrop();
    setupFileInput();
    setupForm();
});

// Configurar drag and drop
function setupDragAndDrop() {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    
    if (!dropArea || !fileInput) return;
    
    // Prevenir comportamento padrão do navegador
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    
    // Highlight na área de drop
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.remove('border-gray-300');
            dropArea.classList.add('border-black', 'bg-gray-50');
        }, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.remove('border-black', 'bg-gray-50');
            dropArea.classList.add('border-gray-300');
        }, false);
    });
    
    // Handle drop
    dropArea.addEventListener('drop', handleDrop, false);
    
    // Click para selecionar
    dropArea.addEventListener('click', () => {
        fileInput.click();
    });
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
        const file = files[0];
        handleFileSelection(file);
    }
}

// Configurar input de arquivo
function setupFileInput() {
    const fileInput = document.getElementById('file-input');
    if (!fileInput) return;
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelection(e.target.files[0]);
        }
    });
}

// Lidar com seleção de arquivo
function handleFileSelection(file) {
    const fileNameDisplay = document.getElementById('file-name');
    
    if (!file) return;
    
    // Validar tipo de arquivo
    if (file.type !== 'application/pdf') {
        showAlert('Por favor, selecione apenas arquivos PDF', 'error');
        return;
    }
    
    // Validar tamanho (10MB)
    if (file.size > 10 * 1024 * 1024) {
        showAlert('Arquivo muito grande. Máximo: 10MB', 'error');
        return;
    }
    
    selectedFile = file;
    
    // Mostrar nome do arquivo
    if (fileNameDisplay) {
        fileNameDisplay.textContent = `📄 ${file.name} (${formatFileSize(file.size)})`;
        fileNameDisplay.classList.remove('hidden');
    }
}

// Configurar formulário
function setupForm() {
    const form = document.getElementById('upload-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!selectedFile) {
            showAlert('Por favor, selecione um arquivo PDF', 'error');
            return;
        }
        
        await processarPDF();
    });
}

// Processar PDF
async function processarPDF() {
    const uploadBtn = document.getElementById('upload-btn');
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');
    
    // Mostrar loading
    uploadBtn.disabled = true;
    uploadBtn.textContent = 'Processando...';
    loading.classList.remove('hidden');
    results.classList.add('hidden');
    
    // Criar FormData
    const formData = new FormData();
    formData.append('pdf', selectedFile);  // Backend espera 'pdf'
    
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.error) {
            showAlert('Erro ao processar: ' + data.error, 'error');
        } else {
            currentData = data;
            mostrarResultados(data);
        }
    } catch (error) {
        showAlert('Erro ao processar arquivo: ' + error.message, 'error');
    } finally {
        uploadBtn.disabled = false;
        uploadBtn.textContent = 'Processar com IA';
        loading.classList.add('hidden');
    }
}

// Mostrar resultados
function mostrarResultados(data) {
    const results = document.getElementById('results');
    const emitenteData = document.getElementById('emitente-data');
    const notaData = document.getElementById('nota-data');
    const itensData = document.getElementById('itens-data');
    const classificacoesData = document.getElementById('classificacoes-data');
    
    // Emitente
    if (data.emitente) {
        emitenteData.innerHTML = `
            ${criarCampoResultado('Razão Social', data.emitente.razao_social)}
            ${criarCampoResultado('CNPJ', data.emitente.cnpj)}
            ${data.emitente.inscricao_estadual ? criarCampoResultado('Inscrição Estadual', data.emitente.inscricao_estadual) : ''}
            ${criarCampoResultado('Endereço', data.emitente.endereco)}
            ${data.emitente.telefone ? criarCampoResultado('Telefone', data.emitente.telefone) : ''}
        `;
    }
    
    // Nota Fiscal
    if (data.nota_fiscal) {
        const nf = data.nota_fiscal;
        notaData.innerHTML = `
            <div class="grid grid-cols-2 gap-4">
                ${criarCampoResultado('Número', nf.numero)}
                ${criarCampoResultado('Série', nf.serie || '-')}
            </div>
            <div class="grid grid-cols-2 gap-4">
                ${criarCampoResultado('Data de Emissão', nf.data_emissao)}
                ${criarCampoResultado('Valor Total', formatarMoeda(nf.valor_total))}
            </div>
        `;
    }
    
    // Destinatário/Remetente
    const destinatarioSection = document.getElementById('destinatario-section');
    const destinatarioData = document.getElementById('destinatario-data');
    
    if (data.remetente && destinatarioSection && destinatarioData) {
        destinatarioData.innerHTML = `
            ${criarCampoResultado('Nome/Razão Social', data.remetente.nome_completo)}
            ${criarCampoResultado('CPF/CNPJ', data.remetente.cpf_ou_cnpj)}
            ${criarCampoResultado('Endereço', data.remetente.endereco)}
            ${data.remetente.cep ? criarCampoResultado('CEP', data.remetente.cep) : ''}
            ${data.remetente.telefone ? criarCampoResultado('Telefone', data.remetente.telefone) : ''}
        `;
        destinatarioSection.classList.remove('hidden');
    }
    
    // Itens
    if (data.itens && data.itens.produtos) {
        let itensHTML = '<div class="space-y-3">';
        data.itens.produtos.forEach((produto, index) => {
            itensHTML += `
                <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-bold text-gray-900">Item ${index + 1}</span>
                        <span class="text-sm font-bold text-gray-900">${formatarMoeda(produto.valor_total)}</span>
                    </div>
                    <p class="text-sm text-gray-700">${produto.descricao}</p>
                    <div class="mt-2 flex items-center space-x-4 text-xs text-gray-600">
                        <span>Qtd: ${produto.quantidade}</span>
                        <span>Unit: ${formatarMoeda(produto.valor_unitario)}</span>
                    </div>
                </div>
            `;
        });
        itensHTML += '</div>';
        itensData.innerHTML = itensHTML;
    }
    
    // Classificações
    if (data.classificacoes && data.classificacoes.length > 0) {
        let classifHTML = '<div class="flex flex-wrap gap-2">';
        data.classificacoes.forEach(classif => {
            classifHTML += `
                <span class="px-3 py-1.5 bg-gray-100 text-gray-900 rounded-lg text-sm font-semibold border border-gray-200">
                    ${classif}
                </span>
            `;
        });
        classifHTML += '</div>';
        classificacoesData.innerHTML = classifHTML;
    }
    
    // Mostrar seção de resultados
    results.classList.remove('hidden');
    
    // Scroll suave para resultados
    setTimeout(() => {
        results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// Criar campo de resultado
function criarCampoResultado(label, valor) {
    return `
        <div class="space-y-1">
            <label class="text-xs font-semibold text-gray-600 uppercase tracking-wider">${label}</label>
            <p class="text-sm font-semibold text-gray-900">${valor || '-'}</p>
        </div>
    `;
}

// Formatar moeda
function formatarMoeda(valor) {
    if (!valor) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(parseFloat(valor));
}

// Formatar tamanho do arquivo
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Salvar no banco de dados
async function salvarNoBanco() {
    if (!currentData) {
        showAlert('Nenhum dado para salvar', 'error');
        return;
    }
    
    const saveBtn = document.getElementById('save-btn');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Salvando...';
    
    try {
        const response = await fetch('/salvar-dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentData)
        });
        
        const result = await response.json();
        
        if (result.sucesso) {
            showAlert('Dados salvos com sucesso no banco de dados!', 'success');
            saveBtn.textContent = 'Salvo ✓';
            
            // Resetar após 3 segundos
            setTimeout(() => {
                location.reload();
            }, 2000);
        } else {
            showAlert('Erro ao salvar: ' + (result.erro || 'Erro desconhecido'), 'error');
            saveBtn.disabled = false;
            saveBtn.textContent = 'Salvar no Banco de Dados';
        }
    } catch (error) {
        showAlert('Erro ao salvar: ' + error.message, 'error');
        saveBtn.disabled = false;
        saveBtn.textContent = 'Salvar no Banco de Dados';
    }
}

// Configurar botão de salvar
document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', salvarNoBanco);
    }
});

// Mostrar alerta
function showAlert(mensagem, tipo) {
    const alertSuccess = document.getElementById('alert-success');
    const alertError = document.getElementById('alert-error');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    if (tipo === 'success') {
        successMessage.textContent = mensagem;
        alertSuccess.classList.remove('hidden');
        alertError.classList.add('hidden');
        
        setTimeout(() => {
            alertSuccess.classList.add('hidden');
        }, 5000);
    } else {
        errorMessage.textContent = mensagem;
        alertError.classList.remove('hidden');
        alertSuccess.classList.add('hidden');
        
        setTimeout(() => {
            alertError.classList.add('hidden');
        }, 5000);
    }
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
