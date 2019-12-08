const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.erros = [];
    this.contato = null;
  }

  async registra() {
    this.valida();
    if (this.erros.length > 0) {
      return;
    }
    this.contato = await ContatoModel.create(this.body);
  }

  async editar(id) {
    if (typeof id !== 'string') {
      return;
    }
    this.valida();
    if (this.erros.length > 0) {
      return;
    }
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });
  }

  valida() {
    this.limpaEntrada();
    if (!this.body.nome) {
      this.erros.push('Nome é obrigatório');
    }
    if (this.body.email && !validator.isEmail(this.body.email)) {
      this.erros.push('Email inválido');
    }
    if (!this.body.email && !this.body.telefone) {
      this.erros.push(
        'Pelo menos uma informação de contato deve ser fornecida: email ou telefone.',
      );
    }
  }

  limpaEntrada() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
  }

  // métodos estáticos
  static async buscaContato(id) {
    if (typeof id !== 'string') {
      return;
    }
    const usuario = await ContatoModel.findById(id);
    return usuario;
  }

  static async buscaContatos() {
    const usuarios = await ContatoModel.find().sort({ criadoEm: -1 });
    return usuarios;
  }

  static async excluir(id) {
    if (typeof id !== 'string') {
      return;
    }
    const contato = await ContatoModel.findOneAndDelete(id);
    return contato;
  }
}

module.exports = Contato;
