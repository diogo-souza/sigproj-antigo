import React, { Component } from 'react';

import { Container, Navbar, Col, Row } from 'react-bootstrap';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import RoomRoundedIcon from '@material-ui/icons/RoomRounded';

import proexcLogo from '../../Utils/assets/images/ufpe-proexc-logo.svg';
import stiLogo from '../../Utils/assets/images/sti-logo.svg';

class Footer extends React.PureComponent {
  render() {
    return (
      <Navbar className="footer" expand="lg">
        <Container>
          <Col className="col-test">
            <Row className="linha-footer">
              <Navbar.Brand className="navbar-brand">
                <img
                  src={proexcLogo}
                  width="200"
                  height="auto"
                  alt="UFPE ProExc Logo"
                />
              </Navbar.Brand>
              <ul className="menu-footer">
                <li>
                  <h4>PROEXC</h4>
                </li>
                <li>
                  <PhoneRoundedIcon fontSize="small" />
                  <p>+55 81 99999-9999</p>
                </li>
                <li>
                  <EmailRoundedIcon fontSize="small" />
                  <p>contato@proexc.ufpe.br</p>
                </li>
                <li>
                  <RoomRoundedIcon fontSize="small" />
                  <p>
                    Av. Jornalista Aníbal Fernandes, s/n – Cidade Universitária.
                    Recife-PE – Brasil CEP: 50.740-560
                  </p>
                </li>
              </ul>
              <ul className="menu-footer">
                <li>
                  <h4>STI</h4>
                </li>
                <li>
                  <PhoneRoundedIcon fontSize="small" />
                  <p>+55 81 99999-9999</p>
                </li>
                <li>
                  <EmailRoundedIcon fontSize="small" />
                  <p>contato@sti.ufpe.br</p>
                </li>
                <li>
                  <RoomRoundedIcon fontSize="small" />
                  <p>
                    Av. Jornalista Aníbal Fernandes, s/n – Cidade Universitária.
                    Recife-PE – Brasil CEP: 50.740-560
                  </p>
                </li>
              </ul>
              <Navbar.Brand className="navbar-brand">
                <img src={stiLogo} width="170" height="auto" alt="STI logo" />
              </Navbar.Brand>
            </Row>
            <p className="copyright">
              © {new Date().getFullYear()}{' '}
              <a href="https://www.ufpe.br/sti">STI Labs</a> - Superintendência
              de Tecnologia da Informação - STI. Todos os direitos reservados.
            </p>
          </Col>
        </Container>
      </Navbar>
    );
  }
}

export default Footer;
