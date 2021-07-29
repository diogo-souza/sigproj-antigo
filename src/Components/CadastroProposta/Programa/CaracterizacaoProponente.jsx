import React, { useRef, useState } from 'react';
import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Button,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CadastroProgramaContext } from '../../../Services/CadastroProgramaContext';
import { CadastroCursoContext } from '../../../Services/CadastroCursoContext';
import {
  validateEmail,
  validateName,
  validateCPF,
  validateEmpty,
} from '../../../Hooks/formsValidations';
import { saveProposta } from '../../../Services/proposta';
import { CadastroEventoContext } from '../../../Services/CadastroEventoContext';
import { CadastroProjetoContext } from '../../../Services/CadastroProjetoContext';

const CaracterizacaoProponente = ({ from, step, setStep }) => {
  let values;
  let errors;
  let setErrors;
  let handleChanges;
  let contexto;

  if (from === 'programa') {
    contexto = CadastroProgramaContext;
  } else if (from === 'curso') {
    contexto = CadastroCursoContext;
  } else if (from === 'evento') {
    contexto = CadastroEventoContext;
  } else if (from === 'projeto') {
    contexto = CadastroProjetoContext;
  }
  if (contexto) {
    ({ values, handleChanges, errors, setErrors } = React.useContext(contexto));
  }

  const [validated, setValidated] = useState(false);
  const history = useHistory();
  const form = useRef();

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    if (id === 'next') {
      const containError = Object.values(errors).some(
        (error) => error !== null && error !== '',
      );
      if (!containError && form.current.checkValidity() === true) {
        setStep(step + 1);
      }
    } else {
      setErrors({});
      setStep(step - 1);
    }
  };

  const handleBlur = (e) => {
    const { id } = e.currentTarget;
    let error;
    if (id === 'email') {
      error = validateEmail(e);
    } else if (id === 'nome') {
      error = validateName(e);
    } else if (id === 'cpf') {
      error = validateCPF(e);
    } else {
      error = validateEmpty(e);
    }

    setErrors({
      ...errors,
      ...error,
    });

    saveProposta('proposta-1212', values);
  };

  const handleReturn = () => {
    history.push('/dashboard');
  };

  return (
    <div className="caracterizacao-proponente">
      <button type="button" className="return" onClick={handleReturn}>
        <i className="material-icons md-24">keyboard_backspace</i>
        <p>Voltar ao menu</p>
      </button>
      <hr />
      <Container>
        <Row className="justify-content-md-center">
          <Col className="box" md="6">
            <h3>2. Caracterização do Proponente</h3>
            <hr />
            <Form noValidate ref={form}>
              <Form.Row>
                <FormGroup as={Col} md="6" controlId="cpf">
                  <FormLabel>CPF Do Proponente</FormLabel>
                  <FormControl
                    required
                    type="text"
                    placeholder="123.456.789-10"
                    maxLength={14}
                    value={values.cpf}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                    disabled
                  />
                  {errors.cpf && <p className="erro">{errors.cpf}</p>}
                </FormGroup>
                <FormGroup as={Col} md="6" controlId="nome">
                  <FormLabel>Nome</FormLabel>
                  <FormControl
                    required
                    type="text"
                    placeholder="Insira seu nome completo"
                    maxLength={100}
                    value={values.nome}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                    disabled
                  />
                  {errors.nome && <p className="erro">{errors.nome}</p>}
                </FormGroup>
              </Form.Row>

              <Form.Row>
                <FormGroup as={Col} md="6" controlId="centro">
                  <FormLabel>Centro</FormLabel>
                  <FormControl
                    required
                    as="select"
                    value={values.centro}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  >
                    <option value="">Selecione o centro</option>
                    <option value="Centro de Informática">
                      Centro de Informática
                    </option>
                  </FormControl>
                  {errors.centro && <p className="erro">{errors.centro}</p>}
                </FormGroup>
                <FormGroup as={Col} md="6" controlId="departamento">
                  <FormLabel>Departamento</FormLabel>
                  <FormControl
                    required
                    as="select"
                    value={values.departamento}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  >
                    <option value="">Selecione o departamento</option>
                    <option value="Departamento de Informática">
                      Departamento de Informática
                    </option>
                  </FormControl>
                  {errors.departamento && (
                    <p className="erro">{errors.departamento}</p>
                  )}
                </FormGroup>
              </Form.Row>

              <Form.Row>
                <FormGroup as={Col} md="6" controlId="cargo">
                  <FormLabel>Cargo</FormLabel>
                  <FormControl
                    required
                    as="select"
                    value={values.cargo}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                    disabled
                  >
                    <option value="">Escolha um Tipo Institucional</option>
                    <option value="Discente Pos-Graduacao">Discente</option>
                    <option value="Docente">Docente</option>
                    <option value="Técnico Administrativo">
                      Técnico Administrativo
                    </option>
                    <option value="Outro">Outro</option>
                  </FormControl>
                  {errors.cargo && <p className="erro">{errors.cargo}</p>}
                </FormGroup>
                <FormGroup as={Col} md="6" controlId="categoria">
                  <FormLabel>Categoria</FormLabel>
                  <FormControl
                    required
                    type="text"
                    placeholder="Insira sua categoria"
                    value={values.categoria}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.categoria && (
                    <p className="erro">{errors.categoria}</p>
                  )}
                </FormGroup>
              </Form.Row>

              <Form.Row>
                <FormGroup as={Col} md="6" controlId="email">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl
                    required
                    type="text"
                    placeholder="Insira seu e-mail"
                    maxLength="100"
                    value={values.email}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.email && <p className="erro">{errors.email}</p>}
                </FormGroup>
                <FormGroup as={Col} md="6" controlId="telefone">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl
                    required
                    type="text"
                    placeholder="(00)0000-0000"
                    value={values.telefone}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.telefone && <p className="erro">{errors.telefone}</p>}
                </FormGroup>
              </Form.Row>

              <Form.Row className="justify-content-md-center">
                <Button
                  id="previous"
                  className="button button-medium"
                  onClick={handleClick}
                >
                  <p>Passo Anterior</p>
                  <i className="material-icons">arrow_left</i>
                </Button>
                <Button
                  id="next"
                  className="button button-medium"
                  onClick={handleClick}
                >
                  <p>Próximo passo</p>
                  <i className="material-icons">arrow_right</i>
                </Button>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CaracterizacaoProponente;
