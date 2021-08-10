import React from 'react';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom'

const Intro = () => {
  const { push } = useHistory()
  return (
    <section className="intro" id="banner">
      <Container>
        <h1>Novo Sistema de Registro</h1>
        <hr />
        <h2>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Nibh tellus molestie
          nunc non blandit.Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Nibh tellus molestie nunc non blandit.
        </h2>
        <button type="button" className="home-button" onClick={() => push('/consulta')}>
          <p>Consultar Ação</p>
          <i className="material-icons">search</i>
        </button>
        <button type="button" className="home-button" onClick={() => push('/cadastro-proposta')}>
          <p>Cadastrar Ação</p>
          <i className="material-icons">create</i>
        </button>
        <button type="button" className="home-button">
          <p>Emitir Certificado</p>
          <i className="material-icons">how_to_reg</i>
        </button>
        <hr />
      </Container>
    </section>
  )
}

export default Intro;
