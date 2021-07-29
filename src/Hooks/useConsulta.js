import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../Services/UserContext';
import formsValidations2 from './formsValidations2';

const useConsulta = () => {
  const [validated, setValidated] = useState(false);
  const { errors } = formsValidations2();
  const {
    getPropostas,
    setLoading,
    dadosConsulta,
    setDadosConsulta,
    dadosConsultaEditais,
    setDadosConsultaEditais,
    getEditais,
  } = useContext(UserContext);

  const handleChange = (e) => {
    let { id, value } = e.target;
    setDadosConsulta({
      ...dadosConsulta,
      [id]: value,
    });
  };

  const handleChangeEdital = (e) => {
    let { id, value } = e.target;
    setDadosConsultaEditais({
      ...dadosConsultaEditais,
      [id]: value,
    });
  };

  const paginate = (pageNumber) => {
    setDadosConsulta({
      ...dadosConsulta,
      pagina: pageNumber,
    });
  };

  const paginateEdital = (pageNumber) => {
    setDadosConsultaEditais({
      ...dadosConsultaEditais,
      pagina: pageNumber,
    });
  };

  // Submits!!!!!

  // Submit Consultar ACAO
  const handleSubmitConsultar = (event) => {
    const form = event.currentTarget;
    const noError = !Object.values(errors).some(
      (error) => error !== null && error !== '',
    );
    if (form.checkValidity() === false || !noError) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setLoading(true);
      setValidated(true);
      getPropostas(dadosConsulta);
    }
  };

  const handleSubmitConsultarEdital = (event) => {
    const form = event.currentTarget;
    const noError = !Object.values(errors).some(
      (error) => error !== null && error !== '',
    );
    if (form.checkValidity() === false || !noError) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setLoading(true);
      setValidated(true);
      getEditais(dadosConsultaEditais);
    }
  };

  return {
    handleChange,
    handleChangeEdital,
    validated,
    handleSubmitConsultar,
    handleSubmitConsultarEdital,
    dadosConsulta,
    setDadosConsulta,
    dadosConsultaEditais,
    setDadosConsultaEditais,
    paginate,
    paginateEdital,
  };
};

export default useConsulta;
