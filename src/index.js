const express = require('express');
const app = express();
const roteador = require('../roteador');
const validarSenha = require('./intermediarios');


app.use(express.json());
app.use(validarSenha);
app.use(roteador);




app.listen(3000)