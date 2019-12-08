const express = require('express');
const routes = express.Router();
const HomeController = require('./src/controllers/HomeController');
const LoginController = require('./src/controllers/LoginController');
const ContatoController = require('./src/controllers/ContatoController');
const { loginRequerido } = require('./src/middlewares/middleware');

// Rotas da index
routes.get('/', HomeController.index);

// Rotas de login
routes.get('/login', LoginController.index);
routes.post('/login/registro', LoginController.registro);
routes.post('/login/acesso', LoginController.acesso);
routes.get('/login/sair', LoginController.sair);

// Rotas de contato
routes.get('/contato', loginRequerido, ContatoController.index);
routes.post('/contato/registro', loginRequerido, ContatoController.registro);
routes.get('/contato/:id', loginRequerido, ContatoController.exibir);
routes.post('/contato/editar/:id', loginRequerido, ContatoController.editar);
routes.get('/contato/excluir/:id', loginRequerido, ContatoController.excluir);

module.exports = routes;
