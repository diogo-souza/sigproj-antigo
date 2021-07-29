import React, { useState, useContext } from 'react';
import { UserContext } from '../Services/UserContext';
// import {
//   validateEmpty,
//   validateEmail,
//   validatePasswordBlur,
// } from './formsValidations';
import formsValidations2 from './formsValidations2';

const useLoginForm = () => {
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({
    email: '',
    senha: '',
    confirmarSenha: '',
    novaSenha: '',
  });
  // const [errors, setErrors] = useState({});
  const { errors } = formsValidations2();
  const {
    userLogin,
    setLoading,
    userRecoveryPassword,
    userRecoveryToken,
  } = useContext(UserContext);

  const handleChange = (e) => {
    let { id, value } = e.target;
    setValues({
      ...values,
      [id]: value,
    });
  };

  // Submits!!!!!

  // Submit Login
  const handleSubmitLogin = (event) => {
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
      userLogin(values.email, values.senha);
    }
  };

  // Submit Recovery
  const handleSubmitRecovery = (event) => {
    const form = event.currentTarget;
    const noError = !Object.values(errors).some(
      (error) => error !== null && error !== '',
    );
    if (form.checkValidity() === false && !noError) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
    }
    setValidated(true);
    userRecoveryPassword(values.email);
  };

  // Submit Reset

  const handleSubmitReset = (event) => {
    const form = event.currentTarget;
    const noError = !Object.values(errors).some(
      (error) => error !== null && error !== '',
    );
    if (form.checkValidity() === false && !noError) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    userRecoveryToken(
      window.location.pathname,
      values.novaSenha,
      values.confirmarSenha,
    );
  };

  return {
    handleChange,
    values,
    validated,
    handleSubmitLogin,
    handleSubmitRecovery,
    handleSubmitReset,
  };
};

export default useLoginForm;
