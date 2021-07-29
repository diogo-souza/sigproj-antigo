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

const LoginPasswordReset = () => {
  const { handleChange, values, handleSubmitReset } = useLoginForm();
  const {
    errors,
    validatePassword,
    validatePasswordConfirmation,
  } = formsValidations2();

  return (
    <div className="LoginPasswordReset">
      <Container>
        <div className="box-all">
          <Row className="justify-content-md-center">
            <Col className="boxForm" md="6">
              <div className="titulo">
                <h1>Nova senha</h1>
              </div>
              <Form className="loginForm">
                <Form.Row>
                  <FormGroup as={Col} controlId="novaSenha">
                    <FormLabel>Nova senha:</FormLabel>
                    <FormControl
                      required
                      type="password"
                      placeholder="Insira sua senha"
                      value={values.novaSenha}
                      onChange={handleChange}
                      onBlur={validatePassword}
                      minLength="6"
                      isInvalid={
                        errors.novaSenha !== '' &&
                        errors.novaSenha !== undefined
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.novaSenha && <p>{errors.novaSenha}</p>}
                    </Form.Control.Feedback>
                  </FormGroup>
                </Form.Row>
                <Form.Row>
                  <FormGroup as={Col} controlId="confirmarSenha">
                    <FormLabel>Confirme sua senha:</FormLabel>
                    <FormControl
                      required
                      type="password"
                      value={values.confirmarSenha}
                      onChange={handleChange}
                      onBlur={validatePasswordConfirmation}
                      placeholder="Confirme sua senha"
                      minLength="6"
                      isInvalid={
                        errors.confirmarSenha !== '' &&
                        errors.confirmarSenha !== undefined
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmarSenha && <p>{errors.confirmarSenha}</p>}
                    </Form.Control.Feedback>
                  </FormGroup>
                </Form.Row>
                <Form.Row>
                  <Button className="button button-gray" id="button" href="/">
                    <p>Cancelar</p>
                    <i className="material-icons button-icon">person</i>
                  </Button>
                  <Button
                    className="button button-medium"
                    id="button"
                    onClick={handleSubmitReset}
                  >
                    <p>Confirmar</p>
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

export default LoginPasswordReset;
