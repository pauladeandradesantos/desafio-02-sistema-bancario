# :bank: Sistema Bancário

Projeto de Backend cujo objetivo é criar uma RESTful API para um Banco Digital. Trata-se de um projeto piloto, ou seja, no futuro outras funcionalidades serão implementadas.

As funcionalidades iniciais dessa API são:

-   Criar conta bancária;
-   Listar contas bancárias;
-   Atualizar os dados do usuário da conta bancária;
-   Excluir uma conta bancária;
-   Depósitar em uma conta bancária;
-   Sacar de uma conta bancária;
-   Transferir valores entre contas bancárias;
-   Consultar saldo da conta bancária;
-   Emitir extrato bancário.


## Linguagens e ferramentas utilizadas:

![](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)



## Organização da API:

O código está organizado de acordo com as responsabilidades de cada arquivo. A divisão foi feita da seguinte forma:
-   Um arquivo **index.js** com a estrutura principal do código;
-   Um arquivo **roteador.js**;
-   Um arquivo **bancodedados.js**;
-   Um pasta de controladores com dois arquivos: controlador de contas e controlador de transações;
-   A moeda utilizada é o real brasileiro e os valores serão representados em centavos.


## Persistências dos dados:

Os dados serão persistidos em memória, no objeto existente dentro do arquivo `bancodedados.js`. Todas as transações e contas bancárias deverão ser inseridas dentro deste objeto, seguindo a estrutura que já existe.


## Propriedade do projeto:
Cubos Academy

## Autoria do presente código:
Paula Santos


