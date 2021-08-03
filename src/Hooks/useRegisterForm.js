import React, { useState, useContext, useEffect } from 'react';

import { estados } from '../Utils/estados-cidades';
import { UserContext } from '../Services/UserContext';
import formsValidations2 from './formsValidations2';

const useRegisterForm = () => {
  const [validated, setValidated] = useState(false);
  const [cities, setCities] = useState([]);
  const [values, setValues] = useState({
    uuid: '',
    provider: 'local',
    nome: '',
    email: '',
    senha: '',
    novaSenha: '',
    confirmarSenha: '',
    cpf: '',
    data_nascimento: '',
    sexo: '',
    tipo_institucional: '',
    telefone: '',
    celular: '',
    universidade: '',
    centro: '',
    departamento: '',
    categoria: '',
    titulacao: '',
    carga_trabalho: '',
    endereco: {
      cep: '',
      estado: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      numero_residencial: '',
      complemento: '',
    },
  });
  const { errors, setErrors } = formsValidations2();
  const { userSignIn, userSession, putAccount,putAccountPassword } = useContext(UserContext);



  const handleChange = (e) => {
    let { id, value } = e.target;
    if (id === 'estado') {
      const cities = estados.filter((estado) => {
        let cidades = '';
        if (estado.sigla === value) cidades = estado.cidades;
        return cidades;
      });
      setCities(cities[0].cidades);
    } else if (id === 'cpf') {
      value = value.replace(/\.|-/g, '');
    }

    if (
      id === 'cep' ||
      id === 'estado' ||
      id === 'cidade' ||
      id === 'bairro' ||
      id === 'logradouro' ||
      id === 'numero_residencial' ||
      id === 'complemento'
    ) {
      setValues({
        ...values,
        endereco: {
          ...values.endereco,
          [id]: value,
        },
      });
    } else {
      setValues({
        ...values,
        [id]: value,
      });
    }
  };

  // Submits!!!!

  const handleSubmitRegister = (event) => {
    const form = event.currentTarget;
    const noError = !Object.values(errors).some(
      (error) => error !== null && error !== '',
    );

    if (form.checkValidity() === false || !noError) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setValidated(true);
      userSignIn(values);
    }
  };

  const handleSubmitAccount = (event) => {
    const form = event.currentTarget;
    const noError = !Object.values(errors).some(
      (error) => error !== null && error !== '',
    );

    if (form.checkValidity() === false || !noError) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setValidated(true);
      putAccount(values);
    }
  };


  const handleSubmitAccountPassword = (event) => {
    const form = event.currentTarget;
    const noError = !Object.values(errors).some(
      (error) => error !== null && error !== '',
    );

    if (form.checkValidity() === false || !noError) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setValidated(true);
      putAccountPassword(values.senha , values.novaSenha, values.confirmarSenha);
    }
  };


  // Validação de CEP
  function validateCEP(event) {
    const { value } = event.target;
    const cep = value.replace(/[^0-9]/g, '');
    if (cep?.length !== 8) {
      setErrors({
        ...errors,
        cep: 'CEP inválido.',
      });
      return;
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/unicode`)
      .then((res) => res.json())
      .then((data) => {
        const sCities = estados.filter((estado) => {
          let cidades = '';
          if (estado.sigla === data.uf) cidades = estado.cidades;
          return cidades;
        });

        if (sCities.length === 0) {
          setErrors({
            ...errors,
            cep: 'CEP inválido.',
          });
        } else {
          setCities(sCities[0].cidades);
          setValues({
            ...values,
            endereco: {
              ...values.endereco,
              estado: data.uf,
              logradouro: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
            },
          });
          setErrors({
            ...errors,
            cep: '',
          });
        }
      });
  }

  return {
    handleChange,
    values,
    setValues,
    validated,
    cities,
    handleSubmitRegister,
    handleSubmitAccount,
    handleSubmitAccountPassword,
    validateCEP,
  };
};

export default useRegisterForm;
