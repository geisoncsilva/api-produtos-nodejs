// ========================================
// ARQUIVO DE EXEMPLO DE TESTES
// Use este arquivo como referência para testar a API
// ========================================

// Exemplos de requisições CURL para testar a API

// ========================================
// 1. OBTER INFORMAÇÕES DA API
// ========================================
// curl -X GET http://localhost:3000/

// ========================================
// 2. LISTAR TODOS OS PRODUTOS
// ========================================
// curl -X GET "http://localhost:3000/produtos"

// COM PAGINAÇÃO (pular os primeiros 5, mostrar 3)
// curl -X GET "http://localhost:3000/produtos?skip=5&limit=3"

// ========================================
// 3. OBTER UM PRODUTO ESPECÍFICO
// ========================================
// Obter o produto com ID "1"
// curl -X GET http://localhost:3000/produtos/1

// ========================================
// 4. CRIAR UM NOVO PRODUTO
// ========================================
// curl -X POST http://localhost:3000/produtos \
//   -H "Content-Type: application/json" \
//   -d '{
//     "nome": "Monitor LG 27\"",
//     "preco": 1200,
//     "estoque": 5,
//     "descricao": "Monitor Ultra HD com painel IPS"
//   }'

// ========================================
// 5. ATUALIZAR UM PRODUTO
// ========================================
// Atualizar o produto com ID "1"
// curl -X PUT http://localhost:3000/produtos/1 \
//   -H "Content-Type: application/json" \
//   -d '{
//     "preco": 2600,
//     "estoque": 12
//   }'

// ========================================
// 6. DELETAR UM PRODUTO
// ========================================
// Deletar o produto com ID "1"
// curl -X DELETE http://localhost:3000/produtos/1

// ========================================
// EXEMPLOS DE VALIDAÇÃO (Erros Esperados)
// ========================================

// ERRO 1: Nome muito curto
// curl -X POST http://localhost:3000/produtos \
//   -H "Content-Type: application/json" \
//   -d '{
//     "nome": "PC",
//     "preco": 3000,
//     "estoque": 5
//   }'
// Resposta esperada:
// {
//   "sucesso": false,
//   "mensagem": "Dados de entrada inválidos",
//   "erros": ["Nome deve ter entre 3 e 100 caracteres"]
// }

// ERRO 2: Preço negativo
// curl -X POST http://localhost:3000/produtos \
//   -H "Content-Type: application/json" \
//   -d '{
//     "nome": "Computador Gamer",
//     "preco": -500,
//     "estoque": 5
//   }'
// Resposta esperada:
// {
//   "sucesso": false,
//   "mensagem": "Dados de entrada inválidos",
//   "erros": ["Preço deve ser um número positivo"]
// }

// ERRO 3: Estoque inválido
// curl -X POST http://localhost:3000/produtos \
//   -H "Content-Type: application/json" \
//   -d '{
//     "nome": "Produto Teste",
//     "preco": 100,
//     "estoque": -10
//   }'
// Resposta esperada:
// {
//   "sucesso": false,
//   "mensagem": "Dados de entrada inválidos",
//   "erros": ["Estoque deve ser um número inteiro não negativo"]
// }

// ERRO 4: Produto não encontrado
// curl -X GET http://localhost:3000/produtos/999
// Resposta esperada:
// {
//   "sucesso": false,
//   "mensagem": "Produto não encontrado"
// }

// ========================================
// TESTANDO COM JAVASCRIPT/FETCH
// ========================================

// Abra o console do navegador e cole estes exemplos:

// 1. LISTAR PRODUTOS
/*
fetch('http://localhost:3000/produtos')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
*/

// 2. CRIAR PRODUTO
/*
fetch('http://localhost:3000/produtos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nome: 'Webcam Full HD',
    preco: 250,
    estoque: 20,
    descricao: 'Webcam com resolução 1080p'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
*/

// 3. ATUALIZAR PRODUTO
/*
fetch('http://localhost:3000/produtos/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    preco: 2999.99
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
*/

// 4. DELETAR PRODUTO
/*
fetch('http://localhost:3000/produtos/1', {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));
*/
