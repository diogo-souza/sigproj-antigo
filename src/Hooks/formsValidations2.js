import { useState } from 'react';

const formsValidations2 = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    confirmarSenha: '',
    novaSenha: '',
  });

  function validateEmpty(event) {
    const { value, id } = event.target;
    if (value === '') {
      setErrors({
        ...errors,
        id: 'Preencha o campo',
      });
    }
  }

  function validateEmail(event) {
    const email = event.target.value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email) {
      setErrors({
        ...errors,
        email: 'Preencha um email',
      });
    } else if (re.test(String(email).toLowerCase()) === false) {
      setErrors({
        ...errors,
        email: 'Email inválido',
      });
    } else {
      setErrors({
        ...errors,
        email: '',
      });
    }
  }

  function validatePassword(event) {
    values.novaSenha = event.target.value;
    if (values.novaSenha.length < 6) {
      setErrors({
        ...errors,
        novaSenha: 'A senha deve conter pelo menos 6 dígitos.',
      });
    } else {
      setErrors({
        ...errors,
        novaSenha: '',
      });
    }
  }

  function validatePasswordConfirmation(event) {
    values.confirmarSenha = event.target.value;
    if (values.novaSenha !== values.confirmarSenha) {
      setErrors({
        ...errors,
        confirmarSenha: 'As senhas não são iguais.',
      });
    } else {
      setErrors({
        ...errors,
        confirmarSenha: '',
      });
    }
  }

  function validateName(event) {
    const nome = event.target.value;
    if (!nome) {
      setErrors({
        ...errors,
        nome: 'Preencha o campo',
      });
    } else if (
      /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(nome) === false
    ) {
      setErrors({
        ...errors,
        nome: 'O nome deve conter apenas letras',
      });
    } else {
      setErrors({
        ...errors,
        nome: '',
      });
    }
  }

  function validateCPF(event) {
    const cpf = event.target.value.replace(/\.|-/g, '');
    if (cpf.length !== 11) {
      setErrors({
        ...errors,
        cpf: 'CPF inválido.',
      });
      return;
    }
    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      setErrors({
        ...errors,
        cpf: 'CPF inválido.',
      });
      return;
    }
    let sum = 0;
    let rest = 0;

    // Dígito 1
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i) * (11 - i)); // Multiplica o primeiro dígito do CPF por 10, o segundo por 9, o terceiro por 8...
    }
    rest = sum % 11;
    const d1 = rest < 2 ? 0 : 11 - rest; // Caso "11 - resto" for 10 ou 11, o dígito 1 é 0. Se não, o dígito é o valor da subtração
    if (d1 !== parseInt(cpf.substring(9, 10))) {
      setErrors({
        ...errors,
        cpf: 'CPF inválido.',
      });
      return;
    }

    // Digito 2
    sum = 0;
    for (let j = 1; j <= 10; j++) {
      sum += parseInt(cpf.substring(j - 1, j) * (12 - j)); // Multiplica o primeiro dígito do CPF por 11, o segundo por 10, o terceiro por 9...
    }
    rest = sum % 11;
    const d2 = rest < 2 ? 0 : 11 - rest; // Caso "11 - resto" for 10 ou 11, o dígito 2 é 0. Se não, o dígito é o valor da subtração
    if (d2 !== parseInt(cpf.substring(10, 11))) {
      setErrors({
        ...errors,
        cpf: 'CPF inválido.',
      });
      return;
    }
    setErrors({
      ...errors,
      cpf: '',
    });
  }



  function validateObjectiveFields(event) {
    const { value, id, name } = event.target;
    let error = {
      [id + name]: '',
    };
    if (id === 'mes') {
      if (
        value !== 'Janeiro' &&
        value !== 'Fevereiro' &&
        value !== 'Março' &&
        value !== 'Abril' &&
        value !== 'Maio' &&
        value !== 'Junho' &&
        value !== 'Julho' &&
        value !== 'Agosto' &&
        value !== 'Setembro' &&
        value !== 'Outubro' &&
        value !== 'Novembro' &&
        value !== 'Dezembro'
      ) {
        error[id + name] = 'Insira um mês válido';
      }
    } else if (id === 'cargaHoraria') {
      if (value <= 0) {
        error[id + name] = 'Insira uma carga horária válida';
      }
    } else if (value === '') {
      error[id + name] = 'Preencha o campo';
    }
    return error;
  }

  function validateNumber(event) {
    const { value, id } = event.target;
    let error = {
      [id]: '',
    };

    if (value < 0 || value === '') {
      error[id] = 'Insira um número maior ou igual a 0';
    }
    return error;
  }

  function validateModalidades(modalidades) {
    const id = 'modalidades';
    let error = {
      [id]: '',
    };

    if (
      !modalidades.Curso &&
      !modalidades.Evento &&
      !modalidades.Programa &&
      !modalidades.Projeto
    ) {
      error[id] = 'Selecione ao menos uma modalidade';
    }
    return error;
  }
  return {
    errors,
    setErrors,
    validateModalidades,
    validateNumber,
    validateObjectiveFields,
    validateEmpty,
    validateCPF,
    validateName,
    validatePassword,
    validateEmail,
    validatePasswordConfirmation,
  };
};

export default formsValidations2;
