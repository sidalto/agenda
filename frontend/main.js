import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';
import Contato from './modules/Contato';

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
const contato = new Contato('.form-contato');

cadastro.inicializar();
login.inicializar();
contato.inicializar();

// import './assets/css/style.css';
