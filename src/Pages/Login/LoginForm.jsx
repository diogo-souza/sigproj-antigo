import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import {
  Form,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Col,
  Row,
} from 'react-bootstrap';
import useLoginForm from '../../Hooks/useLoginForm';
import formsValidations2 from '../../Hooks/formsValidations2';
import { UserContext } from '../../Services/UserContext';
import MyVerticallyCenteredModal from '../../Components/Modal/Modal';
import Backdrop from '../../Components/Backdrop/Backdrop';
import googleLogo from '../../Img/google-logo.png';

const LoginForm = () => {
  const { handleChange, values, validated, handleSubmitLogin } = useLoginForm();

  const { errors, validateEmail, validatePassword } = formsValidations2();

  return (
    <div className="LogInForm">
      <Container>
        <div className="box-all">
          <Row className="justify-content-md-center">
            <Col className="boxForm" md="6">
              <div className="titulo">
                <h1>Login</h1>
              </div>
              <Form
                className="loginForm"
                validated={validated}
                onSubmit={handleSubmitLogin}
              >
                <Form.Row>
                  <div className="social-login">
                    <a className="btn btn-block social-btn google" href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect">
                    <img src={googleLogo} alt="Google" /> Logar com Google</a>     
                  </div>             
                </Form.Row>
                <Form.Row>
                  <FormGroup as={Col} controlId="email">
                    <FormLabel>E-mail</FormLabel>
                    <FormControl
                      required
                      type="text"
                      placeholder="Insira seu e-mail"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={validateEmail}
                      isInvalid={
                        errors.email !== '' && errors.email !== undefined
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email && <p>{errors.email}</p>}
                    </Form.Control.Feedback>
                  </FormGroup>
                </Form.Row>
                <Form.Row>
                  <FormGroup as={Col} controlId="senha">
                    <FormLabel>Senha:</FormLabel>
                    <FormControl
                      required
                      type="password"
                      placeholder="Insira sua senha"
                      value={values.senha}
                      onChange={handleChange}
                      onBlur={validatePassword}
                      minLength="6"
                      isInvalid={
                        errors.senha !== '' && errors.senha !== undefined
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.senha && <p>{errors.senha}</p>}
                    </Form.Control.Feedback>
                  </FormGroup>
                </Form.Row>
                <Form.Row>
                  <div className="Esqueceusenha">
                    <a href="/login/recovery-password/">
                      <p>Esqueceu sua senha?</p>
                    </a>
                  </div>
                </Form.Row>				        
                <Form.Row>
                  <Button
                    type="button"
                    className="button button-login"
                    id="button-cadastro"
                    href="/register"
                  >
                    <p>Cadastro</p>
                    <i className="material-icons button-icon">person</i>
                  </Button>
                  <Button
                    className="button button-login"
                    id="button-login"
                    type="submit"
                  >
                    <p>Entrar</p>
                    <i className="material-icons button-icon">person</i>
                  </Button>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default LoginForm;
