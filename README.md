# API RESTful de Produtos

Uma API completa e bem documentada para gerenciar produtos, construída com Node.js e Express.

## 📋 Sumário
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Iniciando o Servidor](#iniciando-o-servidor)
- [Documentação da API](#documentação-da-api)
- [Testando com Insomnia](#testando-com-insomnia)
- [Validações](#validações)

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- **Node.js** (versão 14 ou superior) - [Download](https://nodejs.org/)
- **npm** (gerenciador de pacotes do Node) - vem com Node.js
- **Insomnia** (cliente REST) - [Download](https://insomnia.rest/)

### Verificar instalação:
```bash
node --version
npm --version
```

---

## Instalação

### Passo 1: Abrir o terminal na pasta do projeto

```bash
cd "c:\Users\user\OneDrive\Área de Trabalho\BOAS-PRATICAS-COM-IAS"
```

### Passo 2: Instalar as dependências

```bash
npm install
```

Este comando irá:
- Ler o arquivo `package.json`
- Baixar e instalar o Express (framework web)
- Baixar e instalar o UUID (para gerar IDs únicos)
- Criar a pasta `node_modules` com todos os pacotes
- Criar o arquivo `package-lock.json` (controle de versão)

### Passo 3: Instalar nodemon (opcional, para desenvolvimento)

```bash
npm install --save-dev nodemon
```

O nodemon reinicia automaticamente o servidor quando você faz alterações no código.

---

## Iniciando o Servidor

### Modo produção (sem auto-reload):
```bash
npm start
```

### Modo desenvolvimento (com auto-reload via nodemon):
```bash
npm run dev
```

**Saída esperada:**
```
🚀 ========================================
🚀 Servidor iniciado na porta 3000
🚀 Acesse: http://localhost:3000
🚀 ========================================
```

O servidor estará rodando em: **http://localhost:3000**

---

## Documentação da API

### Base URL
```
http://localhost:3000
```

### Endpoints disponíveis

#### 1. ✅ GET / - Informações da API
Retorna informações gerais e listagem de endpoints.

```
GET http://localhost:3000/
```

**Resposta (200 OK):**
```json
{
  "mensagem": "Bem-vindo à API de Produtos!",
  "versao": "1.0.0",
  "endpoints": {
    "GET /produtos": "Listar todos os produtos",
    "GET /produtos/:id": "Obter um produto específico",
    "POST /produtos": "Criar novo produto",
    "PUT /produtos/:id": "Atualizar produto",
    "DELETE /produtos/:id": "Deletar produto"
  }
}
```

---

#### 2. 📦 GET /produtos - Listar produtos
Retorna todos os produtos com suporte a paginação.

```
GET http://localhost:3000/produtos?skip=0&limit=10
```

**Query Parameters (opcionais):**
- `skip` (padrão: 0) - Número de produtos a pular
- `limit` (padrão: 10) - Número máximo de produtos a retornar

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "total": 2,
  "retornados": 2,
  "skip": 0,
  "limit": 10,
  "dados": [
    {
      "id": "1",
      "nome": "Notebook",
      "preco": 2500,
      "estoque": 10,
      "descricao": "Notebook de alta performance",
      "criado_em": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": "2",
      "nome": "Mouse Sem Fio",
      "preco": 59.9,
      "estoque": 50,
      "descricao": "Mouse sem fio com bateria de longa duração",
      "criado_em": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

#### 3. 🔍 GET /produtos/:id - Obter produto específico
Retorna um produto pelo ID.

```
GET http://localhost:3000/produtos/1
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "dados": {
    "id": "1",
    "nome": "Notebook",
    "preco": 2500,
    "estoque": 10,
    "descricao": "Notebook de alta performance",
    "criado_em": "2024-01-15T10:30:00.000Z"
  }
}
```

**Resposta (404 Não Encontrado):**
```json
{
  "sucesso": false,
  "mensagem": "Produto não encontrado"
}
```

---

#### 4. ➕ POST /produtos - Criar novo produto
Cria um novo produto.

```
POST http://localhost:3000/produtos
Content-Type: application/json

{
  "nome": "Teclado Mecânico",
  "preco": 350.00,
  "estoque": 25,
  "descricao": "Teclado mecânico RGB com som"
}
```

**Body obrigatório:**
- `nome` (string, 3-100 caracteres) - Nome do produto
- `preco` (número, > 0) - Preço do produto
- `estoque` (inteiro, >= 0) - Quantidade em estoque
- `descricao` (string, 0-500 caracteres, opcional) - Descrição

**Resposta (201 Criado):**
```json
{
  "sucesso": true,
  "mensagem": "Produto criado com sucesso",
  "dados": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "Teclado Mecânico",
    "preco": 350,
    "estoque": 25,
    "descricao": "Teclado mecânico RGB com som",
    "criado_em": "2024-01-15T11:45:00.000Z"
  }
}
```

**Resposta (400 Entrada inválida):**
```json
{
  "sucesso": false,
  "mensagem": "Dados de entrada inválidos",
  "erros": [
    "Nome deve ter entre 3 e 100 caracteres",
    "Preço deve ser um número positivo"
  ]
}
```

---

#### 5. ✏️ PUT /produtos/:id - Atualizar produto
Atualiza um produto existente.

```
PUT http://localhost:3000/produtos/1
Content-Type: application/json

{
  "preco": 2800.00,
  "estoque": 15
}
```

**Body (todos os campos opcionais):**
- `nome` (string, 3-100 caracteres)
- `preco` (número, > 0)
- `estoque` (inteiro, >= 0)
- `descricao` (string, 0-500 caracteres)

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Produto atualizado com sucesso",
  "dados": {
    "id": "1",
    "nome": "Notebook",
    "preco": 2800,
    "estoque": 15,
    "descricao": "Notebook de alta performance",
    "criado_em": "2024-01-15T10:30:00.000Z",
    "atualizado_em": "2024-01-15T12:00:00.000Z"
  }
}
```

---

#### 6. 🗑️ DELETE /produtos/:id - Deletar produto
Deleta um produto.

```
DELETE http://localhost:3000/produtos/1
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Produto deletado com sucesso",
  "dados": {
    "id": "1",
    "nome": "Notebook",
    "preco": 2800,
    "estoque": 15,
    "descricao": "Notebook de alta performance",
    "criado_em": "2024-01-15T10:30:00.000Z",
    "atualizado_em": "2024-01-15T12:00:00.000Z"
  }
}
```

---

## Testando com Insomnia

### Instalação do Insomnia
1. Baixe em: https://insomnia.rest/
2. Instale normalmente
3. Abra o Insomnia

### Criar primeira requisição

#### Passo 1: Criar novo Request
1. Clique em **"Create New Request"** ou **"+"**
2. Digite um nome: `GET /`
3. Selecione **GET** como método
4. Cole a URL: `http://localhost:3000/`
5. Clique em **Send**

#### Passo 2: Testar listar produtos
1. Novo Request: `GET /produtos`
2. Método: **GET**
3. URL: `http://localhost:3000/produtos`
4. Clique em **Send**

#### Passo 3: Testar criar produto
1. Novo Request: `POST /produtos`
2. Método: **POST**
3. URL: `http://localhost:3000/produtos`
4. Vá até a aba **Body**
5. Selecione **JSON** no dropdown
6. Cole o JSON:
```json
{
  "nome": "Monitor LG 27\"",
  "preco": 1200.00,
  "estoque": 8,
  "descricao": "Monitor 4K com painel IPS"
}
```
7. Clique em **Send**

#### Passo 4: Testar atualizar produto
1. Novo Request: `PUT /produtos/:id`
2. Método: **PUT**
3. URL: `http://localhost:3000/produtos/1` (use um ID existente)
4. Aba **Body** > **JSON**:
```json
{
  "preco": 1500.00
}
```
5. Clique em **Send**

#### Passo 5: Testar deletar produto
1. Novo Request: `DELETE /produtos/:id`
2. Método: **DELETE**
3. URL: `http://localhost:3000/produtos/1`
4. Clique em **Send**

### Importar Collection

Você pode salvar todas as requisições como uma coleção:
1. Clique no menu **Workspace** (topo esquerdo)
2. Selecione **Export**
3. Escolha o diretório e salve

Para importar:
1. Clique em **Import**
2. Selecione o arquivo exportado

---

## Validações

A API implementa validações robustas:

### Nome do Produto
- ✅ Obrigatório
- ✅ Mínimo 3 caracteres
- ✅ Máximo 100 caracteres
- ✅ Não pode ser vazio (apenas espaços)

### Preço
- ✅ Obrigatório
- ✅ Deve ser um número
- ✅ Deve ser maior que 0
- ✅ Aceita decimais (ex: 19.99)

### Estoque
- ✅ Obrigatório
- ✅ Deve ser um número inteiro
- ✅ Não pode ser negativo
- ✅ Aceita 0

### Descrição
- ✅ Opcional
- ✅ Máximo 500 caracteres
- ✅ Pode estar vazia

---

## Estrutura de Respostas

### Sucesso
```json
{
  "sucesso": true,
  "mensagem": "Descrição da ação",
  "dados": { /* dados retornados */ }
}
```

### Erro
```json
{
  "sucesso": false,
  "mensagem": "Descrição do erro",
  "erros": [ /* lista de erros */ ]
}
```

---

## Códigos HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Criado - Recurso criado com sucesso |
| 400 | Erro na Requisição - Dados inválidos |
| 404 | Não Encontrado - Recurso não existe |
| 500 | Erro do Servidor - Erro interno |

---

## Troubleshooting

### Erro: "Port 3000 is already in use"
A porta 3000 já está em uso. Solução:
```bash
# Encontrar o processo usando a porta e matá-lo
netstat -ano | findstr :3000  # Windows
kill -9 <PID>  # Matar o processo
```

### Erro: "Cannot find module 'express'"
As dependências não foram instaladas:
```bash
npm install
```

### Servidor não responde
- Verifique se o servidor está rodando
- Confirme que está usando `http://localhost:3000` (não `https`)
- Verifique firewall/antivírus bloqueando

---

## Próximos Passos

Para melhorar a API, considere:
1. Conectar a um banco de dados real (MongoDB, PostgreSQL)
2. Adicionar autenticação e autorização
3. Implementar paginação mais robusta
4. Adicionar filtros e busca
5. Implementar testes automatizados
6. Adicionar documentação OpenAPI/Swagger

---

## Licença

ISC - Use livremente em seus projetos!
