import React from 'react';

// React-Bootstrap componentes
import Container from 'react-bootstrap/Container';

const Cadastro = () => (
  <section className="cadastro">
    <Container>
      <h1>Cadastre suas Ações em um Edital</h1>
      <hr className="hr-1" />
      <p className="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Nibh tellus molestie
        nunc non blandit.Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Nibh tellus molestie nunc non blandit.
      </p>
      <button type="button" className="home-button">
        <p>Realizar Cadastro</p>
        <i className="material-icons">arrow_forward</i>
      </button>
      <hr className="section-divider" />
    </Container>
  </section>
);

export default Cadastro;
