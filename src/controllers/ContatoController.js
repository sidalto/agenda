const Contato = require('../models/Contato');

function index(req, res) {
  res.render('contato', { contato: {} });
}

async function registro(req, res) {
  try {
    const contato = new Contato(req.body);
    await contato.registra();
    if (contato.erros.length > 0) {
      req.flash('erros', contato.erros);
      req.session.save(() => {
        res.redirect('back');
      });
      return;
    }
    req.flash('success', 'Contato inserido com sucesso');
    req.session.save(() => {
      res.redirect(`/contato/${contato.contato._id}`);
    });
    return;
  } catch (erro) {
    console.log(erro);
    return res.render('404');
  }
}

async function exibir(req, res) {
  try {
    if (!req.params.id) {
      return res.render('404');
    }
    const contato = await Contato.buscaContato(req.params.id);
    if (!contato) {
      return res.render('404');
    }
    res.render('contato', { contato });
  } catch (erro) {
    console.log(erro);
    res.render('404');
  }
}

async function editar(req, res) {
  try {
    if (!req.params.id) {
      return res.render('404');
    }
    const contato = new Contato(req.body);
    await contato.editar(req.params.id);
    if (contato.erros.length > 0) {
      req.flash('erros', contato.erros);
      req.session.save(() => {
        res.redirect('back');
      });
      return;
    }
    req.flash('success', 'Contato editado com sucesso');
    req.session.save(() => {
      res.redirect(`/contato/${contato.contato._id}`);
    });
    return;
  } catch (erro) {
    console.log(erro);
    res.render('404');
  }
}

async function excluir(req, res) {
  try {
    if (!req.params.id) {
      return res.render('404');
    }
    const contato = await Contato.excluir(req.params.id);
    if (!contato) {
      return res.render('404');
    }
    req.flash('success', 'Contato excluído com sucesso');
    req.session.save(() => {
      res.redirect('back');
    });
    return;
  } catch (erro) {
    console.log(erro);
    res.render('404');
  }
}

module.exports = {
  index,
  registro,
  exibir,
  editar,
  excluir,
};
