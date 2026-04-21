# 🚀 Guia Rápido - Começar em 3 Passos

## Passo 1: Instalar Dependências

Abra o terminal PowerShell nesta pasta e execute:

```powershell
npm install
```

**O que isso faz:**
- Lê o arquivo `package.json`
- Baixa Express (framework web)
- Baixa UUID (gerador de IDs)
- Cria a pasta `node_modules`

⏱️ Tempo esperado: 30-60 segundos

---

## Passo 2: Iniciar o Servidor

Execute no terminal:

```powershell
npm start
```

**Saída esperada:**
```
🚀 ========================================
🚀 Servidor iniciado na porta 3000
🚀 Acesse: http://localhost:3000
🚀 ========================================
```

✅ O servidor está rodando em: **http://localhost:3000**

---

## Passo 3: Testar a API com Insomnia

1. **Abra o Insomnia** (ou faça download se não tiver)

2. **Crie uma nova requisição:**
   - Clique em **"Create Request"** ou **"+"**
   - Nome: `Teste GET`
   - Método: **GET**
   - URL: `http://localhost:3000/produtos`

3. **Clique em "Send"**

Você verá a lista de produtos! 🎉

---

## Próximas Requisições para Testar

### Criar um Produto (POST)

```json
POST http://localhost:3000/produtos

{
  "nome": "Teclado Mecânico",
  "preco": 350.00,
  "estoque": 25,
  "descricao": "Teclado com switch RGB"
}
```

### Atualizar um Produto (PUT)

```json
PUT http://localhost:3000/produtos/1

{
  "preco": 2600
}
```

### Deletar um Produto (DELETE)

```
DELETE http://localhost:3000/produtos/1
```

---

## Para Parar o Servidor

No terminal, pressione: **Ctrl + C**

---

## Próximas Consultas

📖 Veja o arquivo `README.md` para documentação completa com:
- Todos os endpoints
- Exemplos detalhados
- Códigos de erro
- Dicas de troubleshooting

✨ Pronto para começar? Siga os 3 passos acima!
