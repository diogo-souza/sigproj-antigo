import React from 'react';

// React-Bootstrap componentes
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router';

const Consultas = () => {
  const { push } = useHistory()
  return (
    <section className="consultas">
      <Container>
        <h1>Consulte Editais e Ações Registradas</h1>
        <hr className="hr-1" />
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Nibh tellus molestie
          nunc non blandit.Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Nibh tellus molestie nunc non blandit.
        </p>
        <button type="button" className="home-button" onClick={() => push('/consulta')}>
          <p>Realizar Consulta</p>
          <i className="material-icons">arrow_forward</i>
        </button>
        <hr className="section-divider" />
      </Container>
    </section>
  )
}

export default Consultas;
