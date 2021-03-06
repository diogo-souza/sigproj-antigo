import React, { useRef } from 'react';
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
import { CadastroEventoContext } from '../../../Services/CadastroEventoContext';
import { validateEmpty } from '../../../Hooks/formsValidations';
import { saveProposta } from '../../../Services/proposta';
import { CadastroProjetoContext } from '../../../Services/CadastroProjetoContext';

const CaracterizacaoAcao = ({ from, step, setStep }) => {
  let values;
  let errors;
  let setErrors;
  let handleChanges;
  let handlePropostaBasica;
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
    ({
      values,
      handleChanges,
      errors,
      setErrors,
      handlePropostaBasica,
    } = React.useContext(contexto));
  }
  const history = useHistory();
  const form = useRef();

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    // // console.log(id);
    if (id === 'next') {
      const containError = Object.values(errors).some(
        (error) => error !== null && error !== '',
      );
      // // console.log(errors);
      if (!containError && form.current.checkValidity() === true) {
        setStep(step + 1);
      }
    } else {
      setErrors({});
      setStep(step - 1);
    }
  };
  // console.log(values);
  const handleChange = (e) => {
    handleChanges(e);
    handlePropostaBasica(e);
  };
  const handleBlur = (e) => {
    let error = validateEmpty(e);
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
    <div className="caracterizacao-acao">
      <button type="button" className="return" onClick={handleReturn}>
        <i className="material-icons md-24">keyboard_backspace</i>
        <p>Voltar ao menu</p>
      </button>
      <hr />
      <Container>
        <Row className="justify-content-md-center">
          <Col className="box" lg="6">
            <h3>3. Caracteriza????o da A????o</h3>
            <hr />
            <Form noValidate ref={form}>
              <Form.Row>
                <FormGroup as={Col} md="6" controlId="tipo">
                  <FormLabel>Tipo da A????o</FormLabel>
                  <FormControl
                    required
                    disabled
                    as="select"
                    value={values.tipo}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  >
                    <option value="">Selecione o tipo da a????o</option>
                    <option value="Programa de Extens??o">
                      Programa de Extens??o
                    </option>
                    <option value="Projeto de Extens??o">
                      Projeto de Extens??o
                    </option>
                    <option value="Curso de Extens??o">Curso de Extens??o</option>
                    <option value="Evento de Extens??o">
                      Evento de Extens??o
                    </option>
                    <option disabled>Presta????o de Servi??os de Extens??o</option>
                    <option disabled>Empresa J??nior</option>
                    <option disabled>Liga Acad??mica</option>
                    <option disabled>Pr?? Acad??mico</option>
                  </FormControl>
                  {errors.tipo && <p className="error">{errors.tipo}</p>}
                </FormGroup>
                <FormGroup as={Col} md="6" controlId="area_tematica">
                  <FormLabel>??rea Tem??tica da Extens??o</FormLabel>
                  <FormControl
                    required
                    as="select"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Selecione a ??rea tem??tica</option>
                    <option value="Comunica????o">Comunica????o</option>
                    <option value="Cultura">Cultura</option>
                    <option value="Direitos Humanos e Justi??a">
                      Direitos Humanos e Justi??a
                    </option>
                    <option value="Meio Ambiente">Meio Ambiente</option>
                    <option value="Sa??de">Sa??de</option>
                    <option value="Tecnologia e Produ????o">
                      Tecnologia e Produ????o
                    </option>
                    <option value="Trabalho">Trabalho</option>
                  </FormControl>
                  {errors.area_tematica && (
                    <p className="error">{errors.area_tematica}</p>
                  )}
                </FormGroup>
              </Form.Row>

              <Form.Row>
                <FormGroup as={Col} controlId="movimentacaoFinanceiraExterna">
                  <FormLabel>
                    A a????o prev?? movimenta????o financeira com recursos que n??o
                    s??o da Pr??-Reitoria de Extens??o?
                  </FormLabel>
                  <FormControl
                    required
                    as="select"
                    value={values.movimentacaoFinanceiraExterna}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  >
                    <option value="">Selecione</option>
                    <option disabled value="Sim">
                      Sim
                    </option>
                    <option value="N??o">N??o</option>
                  </FormControl>
                  {errors.movimentacaoFinanceiraExterna && (
                    <p className="error">
                      {errors.movimentacaoFinanceiraExterna}
                    </p>
                  )}
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
                  <p>Pr??ximo passo</p>
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

export default CaracterizacaoAcao;
