import React from 'react';
import { Container, Row } from 'react-bootstrap';

import MinhasPropostas from './MinhasPropostas';
import SelecionarEdital from '../../Components/CadastroProposta/SelecionarEdital/SelecionarEdital';
import DashboardBoxes from '../../Components/DashboardBoxes/DashboardBoxes';
import TodasPropostas from './TodasPropostas';

const HomeProponente = () => (
  <div className="dashboard">
    <Row>
      <Container>
        <DashboardBoxes />
        <MinhasPropostas />
        <TodasPropostas />
        <SelecionarEdital />
      </Container>
    </Row>
  </div>
);

export default HomeProponente;
