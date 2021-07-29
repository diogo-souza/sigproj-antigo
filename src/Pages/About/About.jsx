import React, { useRef } from 'react';

// React-Bootstrap componentes
import { Container, Col, Row } from 'react-bootstrap';

import { AboutData } from './AboutData';
import ScrollTopArrow from '../../Components/ScrollArrow/ScrollArrow';

const About = () => {
  const inputEl = useRef('');

  return (
    // <Container>
    <Row>
      <Col className="conteudo-col texto-principal">
        <div>
          <h1 ref={inputEl} id="ref">
            Sobre
          </h1>
          {AboutData.map((list) => (
            <div className="textos" key={list.id}>
              <h2 id={list.title}>{list.title}</h2>
              <hr />
              {list.subtitle !== '' && (
                <h4 id={list.subtitle} className="hr-subtitle">
                  {list.subtitle}
                </h4>
              )}
              <p>{list.description}</p>
            </div>
          ))}
        </div>
        <div className="button-up">
          <ScrollTopArrow estado={inputEl} />
        </div>
      </Col>
      <Col className="conteudo-col" xs lg="3">
        <div className="indice">
          <h3>Índice</h3>
          <hr className="hr-indice" />
          <ul className="sumario">
            {AboutData.map((list) => (
              <li key={list.id}>
                <a href={'#'.concat(list.title)}>{list.title}</a>
                {list.subtitle !== '' && (
                  <ul>
                    <a href={'#'.concat(list.subtitle)}>
                      <li>{list.subtitle}</li>
                    </a>
                  </ul>
                )}
                <hr className="hr-indice" />
              </li>
            ))}
          </ul>
        </div>
      </Col>
    </Row>
    // </Container>
  );
};
export default About;
