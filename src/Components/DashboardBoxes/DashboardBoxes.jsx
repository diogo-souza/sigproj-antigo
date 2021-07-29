import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../Services/UserContext';

const DashboardBoxes = () => (
  <section className="dashboard-boxes">
    <Container>
      <Row className="dashboard-boxes-row ">
        <div className="box-dashboard bg-red">
          <div className="inner-content">
            <h3>5</h3>
            <p>Propostas em Execução</p>
          </div>
        </div>

        <div className="box-dashboard bg-green">
          <div className="inner-content">
            <h3>3</h3>
            <p>Propostas em Avaliação</p>
          </div>
        </div>

        <div className="box-dashboard bg-gray">
          <div className="inner-content">
            <h3>7</h3>
            <p>Propostas não Avaliadas</p>
          </div>
        </div>

        <div className="box-dashboard bg-green">
          <div className="inner-content">
            <h3>2</h3>
            <p>Propostas Finalizadas</p>
          </div>
        </div>

        <div className="box-dashboard bg-red">
          <div className="inner-content">
            <h3>2</h3>
            <p>Propostas Recusadas</p>
          </div>
        </div>
      </Row>
    </Container>
  </section>
);

export default DashboardBoxes;
