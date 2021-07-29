import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, Col, Row, Container } from 'react-bootstrap';

const ConsultaOpcao = () => (
  <div className="consulta-opcao">
    <Container>
      <div className="box-all">
        <Row className="justify-content-md-center">
          <Col className="boxForm" md="8">
            <h1>O que você deseja consultar?</h1>
            <div className="box-buttons">
              <div className="botoes">
                <Link to="/consulta-edital">
                  <Button className="button" value="edital">
                    <p>Editais</p>
                    <i className="material-icons button-icon">person</i>
                  </Button>
                </Link>
              </div>
              <div className="botoes">
                <Link to="/consulta-acao">
                  <Button className="button" value="acao">
                    <p>Ações de Extensão</p>
                    <i className="material-icons button-icon">person</i>
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  </div>
);

export default ConsultaOpcao;
