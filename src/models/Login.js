const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.erros = [];
    this.usuario = null;
  }

  async registra() {
    this.valida();
    if (this.erros.length > 0) {
      return;
    }
    await this.verificaUsuario();
    if (this.erros.length > 0 ) {
      return;
    }
    const salt = bcryptjs.genSaltSync();
    this.body.senha = bcryptjs.hashSync(this.body.senha, salt);   
    this.user = await LoginModel.create(this.body);
  }

  async login() {
    this.valida();
    if (this.erros.length > 0) {
      return;
    }
    this.usuario = await LoginModel.findOne({ email: this.body.email });
    if (!this.usuario) {
      this.erros.push('Usuário ou senha incorretos');
      return;
    }
    if (!bcryptjs.compareSync(this.body.senha, this.usuario.senha)) {
      this.erros.push('Senha incorreta');
      this.usuario = null;
      return;
    }
  }

  async verificaUsuario() {
    this.usuario = await LoginModel.findOne({ email: this.body.email });
    if (this.usuario) {
      this.erros.push('Usuário já existe'); 
    }
  }
  
  valida() {
    this.limpaEntrada();
    if (!validator.isEmail(this.body.email)) {
      this.erros.push('Email inválido');
    }
    if (this.body.senha.length <= 3 || this.body.senha.length > 50) {
      this.erros.push('A senha precisa conter entre 3 e 50 caracteres');
    }
  }

  limpaEntrada() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
  }
}

module.exports = Login;
