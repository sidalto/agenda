const Login = require('../models/Login');

function index(req, res) {
  if (req.session.user) {
    return res.render('logado');
  }
  res.render('login');
}

async function registro(req, res) {
  try {
    const login = new Login(req.body);
    await login.registra();
    if (login.erros.length > 0) {
      req.flash('erros', login.erros);
      req.session.save(() => {
        return res.redirect('back');
      });
      return;
    }
    req.flash('success', 'Seu usuário foi criado com sucesso');
    req.session.save(() => {
      return res.redirect('back');
    });
  } catch (erro) {
    console.log(erro);
    return res.render('404');
  }
}

async function acesso(req, res) {
  try {
    const login = new Login(req.body);
    await login.login();
    if (login.erros.length > 0) {
      req.flash('erros', login.erros);
      req.session.save(() => {
        return res.redirect('back');
      });
      return;
    }
    req.flash('success', 'Logado com sucesso');
    req.session.user = login.usuario;
    req.session.save(() => {
      return res.redirect('back');
    });
  } catch (erro) {
    console.log(erro);
    return res.render('404');
  }
}

function sair(req, res) {
  req.session.destroy();
  res.redirect('/');
}

module.exports = {
  index,
  registro,
  acesso,
  sair,
};
