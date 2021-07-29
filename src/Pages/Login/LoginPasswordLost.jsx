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
import { useHistory } from 'react-router-dom';
import useLoginForm from '../../Hooks/useLoginForm';
import formsValidations2 from '../../Hooks/formsValidations2';

const LoginPasswordLost = () => {
  const { handleChange, handleSubmitRecovery, values } = useLoginForm();
  const { errors, validateEmail } = formsValidations2();
  const history = useHistory();

  const handleClick = (e) => {
    const { id } = e.target;
    if (id === 'next') {
      history.push();
    }
    if (id === 'cancel') {
      history.push('/login/');
    }
  };

  return (
    <div className="LoginPasswordLost">
      <Container>
        <div className="box-all">
          <Row className="justify-content-md-center">
            <Col className="boxForm" md="6">
              <div className="titulo">
                <h1>Recuperar Senha</h1>
              </div>
              <Form className="loginPLost">
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
                  <Button
                    className="button button-gray"
                    id="cancel"
                    onClick={handleClick}
                  >
                    <p>Cancelar</p>
                    <i className="material-icons button-icon">close</i>
                  </Button>
                  <Button
                    className="button button-medium"
                    id="next"
                    onClick={handleSubmitRecovery}
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

export default LoginPasswordLost;
