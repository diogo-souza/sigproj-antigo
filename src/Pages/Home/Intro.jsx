import React from 'react';
import Container from 'react-bootstrap/Container';

const Intro = () => (
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
      <button type="button" className="home-button">
        <p>Consultar Ação</p>
        <i className="material-icons">search</i>
      </button>
      <button type="button" className="home-button">
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
);

export default Intro;
