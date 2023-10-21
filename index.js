// Importando as dependências necessárias
const express = require('express'); // Importando o módulo 'express'
const bodyParser = require('body-parser'); // Importando o módulo 'body-parser'

// Criando uma instância do aplicativo Express
const app = express();

// Definindo a porta em que o servidor irá escutar
const port = 3000;

// Middleware: Configurando o 'body-parser' para processar dados JSON
app.use(bodyParser.json());

// Middleware: Configurando o 'body-parser' para processar dados da URL (extended true permite objetos e arrays)
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Definindo uma rota para a raiz ('/') do servidor
app.get('/', (request, response) => {
  // Quando alguém acessar a rota raiz, uma resposta JSON será enviada
  response.json({ info: 'Esta API foi feita por Gabriel J. e você pode usá-la para manusear informações de currículo' });
});


// Iniciando o servidor na porta especificada
app.listen(port, () => {
  // Uma mensagem é exibida no console quando o servidor estiver rodando
  console.log(`App running on port ${port}.`);
});

