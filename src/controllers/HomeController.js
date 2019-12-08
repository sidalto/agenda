const Contato = require('../models/Contato');

async function index(req, res) {
  try {
    const contatos = await Contato.buscaContatos();
    res.render('index', { contatos });
  } catch (erro) {
    console.log(erro);
    res.render('404');
  }
}

module.exports = {
  index,
};
