const { contas, saques, depositos, transferencias } = require("../bancodedados.js")


const listarContas = (req, res) => { return res.json(contas) }

let numeroDaConta = 1

const criarConta = (req, res) => {

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome) { return res.status(400).json({ mensagem: "O campo nome é obrigatório." }) };
    if (!cpf) { return res.status(400).json({ mensagem: "O campo cpf é obrigatório." }) };
    if (!data_nascimento) { return res.status(400).json({ mensagem: "O campo data de nascimento é obrigatório." }) };
    if (!telefone) { return res.status(400).json({ mensagem: "O campo telefone é obrigatório." }) };
    if (!email) { return res.status(400).json({ mensagem: "O campo email é obrigatório." }) };
    if (!senha) { return res.status(400).json({ mensagem: "É necessário informar uma senha" }) };


    const novaConta = { numero: numeroDaConta, saldo: 0, usuario: { nome, cpf, data_nascimento, telefone, email, senha } }


    const cpfExistente = contas.find((conta) => conta.usuario.cpf === req.body.cpf);
    if (cpfExistente) { return res.status(400).json({ mensagem: "Esse CPF já foi utilizado." }) }

    const emailExistente = contas.find((conta) => conta.usuario.email === req.body.email);
    if (emailExistente) { return res.status(400).json({ mensagem: "Esse email já foi utilizado." }) }

    contas.push(novaConta);
    numeroDaConta++
    return res.status(201).send();
}

const atualizarConta = (req, res) => {

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    if (!nome) { return res.status(400).json({ mensagem: "O campo nome é obrigatório." }) };
    if (!cpf) { return res.status(400).json({ mensagem: "O campo cpf é obrigatório." }) };
    if (!data_nascimento) { return res.status(400).json({ mensagem: "O campo data de nascimento é obrigatório." }) };
    if (!telefone) { return res.status(400).json({ mensagem: "O campo telefone é obrigatório." }) };
    if (!email) { return res.status(400).json({ mensagem: "O campo email é obrigatório." }) };
    if (!senha) { return res.status(400).json({ mensagem: "É necessário informar uma senha" }) };

    const numeroConta = Number(req.params.numeroConta);
    if (isNaN(numeroConta)) { return res.status(400).json({ mensagem: 'Numero incorreto.' }) }

    const contaExistente = contas.find((conta) => conta.numero === numeroConta)

    if (!contaExistente) { return res.status(404).json({ mensagem: 'Essa conta não existe.' }) }

    const cpfExistente = contas.find((conta) => conta.usuario.cpf === req.body.cpf);
    if (cpfExistente) { return res.status(400).json({ mensagem: "Esse CPF já foi utilizado." }) }

    const emailExistente = contas.find((conta) => conta.usuario.email === req.body.email);
    if (emailExistente) { return res.status(400).json({ mensagem: "Esse email já foi utilizado." }) }

    contaExistente.usuario = { nome, cpf, data_nascimento, telefone, email, senha }

    return res.status(204).send();
}

const excluirConta = (req, res) => {

    const numeroConta = Number(req.params.numeroConta);

    if (isNaN(numeroConta)) { return res.status(400).json({ mensagem: 'Numero incorreto.' }) };

    const indexContaExclusao = contas.findIndex((conta) => conta.numero === numeroConta);


    if (indexContaExclusao < 0) { return res.status(400).json({ mensagem: 'Conta não existe.' }) };

    const contaExcluida = contas.splice(indexContaExclusao, 1);

    return res.json(contaExcluida)


}

const depositarDinheiro = (req, res) => {

    const { numero_conta, valor } = req.body;
    if (!numero_conta) { return res.status(400).json({ mensagem: "O campo numero da conta é obrigatório." }) };
    if (!valor) { return res.status(400).json({ mensagem: "O campo valor é obrigatório." }) };
    if (isNaN(numero_conta)) { return res.status(400).json({ mensagem: 'Número da conta inválido.' }) }
    if (isNaN(valor)) { return res.status(400).json({ mensagem: 'Valor inválido.' }) }

    const contaExistente = contas.find((conta) => conta.numero == numero_conta);

    if (!contaExistente) { return res.status(400).json({ mensagem: 'Conta não existe.' }) }

    contaExistente.saldo += valor

    const dataHoraAtual = new Date();
    const dataFormatada = dataHoraAtual.toLocaleDateString();
    const horaFormatada = dataHoraAtual.toLocaleTimeString();


    const novoDeposito = {
        "data": dataFormatada + " " + horaFormatada,
        "numero_conta": contaExistente.numero,
        "valor": valor
    };

    depositos.push(novoDeposito);

    return res.status(204).send();
}

const sacarDinheiro = (req, res) => {

    const { numero_conta, valor, senha } = req.body;
    if (!numero_conta) { return res.status(400).json({ mensagem: "O campo numero da conta é obrigatório." }) };
    if (!valor) { return res.status(400).json({ mensagem: "O campo valor é obrigatório." }) };
    if (!senha) { return res.status(400).json({ mensagem: "O campo senha é obrigatório." }) };

    if (isNaN(numero_conta)) { return res.status(400).json({ mensagem: 'Número da conta inválido.' }) }
    if (isNaN(valor)) { return res.status(400).json({ mensagem: 'Valor inválido.' }) }

    const contaExistente = contas.find((conta) => conta.numero == numero_conta);
    if (!contaExistente) { return res.status(400).json({ mensagem: 'Conta não existe.' }) }
    if (contaExistente.usuario.senha !== senha) { return res.status(400).json({ mensagem: 'Senha incorreta.' }) }
    if (contaExistente.saldo < valor) { return res.status(400).json({ mensagem: 'Saldo insuficiente.' }) }

    contaExistente.saldo -= valor

    const dataHoraAtual = new Date();
    const dataFormatada = dataHoraAtual.toLocaleDateString();
    const horaFormatada = dataHoraAtual.toLocaleTimeString();


    const novoSaque = {
        "data": dataFormatada + " " + horaFormatada,
        "numero_conta": contaExistente.numero,
        "valor": valor
    };

    depositos.push(novoSaque);

    return res.status(204).send();
}

const transferirDinheiro = (req, res) => {

    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    if (!numero_conta_origem) { return res.status(400).json({ mensagem: "O campo numero da conta é obrigatório." }) };
    if (!numero_conta_destino) { return res.status(400).json({ mensagem: "O campo numero da conta é obrigatório." }) };
    if (!valor) { return res.status(400).json({ mensagem: "O campo valor é obrigatório." }) };
    if (!senha) { return res.status(400).json({ mensagem: "O campo senha é obrigatório." }) };

    if (isNaN(numero_conta_origem)) { return res.status(400).json({ mensagem: 'Número da conta inválido.' }) }
    if (isNaN(numero_conta_destino)) { return res.status(400).json({ mensagem: 'Número da conta inválido.' }) }
    if (isNaN(valor)) { return res.status(400).json({ mensagem: 'Valor inválido.' }) }

    const contaOrigem = contas.find((conta) => conta.numero == numero_conta_origem);
    if (!contaOrigem) { return res.status(400).json({ mensagem: 'Conta não existe.' }) }
    if (contaOrigem.usuario.senha !== senha) { return res.status(400).json({ mensagem: 'Senha incorreta.' }) }
    if (contaOrigem.saldo < valor) { return res.status(400).json({ mensagem: 'Saldo insuficiente.' }) }

    const contaDestino = contas.find((conta) => conta.numero == numero_conta_destino);
    if (!contaDestino) { return res.status(400).json({ mensagem: 'Conta não existe.' }) }
    contaOrigem.saldo -= valor
    contaDestino.saldo += valor

    return res.status(204).send();
}

const consultarSaldo = (req, res) => {

    const { numero_conta, senha } = req.query;

    if (!numero_conta) { return res.status(400).json({ mensagem: "O campo numero da conta é obrigatório." }) };
    if (!senha) { return res.status(400).json({ mensagem: "O campo senha é obrigatório." }) };

    const contaExistente = contas.find((conta) => conta.numero == numero_conta);
    if (!contaExistente) { return res.status(400).json({ mensagem: 'Conta não existe.' }) }
    if (contaExistente.usuario.senha !== senha) { return res.status(400).json({ mensagem: 'Senha incorreta.' }) }

    return res.json({ saldo: contaExistente.saldo })

}

const consultarExtrato = (req, res) => {

    const { numero_conta, senha } = req.query;

    if (!numero_conta) { return res.status(400).json({ mensagem: "O campo numero da conta é obrigatório." }) };
    if (!senha) { return res.status(400).json({ mensagem: "O campo senha é obrigatório." }) };

    const contaExistente = contas.find((conta) => conta.numero == numero_conta);
    if (!contaExistente) { return res.status(400).json({ mensagem: 'Conta não existe.' }) }
    if (contaExistente.usuario.senha !== senha) { return res.status(400).json({ mensagem: 'Senha incorreta.' }) }

    const relatorioExtrato = { depositos, saques, transferencias }


    return res.json({ relatorioExtrato })

}

module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    excluirConta,
    depositarDinheiro,
    sacarDinheiro,
    transferirDinheiro,
    consultarSaldo,
    consultarExtrato
}