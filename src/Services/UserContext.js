import React, { useEffect, createContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import api from './sigproj/api';
import { isAuthenticated, login, logout } from './auth';
import { HttpCodes } from './HttpCodes';

export const UserContext = createContext();
export const UserStorage = ({ children }) => {
  const history = useHistory();
  const [userSession, setUserSession] = useState(null);
  const [listaPropostas, setListaPropostas] = useState(null);
  const [listaEditais, setListaEditais] = useState(null);1
  const [propostaUuid, setPropostaUuid] = useState(null);
  const [editalUuid, setEditalUuid] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [errorsHTTP, setErrorsHTTP] = useState({
    codigo: '',
    titulo: '',
    texto: '',
    userText: '',
  });


  const [dadosConsulta, setDadosConsulta] = useState({
    area_tematica: null,
    centro: null,
    departamento: null,
    edital_titulo: null,
    modalidade: null,
    titulo: null,
    pagina: 1,
    limite: null,
  });

  const [dadosConsultaEditais, setDadosConsultaEditais] = useState({
    modalidade: null,
    titulo: null,
    pagina: 1,
    limite: null,
  });

  async function getUser() {
    const user = await api.get('/usuarios/perfil');
    localStorage.setItem('session', JSON.stringify(user.data));
    setUserSession(user.data);
    setLoading(false);
  }

  // useEffect(() => {
  //   const session = JSON.parse(localStorage.getItem('session'));
  //   if (session !== null) {
  //   // if (session !== userSession || userSession === null) {
  //     getUser();
  //   }
  // }, []);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session !== null) {
      setUserSession(session);
    }
  }, []);

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    if (session === null) {
      setUserSession(session);
    }
  }, [userSession]);

  async function userLogin(email, senha) {
    try {
      const response = await api.post('login', { email, senha });
      login(response.data.token);
      await getUser();
      history.push('/dashboard');
    } catch (error) {
      let codigo = HttpCodes.filter(
        (item) => item.code === error.response.status,
      );
      // // console.log('errror', error.message);
      // // console.log(error.response.data.message);
      // // console.log(error.response.status);
      // // console.log(error.response.headers);
      setErrorsHTTP({
        ...errorsHTTP,
        titulo: '=(',
        userText: 'Credenciais erradas. Confira seu e-mail e senha.',
      });
      setModalShow(true);
    }
    setLoading(false);
  }

  async function userLoginGoogle(token) {
    try {
      login(token);
      await getUser();
      history.push('/dashboard');
    } catch (error) {
      let codigo = HttpCodes.filter(
        (item) => item.code === error.response.status,
      );
      // // console.log('errror', error.message);
      // // console.log(error.response.data.message);
      // // console.log(error.response.status);
      // // console.log(error.response.headers);
      setErrorsHTTP({
        ...errorsHTTP,
        titulo: '=(',
        userText: 'Houve um erro durante o login, tente novamente',
      });
      setModalShow(true);
    }
    setLoading(false);
  }

  async function userLogout() {
    if (userSession && isAuthenticated()) {
      logout();
      setUserSession(null);
      localStorage.removeItem('session');
      history.push('/');
    }
    setLoading(false);
  }

  async function userSignIn(values) {
    try {
      const response = await api.post('/usuarios', values);
      setErrorsHTTP({
        ...errorsHTTP,
        titulo: '=)',
        userText: 'Seu cadastro foi realizado com sucesso.',
      });
      history.push("/login");
    } catch (error) {
      setErrorsHTTP({
        ...errorsHTTP,
        titulo: '=(',
        userText: 'Dados errados. Confira os dados.',
      });
      setModalShow(true);
    }
    setLoading(false);
    setModalShow(true);
  }

  async function userRecoveryPassword(email) {
    try {
      const response = await api.post('/recovery-password', { email });
      setErrorsHTTP({
        ...errorsHTTP,
        titulo: '=)',
        userText:
          'Instruções e link para redefinir sua senha foi enviado para ',
      });
      setModalShow(true);
    } catch (error) {
      let codigo = HttpCodes.filter(
        (item) => item.code === error.response.status,
      );
      setErrorsHTTP({
        ...errorsHTTP,
        titulo: '=)',
        userText:
          'Instruções e link para redefinir sua senha foi enviado para ',
      });
      setModalShow(true);
    }
    setLoading(false);
  }

  async function userRecoveryToken(url, novaSenha, confirmarSenha) {
    try {
      const response = await api.post(url, { novaSenha, confirmarSenha });
      let codigo = HttpCodes.filter((item) => item.code === response.status);
      setErrorsHTTP({
        ...errorsHTTP,
        titulo: '=)',
        userText: 'Sua Senha foi redefinida com sucesso.',
      });
      setModalShow(true);
    } catch (error) {
      let codigo = HttpCodes.filter(
        (item) => item.code === error.response.status,
      );
      setErrorsHTTP({
        ...errorsHTTP,
        titulo: '=(',
        userText: 'Ocorreu algum problema.',
      });
      setModalShow(true);
    }
    setLoading(false);
  }

  async function putAccount(values) {
    try {
      const response = await api.put('usuarios/editar-perfil/', values);
      await getUser();
      setErrorsHTTP({
        ...errorsHTTP,
        titulo: '=)',
        userText: 'Seus dados foram atualizados com sucesso.',
      });
    } catch (error) {
      let codigo = HttpCodes.filter(
        (item) => item.code === error.response.status,
      );
      setErrorsHTTP({
        ...errorsHTTP,
        titulo: '=(',
        userText: 'Algum dado invalido.',
      });
    }
    setLoading(false);
    setModalShow(true);
  }
  async function putAccountPassword(senha, novaSenha, confirmarSenha) {
    try {
      const response = await api.put('usuarios/editar-perfil/atualizar-senha', {
        senha,
        novaSenha,
        confirmarSenha,
      });
      await getUser();
      setErrorsHTTP({
        ...errorsHTTP,
        titulo: '=)',
        userText: 'Sua senha foi atualizada com sucesso.',
      });
    } catch (error) {
      let codigo = HttpCodes.filter(
        (item) => item.code === error.response.status,
      );
      setErrorsHTTP({
        ...errorsHTTP,
        titulo: '=(',
        userText: 'Algum dado invalido.',
      });
    }
    setLoading(false);
    setModalShow(true);
  }

  async function getPropostas(values) {
    try {
      const response = await api.get('/propostas/buscar', { params: values });
      // https://api-novosigproj.herokuapp.com
      // /propostas/buscar?pagina=1
      setListaPropostas(response.data);
      setErrorsHTTP({
        ...errorsHTTP,
        titulo: '=)',
        userText: 'Seus dados foram atualizados com sucesso.',
      });
      history.push(`${response.request.responseURL.slice(process.env.REACT_APP_API_URL.length)}`);
    } catch (error) {
      setErrorsHTTP({
        ...errorsHTTP,
        titulo: '=(',
        userText: 'Algum dado invalido.\n'.concat(error),
      });
    }
    setLoading(false);
    setModalShow(true);
  }

  async function getPropostaUuid(uuid) {
    try {
      const response = await api.get('/propostas/buscar/'.concat(uuid));
      localStorage.setItem('prospostaResumo', JSON.stringify(response.data));
      setPropostaUuid(response.data);
      history.push(`${response.config.url}`);
    } catch (error) {
      // // console.log(error);
    }
  }

  async function getEditais(values) {
    try {
      const response = await api.get('/editais', { params: values });
      // https://api-novosigproj.herokuapp.com
      // /propostas/buscar?pagina=1
      setListaEditais(response.data);
      setErrorsHTTP({
        ...errorsHTTP,
        titulo: '=)',
        userText: 'Seus dados foram atualizados com sucesso.',
      });
      console.log(response.request.responseURL)
      history.push(`/lista-editais/${response.request.responseURL.slice(process.env.REACT_APP_API_URL.length)}`);
    } catch (error) {
      setErrorsHTTP({
        ...errorsHTTP,
        titulo: '=(',
        userText: 'Algum dado invalido.\n'.concat(error),
      });
    }
    setLoading(false);
    setModalShow(true);
  }

  async function getEditalUuid(uuid) {
    try {
      const response = await api.get('/editais/'.concat(uuid));
      localStorage.setItem('editalResumo', JSON.stringify(response.data));
      setEditalUuid(response.data);
      history.push(`${response.config.url}`);
    } catch (error) {
      // // console.log(error);
    }
  }

  return (
    <UserContext.Provider
      value={{
        userLogin,
        userLoginGoogle,
        userSignIn,
        userSession,
        userRecoveryPassword,
        userLogout,
        userRecoveryToken,
        modalShow,
        setModalShow,
        errorsHTTP,
        setErrorsHTTP,
        isLoading,
        setLoading,
        putAccount,
        putAccountPassword,
        getPropostas,
        listaPropostas,
        setListaPropostas,
        getPropostaUuid,
        setPropostaUuid,
        propostaUuid,
        dadosConsulta,
        setDadosConsulta,
        getEditais,
        getEditalUuid,
        dadosConsultaEditais,
        setDadosConsultaEditais,
        listaEditais,
        setListaEditais,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
