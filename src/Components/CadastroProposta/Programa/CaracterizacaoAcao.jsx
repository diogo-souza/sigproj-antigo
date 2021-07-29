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
            <h3>3. Caracterização da Ação</h3>
            <hr />
            <Form noValidate ref={form}>
              <Form.Row>
                <FormGroup as={Col} md="6" controlId="tipo">
                  <FormLabel>Tipo da Ação</FormLabel>
                  <FormControl
                    required
                    disabled
                    as="select"
                    value={values.tipo}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  >
                    <option value="">Selecione o tipo da ação</option>
                    <option value="Programa de Extensão">
                      Programa de Extensão
                    </option>
                    <option value="Projeto de Extensão">
                      Projeto de Extensão
                    </option>
                    <option value="Curso de Extensão">Curso de Extensão</option>
                    <option value="Evento de Extensão">
                      Evento de Extensão
                    </option>
                    <option disabled>Prestação de Serviços de Extensão</option>
                    <option disabled>Empresa Júnior</option>
                    <option disabled>Liga Acadêmica</option>
                    <option disabled>Pré Acadêmico</option>
                  </FormControl>
                  {errors.tipo && <p className="error">{errors.tipo}</p>}
                </FormGroup>
                <FormGroup as={Col} md="6" controlId="area_tematica">
                  <FormLabel>Área Temática da Extensão</FormLabel>
                  <FormControl
                    required
                    as="select"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Selecione a área temática</option>
                    <option value="Comunicação">Comunicação</option>
                    <option value="Cultura">Cultura</option>
                    <option value="Direitos Humanos e Justiça">
                      Direitos Humanos e Justiça
                    </option>
                    <option value="Meio Ambiente">Meio Ambiente</option>
                    <option value="Saúde">Saúde</option>
                    <option value="Tecnologia e Produção">
                      Tecnologia e Produção
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
                    A ação prevê movimentação financeira com recursos que não
                    são da Pró-Reitoria de Extensão?
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
                    <option value="Não">Não</option>
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

export default CaracterizacaoAcao;
