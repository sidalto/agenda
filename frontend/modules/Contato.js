import validator from 'validator';

class Contato {
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
    let erro = false;
    if (!validator.isEmail(inputEmail.value)) {
      erro = true;
      alert('Email inválido');
    }
    if (!erro) {
      elemento.submit();
    }
  }
}

export default Contato;
