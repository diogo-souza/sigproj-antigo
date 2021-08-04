import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';

import Backdrop from '../Components/Backdrop/Backdrop';
import { UserStorage } from '../Services/UserContext';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Home from '../Pages/Home/Home';
import Contato from '../Pages/Contato/Contato';
import About from '../Pages/About/About';
import Register from '../Pages/Register/Register';
import PageNotFound from '../Pages/PageNotFound/PageNotFound';
import Account from '../Pages/Account/Account';
import ConsultaOpcao from '../Pages/Consulta/ConsultaOpcao';
import ConsultaAcao from '../Pages/Consulta/ConsultaAcao';
import ConsultaEdital from '../Pages/Consulta/ConsultaEdital';
import ConsultaResultado from '../Pages/Consulta/ConsultaResultado';
import ConsultaResultadoEdital from '../Pages/Consulta/ConsultaResultadoEdital';
import ResumoProposta from '../Pages/Proposta/ResumoProposta';
import ResumoEdital from '../Pages/Edital/ResumoEdital';
import LoginForm from '../Pages/Login/LoginForm';
import LoginPasswordLost from '../Pages/Login/LoginPasswordLost';
import LoginPasswordReset from '../Pages/Login/LoginPasswordReset';
import Dashboard from '../Pages/Dashboard/Dashboard';
import { isAuthenticated } from '../Services/auth';
import CadastroProposta from '../Pages/CadastroProposta/CadastroProposta';
import CadastroEdital from '../Pages/CadastroEdital/CadastroEdital';
import VisualizarEdital from '../Components/VisualizarEdital';
import Sidebar from '../Components/Sidebar/Sidebar';
import MyVerticallyCenteredModal from '../Components/Modal/Modal';
import OAuth2RedirectHandler from '../Pages/Oauth2/OAuth2RedirectHandler';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <UserStorage>
      <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <Backdrop />
              <MyVerticallyCenteredModal />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                  exact
                  path="/cadastro-proposta/:uuid?"
                  component={CadastroProposta}
                />
                <PrivateRoute
                  exact
                  path="/cadastro-edital"
                  component={CadastroEdital}
                />
                <PrivateRoute
                  exact
                  path="/visualizar-edital/:id"
                  component={VisualizarEdital}
                />
                <Route
                  path="/propostas/buscar/:url"
                  component={ResumoProposta}
                />
                <Route path="/editais/:url" component={ResumoEdital} />
                <PrivateRoute exact path="/perfil" component={Account} />
                <Route exact path="/" component={Home} />
                <Route exact path="/contato" component={Contato} />
                <Route exact path="/sobre" component={About} />
                <Route exact path="/login" component={LoginForm} />
		            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
                <Route
                  exact
                  path="/login/recovery-password"
                  component={LoginPasswordLost}
                />
                <Route
                  exact
                  path="/recovery-token/*"
                  component={LoginPasswordReset}
                />
                <Route exact path="/register" component={Register} />
                <Route exact path="/consulta" component={ConsultaOpcao} />
                <Route exact path="/consulta-acao" component={ConsultaAcao} />
                <Route
                  exact
                  path="/consulta-edital"
                  component={ConsultaEdital}
                />
                <Route path="/propostas/:url" component={ConsultaResultado} />
                <Route path="/lista-editais/:url" component={ConsultaResultadoEdital} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </UserStorage>
  </BrowserRouter>
);

export default Routes;
