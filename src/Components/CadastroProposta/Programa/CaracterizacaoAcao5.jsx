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
import { validateEmpty } from '../../../Hooks/formsValidations';
import { saveProposta } from '../../../Services/proposta';
import { CadastroCursoContext } from '../../../Services/CadastroCursoContext';
import { CadastroEventoContext } from '../../../Services/CadastroEventoContext';
import api from '../../../Services/sigproj/api';
import { CadastroProjetoContext } from '../../../Services/CadastroProjetoContext';

const CaracterizacaoAcao5 = ({ from, step, setStep }) => {
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
  const history = useHistory();
  const form = useRef();

  const atualizarProposta = async () => {
    try {
      const res = await api.put(`propostas/${values.uuid}`, {
        diretrizes_proposta: values.diretrizes_proposta,
      });
      const resGet = await api.get(`propostas/buscar/${values.uuid}`);
      // console.log(res);
      // console.log(resGet);
      setStep(step + 1);
    } catch (error) {
      // console.log(error.response);
      alert(
        `Não foi possível atualizar a proposta. Erro ${error.response.data.status} - ${error.response.data.titulo}`,
      );
    }
  };

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    if (id === 'next') {
      const containError = Object.values(errors).some(
        (error) => error !== null && error !== '',
      );
      if (!containError && form.current.checkValidity() === true) {
        atualizarProposta();
      }
    } else {
      setErrors({});
      setStep(step - 1);
    }
  };
  const handleReturn = () => {
    history.push('/dashboard');
  };

  const handleBlur = (e) => {
    let error = validateEmpty(e);
    setErrors({
      ...errors,
      ...error,
    });
    saveProposta('proposta-1212', values);
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
          <Col className="box" lg="12">
            <h3>3.4 Caracterização da Ação</h3>
            <h6>
              Dados Aplicáveis ao Registro de Programas de Extensão sem
              Movimentação Financeira
            </h6>
            <hr />
            <Form noValidate ref={form}>
              <h4>
                Relação entre a proposta e as Diretrizes da Extensão
                Universitária
              </h4>
              <h5>
                <b>Impacto e Transformação Social</b>
              </h5>
              <Form.Row>
                <FormGroup as={Col} controlId="pergunta1">
                  <FormLabel>
                    Quais foram as questões da sociedade (comunidades, outras
                    instituições de ensino, empresas, políticas públicas,
                    situações de força maior) que demandaram pela realização da
                    ação?
                  </FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    value={values.diretrizes_proposta.pergunta1}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.pergunta1 && (
                    <p className="error">Insira uma resposta para a pergunta</p>
                  )}
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} controlId="pergunta2">
                  <FormLabel>
                    Como a ação contribuirá para solucionar essas questões?
                  </FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    value={values.diretrizes_proposta.pergunta2}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.pergunta2 && (
                    <p className="error">Insira uma resposta para a pergunta</p>
                  )}
                </FormGroup>
              </Form.Row>
              <hr />
              <h5>
                <b>Interação dialógica</b>
              </h5>
              <Form.Row>
                <FormGroup as={Col} controlId="pergunta3">
                  <FormLabel>
                    Como se estabelecerá o diálogo entre a comunidade interna e
                    externa (momentos, ações)?
                  </FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    value={values.diretrizes_proposta.pergunta3}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.pergunta3 && (
                    <p className="error">Insira uma resposta para a pergunta</p>
                  )}
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} controlId="pergunta4">
                  <FormLabel>
                    Como se dará a troca de saberes (ouvir, refletir, retornar)?
                  </FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    value={values.diretrizes_proposta.pergunta4}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.pergunta4 && (
                    <p className="error">Insira uma resposta para a pergunta</p>
                  )}
                </FormGroup>
              </Form.Row>
              <hr />
              <h5>
                <b>
                  Impacto na formação do estudante de graduação da equipe de
                  execução
                </b>
              </h5>
              <Form.Row>
                <FormGroup as={Col} controlId="pergunta5">
                  <FormLabel>
                    O que eles têm a aprender sobre sua área de atuação?
                  </FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    value={values.diretrizes_proposta.pergunta5}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.pergunta5 && (
                    <p className="error">Insira uma resposta para a pergunta</p>
                  )}
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} controlId="pergunta6">
                  <FormLabel>
                    O que eles têm a aprender sobre a área de atuação dos
                    colegas de outros cursos?
                  </FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    value={values.diretrizes_proposta.pergunta6}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.pergunta6 && (
                    <p className="error">Insira uma resposta para a pergunta</p>
                  )}
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} controlId="pergunta7">
                  <FormLabel>
                    O que eles têm a aprender sobre o planejamento, organização,
                    execução e avaliação de uma ação de extensão?
                  </FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    value={values.diretrizes_proposta.pergunta7}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.pergunta7 && (
                    <p className="error">Insira uma resposta para a pergunta</p>
                  )}
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} controlId="pergunta8">
                  <FormLabel>
                    O que eles têm a aprender sobre os outros setores da
                    sociedade envolvidos?
                  </FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    value={values.diretrizes_proposta.pergunta8}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.pergunta8 && (
                    <p className="error">Insira uma resposta para a pergunta</p>
                  )}
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} controlId="pergunta9">
                  <FormLabel>
                    O que eles têm a aprender sobre o cenário social, econômico
                    e/ou cultural da sua região?
                  </FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    value={values.diretrizes_proposta.pergunta9}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.pergunta9 && (
                    <p className="error">Insira uma resposta para a pergunta</p>
                  )}
                </FormGroup>
              </Form.Row>
              <hr />
              <h5>
                <b>Interdisciplinaridade e Interprofissionalidade</b>
              </h5>
              <Form.Row>
                <FormGroup as={Col} controlId="pergunta10">
                  <FormLabel>
                    Como as disciplinas e aulas das áreas dos graduandos da
                    equipe de execução dialogarão para o planejamento,
                    organização, execução e/ou avaliação da proposta?
                  </FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    value={values.diretrizes_proposta.pergunta10}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.pergunta10 && (
                    <p className="error">Insira uma resposta para a pergunta</p>
                  )}
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} controlId="pergunta11">
                  <FormLabel>
                    Como as áreas de formação dos envolvidos na equipe de
                    execução (discentes e servidores) dialogarão para o
                    planejamento, organização, execução e/ou avaliação da
                    proposta?
                  </FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    value={values.diretrizes_proposta.pergunta11}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.pergunta11 && (
                    <p className="error">Insira uma resposta para a pergunta</p>
                  )}
                </FormGroup>
              </Form.Row>
              <hr />
              <h5>
                <b>Indissociabilidade entre Ensino-Extensão-Pesquisa</b>
              </h5>
              <Form.Row>
                <FormGroup as={Col} controlId="pergunta12">
                  <FormLabel>
                    Como se dará a relação com as disciplinas e aulas das áreas
                    dos graduandos?
                  </FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    value={values.diretrizes_proposta.pergunta12}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.pergunta12 && (
                    <p className="error">Insira uma resposta para a pergunta</p>
                  )}
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} controlId="pergunta13">
                  <FormLabel>
                    Como as questões vindas da pesquisa serão colocadas no
                    diálogo com os outros setores da sociedade?
                  </FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    value={values.diretrizes_proposta.pergunta13}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.pergunta13 && (
                    <p className="error">Insira uma resposta para a pergunta</p>
                  )}
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} controlId="pergunta14">
                  <FormLabel>
                    Como as questões vindas do diálogo com os outros setores da
                    sociedade serão abordadas pela pesquisa e pelo ensino?
                  </FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    value={values.diretrizes_proposta.pergunta14}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.pergunta14 && (
                    <p className="error">Insira uma resposta para a pergunta</p>
                  )}
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} controlId="pergunta15">
                  <FormLabel>
                    Por que a Extensão é a melhor forma de abordar essa questão
                    trazida pela proposta?
                  </FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    value={values.diretrizes_proposta.pergunta15}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.pergunta15 && (
                    <p className="error">Insira uma resposta para a pergunta</p>
                  )}
                </FormGroup>
              </Form.Row>
            </Form>
            <hr />
            <Row className="justify-content-md-center">
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
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CaracterizacaoAcao5;
