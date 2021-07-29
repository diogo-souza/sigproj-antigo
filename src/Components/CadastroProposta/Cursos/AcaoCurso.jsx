import React, { useState, useRef, useEffect } from 'react';
import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Button,
  Table,
  Popover,
  OverlayTrigger,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../../Services/sigproj/api';
import { CadastroCursoContext } from '../../../Services/CadastroCursoContext';
import { TooltipsTexts } from '../../../Utils/TooltipsTexts';
import { validateEmpty } from '../../../Hooks/formsValidations';

const AcaoCurso = ({ step, setStep, from }) => {
  const history = useHistory();
  const tituloAcao = useRef(null);
  const objEspecificos = useRef(null);

  const {
    values,
    setValues,

    errors,
    setErrors,

    curso,
    editandoCurso,

    handleChanges,

    editCurso,
    handleCurso,
    deleteCurso,

    propostaBasica,
    handlePropostaBasica,

    editObjetivo,
    objetivo_especifico,
    handleObjetivoEspecifico,
    editandoObjetivo,
    deleteObjetivo,
  } = React.useContext(CadastroCursoContext);
  const [disabled, setDisabled] = useState(false);

  const popover = (id) => (
    <Popover id="popover-positioned-right">
      <Popover.Title as="h3">Dica:</Popover.Title>
      {TooltipsTexts.filter((element) => element.id === id).map((tooltip) => (
        <Popover.Content>{tooltip.text}</Popover.Content>
      ))}
    </Popover>
  );

  const [cursos, setCursos] = useState(null);

  const handleChange = (e) => {
    handleChanges(e);
    handlePropostaBasica(e);
  };

  const cadastrarProposta = async () => {
    try {
      const res = await api.post('/propostas', propostaBasica);
      // console.log(res);
      setValues({
        ...values,
        uuid: res.data.uuid,
      });
      setStep(step + 1);
    } catch (error) {
      // // console.log(error.response);
      alert(
        `Não foi possível cadastrar a proposta. Erro ${error.response.data.status} - ${error.response.data.titulo}`,
      );
    }
  };

  useEffect(() => {
    setCursos();
  }, []);

  const handleBlur = (e) => {
    let error = validateEmpty(e);
    setErrors({
      ...errors,
      ...error,
    });
  };

  const handleReturn = () => {
    history.push('/dashboard');
  };

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    if (id === 'next') {
      const containError = Object.values(errors).some(
        (error) => error !== null && error !== '',
      );
      if (!containError && values.uuid === '') {
        cadastrarProposta();
      } else if (values.uuid !== '' && !containError) {
        setStep(step + 1);
      }
    } else {
      setErrors({});
      setStep(step - 1);
    }
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
            <h3>Caracterização da Ação</h3>
            <h6>
              Dados Aplicáveis ao Registro de Cursos de Extensão sem
              Movimentação Financeira
            </h6>
            <hr />
            <Form>
              <Form.Row>
                <FormGroup as={Col} controlId="titulo">
                  <FormLabel ref={tituloAcao}>
                    Título da Ação
                    <OverlayTrigger
                      placement="right"
                      overlay={popover('tituloAcao')}
                      container={tituloAcao.current}
                    >
                      <i className="material-icons">help_outline</i>
                    </OverlayTrigger>
                  </FormLabel>
                  <FormControl
                    required
                    type="text"
                    placeholder="Insira o Título da Ação"
                    value={values.titulo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.uuid !== ''}
                  />
                  {errors.titulo && <p>Preenchimento obrigatório</p>}
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

export default AcaoCurso;
