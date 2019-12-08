function middlewareGlobal(req, res, next) {
  res.locals.erros = req.flash('erros');
  res.locals.success = req.flash('success');
  res.locals.usuario = req.session.user;
  next();
}

function outroMiddleware(req, res, next) {
  next();
}

function checkCsrfError(err, req, res, next) {
  if (err) {
    return res.render('404');
  }
  next();
}

function csrfMiddleware(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
}

function loginRequerido(req, res, next) {
  if (!req.session.user) {
    req.flash('erros', 'Você precisa fazer login.');
    req.session.save(() => {
      res.redirect('/');
    });
    return;
  }
  next();
}

module.exports = {
  middlewareGlobal,
  outroMiddleware,
  checkCsrfError,
  csrfMiddleware,
  loginRequerido,
};
