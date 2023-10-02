const express = require('express');
const rotas = express();
const { listarContas, criarConta, atualizarConta, excluirConta, depositarDinheiro, sacarDinheiro, transferirDinheiro, consultarSaldo, consultarExtrato } = require('./src/controladores/contas-bancarias-control')

rotas.get('/contas', listarContas)
rotas.post('/contas', criarConta)
rotas.put('/contas/:numeroConta/usuario', atualizarConta)
rotas.delete('/contas/:numeroConta', excluirConta)
rotas.post('/transacoes/depositar', depositarDinheiro)
rotas.post('/transacoes/sacar', sacarDinheiro)
rotas.post('/transacoes/transferir', transferirDinheiro)
rotas.get('/contas/saldo', consultarSaldo)
rotas.get('/contas/extrato', consultarExtrato)


module.exports = rotas