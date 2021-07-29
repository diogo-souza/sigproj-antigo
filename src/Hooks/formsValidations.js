export function validateEmail(event) {
  const email = event.target.value;

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let error = {
    email: '',
  };

  if (!email) {
    error.email = 'Preencha um email';
  } else if (re.test(String(email).toLowerCase()) === false) {
    error.email = 'Email inválido';
  } else {
    error.email = '';
  }

  return error;
}

// export function validatePassword(event) {
//   const senha = event.target.senha.value;
//   let error = {
//     senha: '',
//   };

//   if (senha.length < 6) {
//     error.senha = 'A senha deve conter pelo menos 6 dígitos.';
//   } else {
//     error.senha = 'Senha invalida';
//   }
//   return error;
// }

export function validatePasswordBlur(values) {
  const senha = values.target.value;
  let error = {
    senha: '',
  };
  if (senha.length < 6) {
    error.senha = 'A senha deve conter pelo menos 6 dígitos.';
  } else {
    error.senha = '';
  }
  return error;
}

export function validateName(event) {
  const nome = event.target.value;
  let error = {
    nome: '',
  };
  if (!nome) {
    error.nome = 'Preencha seu nome';
  } else if (
    /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(nome) === false
  ) {
    error.nome = 'O nome deve conter apenas letras';
  }
  return error;
}

export function validateCPF(event) {
  const cpf = event.target.value.replace(/\.|-/g, '');
  let error = {
    cpf: '',
  };

  if (cpf.length !== 11) {
    error.cpf = 'O CPF precisa conter 11 dígitos';
    return error;
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
    error.cpf = 'CPF inválido';
    return error;
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
    error.cpf = 'CPF inválido';
    return error;
  }

  // Digito 2
  sum = 0;
  for (let j = 1; j <= 10; j++) {
    sum += parseInt(cpf.substring(j - 1, j) * (12 - j)); // Multiplica o primeiro dígito do CPF por 11, o segundo por 10, o terceiro por 9...
  }
  rest = sum % 11;
  const d2 = rest < 2 ? 0 : 11 - rest; // Caso "11 - resto" for 10 ou 11, o dígito 2 é 0. Se não, o dígito é o valor da subtração
  if (d2 !== parseInt(cpf.substring(10, 11))) {
    error.cpf = 'CPF inválido';
    return error;
  }
  return error;
}

export function validateEmpty(event) {
  const { value, id } = event.target;
  let error = {
    [id]: '',
  };
  if (value === '') {
    error[id] = 'Preencha o campo';
  }
  return error;
}

export function validateObjectiveFields(event) {
  //
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

export function validateNumber(event) {
  const { value, id } = event.target;
  let error = {
    [id]: '',
  };

  if (value < 0 || value === '') {
    error[id] = 'Insira um número maior ou igual a 0';
  }
  return error;
}

export function validateModalidades(modalidades) {
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

export function validatePublicoExterno(publicoExterno) {
  let publico = publicoExterno;
  delete publico.id;
  let error = {
    publicoExterno: '',
  };
  // console.log(publico)
  if (!Object.keys(publico).some((key) => publico[key] > 0)) {
    error.publicoExterno = 'A proposta precisa incluir público externo.';
  }
  return error;
}

export function validateMembrosEquipe(membros) {
  let membrosEquipe = membros;
  let error = {
    membrosEquipe: '',
  };
  if (!membros.some((membro) => membro.tipo === 'Discente Graduacao')) {
    error.membrosEquipe =
      'A proposta precisa incluir pelo menos um membro discente de graduação da UFPE.';
  }
  return error;
}
