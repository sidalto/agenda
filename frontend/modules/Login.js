import validator from 'validator';

class Login {
  constructor(form) {
    this.form = document.querySelector(form);
  }

  inicializar() {
    this.eventos();
  }

  eventos() {
    if (!this.form) {
      return;
    }
    this.form.addEventListener('submit', evento => {
      evento.preventDefault();
      this.validar(evento);
    });
  }

  validar(evento) {
    const elemento = evento.target;
    const inputEmail = elemento.querySelector('input[name="email"]');
    const inputSenha = elemento.querySelector('input[name="senha"]');
    let erro = false;
    if (!validator.isEmail(inputEmail.value)) {
      erro = true;
      alert('Email inválido');
    }
    if (inputSenha.value.length < 3 || inputSenha.value.length > 50) {
      erro = true;
      alert('Senha precisa ter entre 3 e 50 caracteres');
    }
    if (!erro) {
      elemento.submit();
    }
  }
}

export default Login;
