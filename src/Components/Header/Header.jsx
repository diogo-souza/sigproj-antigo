import React, { useContext, useEffect } from 'react';
// React-Bootstrap components
import { Container, Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { useHistory, useLocation, Link } from 'react-router-dom';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { UserContext } from '../../Services/UserContext';
import { SidebarData } from '../Sidebar/SidebarData';

const Header = () => {
  const history = useHistory();
  const { userLogout, userSession } = useContext(UserContext);

  function toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  return (
    <Navbar className="main-navbar" fixed="top" expand="lg">
      {userSession ? (
        <Container fluid>
          <Navbar className="second-navbar" collapseOnSelect expand="lg">
            <Button
              type="button"
              className="btn btn-outline-dark navbar-toggler"
              onClick={toggleOffcanvas}
            >
              <span className="navbar-toggler-icon" />
            </Button>
            {/* <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className=""
              onClick={toggleOffcanvas}
            /> */}
            <Navbar.Brand className="navbar-brand">LOGO</Navbar.Brand>
            <Button
              type="button"
              className="login-button"
              id="button-login"
              onClick={userLogout}
            >
              <p>Logout</p>
              <PersonRoundedIcon />
            </Button>

            {/* <Dropdown as={Nav.Item}>
            <Dropdown.Toggle
              as={Nav.Link}
              data-toggle="dropdown"
              id="dropdown-67443507"
              variant="default"
              className="m-0"
            >
              <NotificationsRoundedIcon />
              <span className="notification">5</span>

            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                Notification 1
              </Dropdown.Item>
              <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                Notification 2
              </Dropdown.Item>
              <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                Notification 3
              </Dropdown.Item>
              <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                Notification 4
              </Dropdown.Item>
              <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                Another notification
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}

            {/* <Nav.Item>
            <Nav.Link
              className="m-0"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <SearchIcon />
            </Nav.Link>
          </Nav.Item> */}
            <Navbar.Collapse id="basic-navbar-nav">
              <div className="local">
                {SidebarData.filter(
                  (item) => item.path === useLocation().pathname,
                ).map((filteredItem) => filteredItem.title)}
              </div>

              <Nav.Item className="item-perfil">
                <Link to="/perfil">
                  <div className="icon-texto">
                    <AccountCircleRoundedIcon />
                    {' '.concat(userSession.nome)}
                  </div>
                </Link>
              </Nav.Item>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      ) : (
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand className="navbar-brand">LOGO</Navbar.Brand>
          <Button
            type="button"
            className="login-button"
            id="button-login"
            onClick={() => {
              history.push('/login');
            }}
          >
            <p>Login</p>
            <PersonRoundedIcon />
          </Button>

          <Navbar.Collapse aria-controls="basic-navbar-nav">
            <Nav
              className="ml-auto nav-offline"
              defaultActiveKey="/home"
              as="ul"
              collapseOnSelect
              expand="lg"
            >
              {/* <Nav.Item as="li">
                <Link to="/">Início</Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link to="/sobre">Sobre</Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link to="/consulta">Consulta</Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Link to="/fale-conosco">Fale Conosco</Link>
              </Nav.Item> */}
              <Nav.Item as="li">
                <Nav.Link href="/">Início</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href="/sobre">Sobre</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href="/consulta">Consulta</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" href="/">
                <Nav.Link href="/fale-conosco">Fale Conosco</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      )}
    </Navbar>
  );
};

export default Header;
