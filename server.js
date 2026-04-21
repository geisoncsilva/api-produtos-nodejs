// ========================================
// SERVIDOR PRINCIPAL DA API
// ========================================
// Importações de módulos necessários
const express = require('express');
const { v4: uuidv4 } = require('uuid');

// Inicializar aplicação Express
const app = express();

// Definir porta do servidor
const PORT = 3000;

// ========================================
// MIDDLEWARE
// ========================================
// Middleware para parsear JSON nas requisições
app.use(express.json());

// Middleware de log para requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`);
  next();
});

// ========================================
// BANCO DE DADOS SIMULADO
// ========================================
// Array que simula um banco de dados em memória
let produtos = [
  {
    id: '1',
    nome: 'Notebook',
    preco: 2500.00,
    estoque: 10,
    descricao: 'Notebook de alta performance',
    criado_em: new Date().toISOString()
  },
  {
    id: '2',
    nome: 'Mouse Sem Fio',
    preco: 59.90,
    estoque: 50,
    descricao: 'Mouse sem fio com bateria de longa duração',
    criado_em: new Date().toISOString()
  }
];

// ========================================
// FUNÇÕES DE VALIDAÇÃO
// ========================================

/**
 * Valida os dados do produto
 * @param {Object} produto - Dados do produto a validar
 * @returns {Object} - { valido: boolean, erros: array }
 */
function validarProduto(produto) {
  const erros = [];

  // Validar nome
  if (!produto.nome || produto.nome.trim() === '') {
    erros.push('Nome é obrigatório');
  } else if (produto.nome.length < 3 || produto.nome.length > 100) {
    erros.push('Nome deve ter entre 3 e 100 caracteres');
  }

  // Validar preço
  if (produto.preco === undefined || produto.preco === null) {
    erros.push('Preço é obrigatório');
  } else if (typeof produto.preco !== 'number' || produto.preco <= 0) {
    erros.push('Preço deve ser um número positivo');
  }

  // Validar estoque
  if (produto.estoque === undefined || produto.estoque === null) {
    erros.push('Estoque é obrigatório');
  } else if (!Number.isInteger(produto.estoque) || produto.estoque < 0) {
    erros.push('Estoque deve ser um número inteiro não negativo');
  }

  // Validar descrição (opcional)
  if (produto.descricao && produto.descricao.length > 500) {
    erros.push('Descrição não pode ter mais de 500 caracteres');
  }

  return {
    valido: erros.length === 0,
    erros: erros
  };
}

// ========================================
// ROTAS GET - LEITURA DE DADOS
// ========================================

/**
 * GET / - Rota raiz da API
 * Retorna mensagem de boas-vindas
 */
app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'Bem-vindo à API de Produtos!',
    versao: '1.0.0',
    endpoints: {
      'GET /produtos': 'Listar todos os produtos',
      'GET /produtos/:id': 'Obter um produto específico',
      'POST /produtos': 'Criar novo produto',
      'PUT /produtos/:id': 'Atualizar produto',
      'DELETE /produtos/:id': 'Deletar produto'
    }
  });
});

/**
 * GET /produtos - Listar todos os produtos
 * Query params opcionais: 
 * - skip: número de produtos a pular (paginação)
 * - limit: número de produtos a retornar (paginação)
 */
app.get('/produtos', (req, res) => {
  try {
    // Extrair parâmetros de paginação
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;

    // Validar parâmetros de paginação
    if (skip < 0 || limit < 1) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Parâmetros de paginação inválidos'
      });
    }

    // Aplicar paginação
    const produtosPaginados = produtos.slice(skip, skip + limit);

    res.status(200).json({
      sucesso: true,
      total: produtos.length,
      retornados: produtosPaginados.length,
      skip: skip,
      limit: limit,
      dados: produtosPaginados
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao listar produtos',
      erro: erro.message
    });
  }
});

/**
 * GET /produtos/:id - Obter um produto específico por ID
 */
app.get('/produtos/:id', (req, res) => {
  try {
    // Buscar produto pelo ID
    const produto = produtos.find(p => p.id === req.params.id);

    // Verificar se produto existe
    if (!produto) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Produto não encontrado'
      });
    }

    res.status(200).json({
      sucesso: true,
      dados: produto
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao buscar produto',
      erro: erro.message
    });
  }
});

// ========================================
// ROTAS POST - CRIAÇÃO DE DADOS
// ========================================

/**
 * POST /produtos - Criar novo produto
 * Body: { nome, preco, estoque, descricao? }
 */
app.post('/produtos', (req, res) => {
  try {
    // Extrair dados do corpo da requisição
    const { nome, preco, estoque, descricao } = req.body;

    // Preparar objeto produto para validação
    const novoProduto = {
      nome,
      preco,
      estoque,
      descricao: descricao || ''
    };

    // Validar dados do produto
    const validacao = validarProduto(novoProduto);

    if (!validacao.valido) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Dados de entrada inválidos',
        erros: validacao.erros
      });
    }

    // Criar novo produto com ID único
    const produtoCriado = {
      id: uuidv4(),
      nome: nome.trim(),
      preco: parseFloat(preco),
      estoque: parseInt(estoque),
      descricao: descricao ? descricao.trim() : '',
      criado_em: new Date().toISOString()
    };

    // Adicionar ao array de produtos
    produtos.push(produtoCriado);

    res.status(201).json({
      sucesso: true,
      mensagem: 'Produto criado com sucesso',
      dados: produtoCriado
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao criar produto',
      erro: erro.message
    });
  }
});

// ========================================
// ROTAS PUT - ATUALIZAÇÃO DE DADOS
// ========================================

/**
 * PUT /produtos/:id - Atualizar um produto
 * Body: { nome?, preco?, estoque?, descricao? }
 */
app.put('/produtos/:id', (req, res) => {
  try {
    // Buscar produto pelo ID
    const produtoIndex = produtos.findIndex(p => p.id === req.params.id);

    // Verificar se produto existe
    if (produtoIndex === -1) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Produto não encontrado'
      });
    }

    // Obter dados atuais do produto
    const produtoAtual = produtos[produtoIndex];

    // Preparar objeto com dados a atualizar (mesclar com dados existentes)
    const dadosAtualizacao = {
      nome: req.body.nome !== undefined ? req.body.nome : produtoAtual.nome,
      preco: req.body.preco !== undefined ? req.body.preco : produtoAtual.preco,
      estoque: req.body.estoque !== undefined ? req.body.estoque : produtoAtual.estoque,
      descricao: req.body.descricao !== undefined ? req.body.descricao : produtoAtual.descricao
    };

    // Validar dados atualizados
    const validacao = validarProduto(dadosAtualizacao);

    if (!validacao.valido) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Dados de entrada inválidos',
        erros: validacao.erros
      });
    }

    // Atualizar produto
    const produtoAtualizado = {
      ...produtoAtual,
      nome: dadosAtualizacao.nome.trim(),
      preco: parseFloat(dadosAtualizacao.preco),
      estoque: parseInt(dadosAtualizacao.estoque),
      descricao: dadosAtualizacao.descricao ? dadosAtualizacao.descricao.trim() : '',
      atualizado_em: new Date().toISOString()
    };

    produtos[produtoIndex] = produtoAtualizado;

    res.status(200).json({
      sucesso: true,
      mensagem: 'Produto atualizado com sucesso',
      dados: produtoAtualizado
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao atualizar produto',
      erro: erro.message
    });
  }
});

// ========================================
// ROTAS DELETE - DELEÇÃO DE DADOS
// ========================================

/**
 * DELETE /produtos/:id - Deletar um produto
 */
app.delete('/produtos/:id', (req, res) => {
  try {
    // Buscar índice do produto
    const produtoIndex = produtos.findIndex(p => p.id === req.params.id);

    // Verificar se produto existe
    if (produtoIndex === -1) {
      return res.status(404).json({
        sucesso: false,
        mensagem: 'Produto não encontrado'
      });
    }

    // Remover produto do array
    const produtoRemovido = produtos.splice(produtoIndex, 1)[0];

    res.status(200).json({
      sucesso: true,
      mensagem: 'Produto deletado com sucesso',
      dados: produtoRemovido
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      mensagem: 'Erro ao deletar produto',
      erro: erro.message
    });
  }
});

// ========================================
// MANIPULAÇÃO DE ERROS
// ========================================

/**
 * Middleware para rotas não encontradas (404)
 */
app.use((req, res) => {
  res.status(404).json({
    sucesso: false,
    mensagem: 'Rota não encontrada',
    path: req.path,
    method: req.method
  });
});

/**
 * Middleware para tratamento de erros global
 */
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({
    sucesso: false,
    mensagem: 'Erro interno do servidor',
    erro: process.env.NODE_ENV === 'development' ? err.message : 'Erro desconhecido'
  });
});

// ========================================
// INICIAR SERVIDOR
// ========================================
app.listen(PORT, () => {
  console.log('');
  console.log('🚀 ========================================');
  console.log(`🚀 Servidor iniciado na porta ${PORT}`);
  console.log(`🚀 Acesse: http://localhost:${PORT}`);
  console.log('🚀 ========================================');
  console.log('');
});
