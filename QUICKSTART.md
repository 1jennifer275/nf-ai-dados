# 🚀 Guia Rápido de Início

Este guia te ajudará a colocar o sistema funcionando em **menos de 5 minutos**!

---

## ⚡ Início Rápido

### Opção 1: Docker (Mais Fácil) 🐳

```bash
# 1. Entrar na pasta do projeto
cd /root/Jenni/nf-ai-dados

# 2. Iniciar todos os serviços
docker-compose up -d

# 3. Popular banco com dados de teste (opcional)
docker-compose exec db psql -U postgres -d nf_ai -c "SELECT 1"
# Se conectar com sucesso, executar:
cat seed_data.sql | docker-compose exec -T db psql -U postgres -d nf_ai

# 4. Ver os logs
docker-compose logs -f backend

# 5. Acessar o sistema
# Frontend: http://localhost
# Backend: http://localhost:5000
```

**Pronto! ✅** O sistema está rodando!

---

### Opção 2: Local (Python) 🐍

```bash
# 1. Entrar na pasta do projeto
cd /root/Jenni/nf-ai-dados

# 2. Verificar/Iniciar PostgreSQL
sudo service postgresql status
sudo service postgresql start

# 3. Ativar ambiente virtual
source venv/bin/activate

# 4. Popular banco com dados de teste (opcional)
psql -U postgres -d nf_ai_dados < seed_data.sql

# 5. Rodar aplicação
python app.py
```

**Pronto! ✅** Acesse: http://localhost:5000

---

## 🎯 Primeiro Acesso

### 1️⃣ Página Principal
```
http://localhost:5000
```
- Upload de PDFs de notas fiscais
- Processamento com IA

### 2️⃣ Sistema RAG (Busca Inteligente)
```
http://localhost:5000/rag
```
- Faça perguntas sobre suas notas fiscais
- Exemplo: "Quais despesas maiores de Novembro?"

### 3️⃣ CRUD de Pessoas
```
http://localhost:5000/crud/pessoas
```
- Gerencie Fornecedores, Clientes e Faturados
- Clique em **"Todos"** para carregar dados
- Use **Busca** para filtrar

### 4️⃣ CRUD de Classificações
```
http://localhost:5000/crud/classificacoes
```
- Gerencie Receitas e Despesas
- Crie novas categorias

### 5️⃣ CRUD de Movimentos
```
http://localhost:5000/crud/movimentos
```
- Gerencie Notas Fiscais e Movimentações
- Vincule pessoas e classificações

### 6️⃣ Painel Admin
```
http://localhost:5000/admin
```
- Visualização consolidada
- Relatórios gerais

---

## 🧪 Testar com Dados de Exemplo

Se você executou o `seed_data.sql`, o banco já tem **200+ registros**!

### Teste o CRUD de Pessoas
1. Acesse: http://localhost:5000/crud/pessoas
2. Na aba **FORNECEDOR**, clique em **"Todos"**
3. Você verá 40 fornecedores cadastrados
4. Experimente buscar por: "Agroquímica"
5. Clique em **Editar** em um registro
6. Altere algum campo e salve

### Teste o Sistema RAG
1. Acesse: http://localhost:5000/rag
2. Digite: **"Quais despesas maiores de Novembro de 2024?"**
3. Selecione método: **Híbrido (Agent3)**
4. Clique em **Buscar Resposta**
5. Veja a resposta da IA com contexto!

### Outras Queries para Testar
```
"Mostre despesas com combustível"
"Qual o total de vendas de soja?"
"Despesas acima de 50 mil"
"Movimentos da Fazenda Santa Rita"
"Classificações de INSUMOS AGRÍCOLAS"
```

---

## 🛠️ Comandos Úteis

### Docker

```bash
# Ver status dos containers
docker-compose ps

# Ver logs em tempo real
docker-compose logs -f

# Parar tudo
docker-compose stop

# Reiniciar
docker-compose restart

# Remover tudo (CUIDADO!)
docker-compose down -v
```

### PostgreSQL

```bash
# Conectar ao banco (Docker)
docker-compose exec db psql -U postgres -d nf_ai

# Conectar ao banco (Local)
psql -U postgres -d nf_ai_dados

# Ver tabelas
\dt

# Contar registros
SELECT COUNT(*) FROM pessoas;
SELECT COUNT(*) FROM movimento_contas;
SELECT COUNT(*) FROM classificacao;
```

### Aplicação

```bash
# Ver logs da aplicação
tail -f app.log

# Testar conexão com banco
python -c "from app import db; print('DB OK!')"

# Recarregar aplicação (Ctrl+C e rodar novamente)
python app.py
```

---

## 🐛 Problemas Comuns

### ❌ Erro: "Porta já em uso"
```bash
# Ver o que está usando a porta
sudo lsof -i :5000

# Matar o processo
kill -9 <PID>
```

### ❌ Erro: "Banco de dados não conecta"
```bash
# Verificar se PostgreSQL está rodando
sudo service postgresql status

# Iniciar PostgreSQL
sudo service postgresql start

# Testar conexão
psql -U postgres -c "SELECT 1"
```

### ❌ Erro: "GEMINI_API_KEY não configurada"
```bash
# Verificar arquivo .env
cat .env | grep GEMINI

# Adicionar chave se necessário
echo "GEMINI_API_KEY=sua_chave_aqui" >> .env
```

### ❌ Erro: "ModuleNotFoundError"
```bash
# Ativar venv
source venv/bin/activate

# Reinstalar dependências
pip install -r requirements.txt
```

---

## 📊 Estrutura do Projeto

```
nf-ai-dados/
├── app.py                      # Aplicação Flask principal
├── database.py                 # Modelos do banco de dados
├── agente_ia.py                # Agente IA secundário
├── agent3.py                   # Motor RAG híbrido
├── seed_data.sql               # 200+ registros de teste
├── requirements.txt            # Dependências Python
├── docker-compose.yml          # Configuração Docker
├── .env                        # Variáveis de ambiente
│
├── templates/                  # Templates HTML
│   ├── index.html              # Página principal
│   ├── rag.html                # Sistema RAG
│   ├── admin.html              # Painel admin
│   ├── crud_pessoas.html       # CRUD Pessoas
│   ├── crud_classificacoes.html # CRUD Classificações
│   └── crud_movimentos.html    # CRUD Movimentos
│
├── static/                     # Arquivos estáticos
│   ├── css/                    # Estilos
│   └── js/                     # JavaScript
│       ├── crud_pessoas.js
│       ├── crud_classificacoes.js
│       └── crud_movimentos.js
│
└── uploads/                    # PDFs carregados
```

---

## 🎓 Próximos Passos

1. ✅ **Explorar as interfaces CRUD**
   - Criar, editar e excluir registros
   - Testar buscas e filtros

2. ✅ **Fazer upload de uma nota fiscal**
   - Página principal
   - Ver extração automática de dados

3. ✅ **Experimentar o sistema RAG**
   - Fazer perguntas complexas
   - Testar os 3 métodos de busca

4. ✅ **Personalizar classificações**
   - Adicionar suas próprias categorias
   - Adaptar ao seu negócio

5. ✅ **Hospedar em produção**
   - Ver [GUIA_HOSPEDAGEM.md](GUIA_HOSPEDAGEM.md)
   - Deploy no Render (gratuito!)

---

## 📚 Documentação Completa

- 📖 [README.md](README.md) - Documentação completa do projeto
- 🚀 [GUIA_HOSPEDAGEM.md](GUIA_HOSPEDAGEM.md) - Deploy em produção
- 💾 [seed_data.sql](seed_data.sql) - Dados de teste

---

## 💡 Dicas

### Performance
- Use o método **RAG Híbrido (Agent3)** para buscas mais precisas
- Carregue apenas dados ATIVOS com o botão **"Todos"**
- Use buscas específicas para grandes volumes de dados

### Backup
```bash
# Backup do banco
pg_dump -U postgres nf_ai_dados > backup_$(date +%Y%m%d).sql

# Restaurar backup
psql -U postgres nf_ai_dados < backup_20241125.sql
```

### Desenvolvimento
- Logs salvos em `app.log`
- Ambiente de desenvolvimento: `FLASK_DEBUG=True` no `.env`
- Recarregar automático ativo em modo debug

---

## 🆘 Precisa de Ajuda?

1. **Verifique os logs**: `tail -f app.log`
2. **Consulte o README**: Documentação completa
3. **Teste localmente primeiro**: Antes de fazer deploy
4. **Verifique variáveis de ambiente**: Arquivo `.env`

---

## ✅ Checklist de Funcionamento

- [ ] PostgreSQL rodando
- [ ] Ambiente virtual ativado
- [ ] Dependências instaladas
- [ ] Arquivo `.env` configurado
- [ ] Banco de dados criado
- [ ] Dados de teste populados (opcional)
- [ ] Aplicação rodando em http://localhost:5000
- [ ] Testado upload de PDF
- [ ] Testado CRUD de Pessoas
- [ ] Testado Sistema RAG

---

**🎉 Pronto! Você está rodando o Sistema NF-AI!**

**Desenvolvido com ❤️ usando Python, Flask e Gemini AI**  
**Versão 2.0 - Novembro 2024**

