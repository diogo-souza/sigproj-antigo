import React, { useEffect, useRef, useState } from 'react';
import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Button,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { estados } from '../../../Utils/estados-cidades';
import { CadastroProgramaContext } from '../../../Services/CadastroProgramaContext';
import { TooltipsTexts } from '../../../Utils/TooltipsTexts';
import { validateEmpty } from '../../../Hooks/formsValidations';
import { saveProposta } from '../../../Services/proposta';
import { CadastroProjetoContext } from '../../../Services/CadastroProjetoContext';
import api from '../../../Services/sigproj/api';

const CaracterizacaoAcao6 = ({ from, step, setStep }) => {
  const history = useHistory();
  const saberesTeoricos = useRef(null);
  let values;
  let handleChanges;
  let errors;
  let setErrors;
  let contexto;
  let setValues;
  if (from === 'programa') {
    contexto = CadastroProgramaContext;
  } else if (from === 'projeto') {
    contexto = CadastroProjetoContext;
  }

  if (contexto) {
    ({ values, handleChanges, errors, setErrors, setValues } = React.useContext(
      contexto,
    ));
  }

  useEffect(() => {
    api
      .get(`propostas/buscar/${values.uuid}`)
      .then((res) => {
        // console.log(res);
        setValues({
          ...values,
          carga_horaria: res.data.carga_horaria,
        });
      })
      .catch((err) => alert(err));
  }, []);
  const popover = (id) => (
    <Popover id="popover-positioned-right">
      <Popover.Title as="h3">Dica:</Popover.Title>
      {TooltipsTexts.filter((element) => element.id === id).map((tooltip) => (
        <Popover.Content>{tooltip.text}</Popover.Content>
      ))}
    </Popover>
  );

  const form = useRef();

  const atualizarProposta = async () => {
    try {
      const response = await api.put(`propostas/${values.uuid}`, {
        local_estado: values.estado,
        cidade: values.cidade,
        bairro: values.bairro,
      });
      // console.log(typeof values.saberesTeoricos);
      const response2 = await api.put(`propostas/${from}/${values.uuid}`, {
        aspectos_teoricos: values.saberesTeoricos,
      });

      // console.log(response2);
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
          <Col className="box" lg="12">
            <h3>3.5 Caracterização da Ação</h3>
            <h6>
              Dados Aplicáveis ao Registro de Programas de Extensão sem
              Movimentação Financeira
            </h6>
            <hr />
            <Form noValidate ref={form}>
              <Form.Row>
                <FormGroup as={Col} controlId="saberesTeoricos">
                  <FormLabel ref={saberesTeoricos}>
                    Relações entre os saberes teóricos da área com os saberes
                    teóricos da Extensão Universitária.
                    <OverlayTrigger
                      placement="right"
                      overlay={popover('objEspecificos')}
                      container={saberesTeoricos.current}
                    >
                      <i className="material-icons">help_outline</i>
                    </OverlayTrigger>
                  </FormLabel>
                  <FormControl
                    required
                    type="text"
                    value={values.saberesTeoricos}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.saberesTeoricos && <p>{errors.saberesTeoricos}</p>}
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} md="3" controlId="periodoExecucao">
                  <FormLabel>Período de execução da proposta</FormLabel>
                  <FormControl
                    required
                    type="text"
                    value={values.periodoExecucao}
                    onChange={handleChanges}
                    readOnly
                  />
                </FormGroup>
                <FormGroup as={Col} md="3" controlId="carga_horaria">
                  <FormLabel>Carga horária total da proposta:</FormLabel>
                  <FormControl
                    required
                    type="text"
                    value={values.carga_horaria}
                    onChange={handleChanges}
                    readOnly
                  />
                </FormGroup>
                <FormGroup as={Col} md="2" controlId="estado">
                  <FormLabel>Estado</FormLabel>
                  <FormControl
                    required
                    as="select"
                    value={values.estado}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  >
                    <option value="">Selecione um Estado</option>
                    {/* Insere todos os estados nas opções */}
                    {estados.map((estado) => (
                      <option key={estado.sigla} value={estado.sigla}>
                        {estado.nome}
                      </option>
                    ))}
                  </FormControl>
                  {errors.estado && (
                    <p>Determine o Estado em que a ação será realizada</p>
                  )}
                </FormGroup>
                <FormGroup as={Col} md="2" controlId="cidade">
                  <FormLabel>Cidade</FormLabel>
                  <FormControl
                    required
                    type="text"
                    value={values.cidade}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.cidade && (
                    <p>Determine a cidade em que a ação será realizada</p>
                  )}
                </FormGroup>
                <FormGroup as={Col} md="2" controlId="bairro">
                  <FormLabel>Bairro</FormLabel>
                  <FormControl
                    required
                    type="text"
                    value={values.bairro}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.bairro && (
                    <p>Determine o bairro em que a ação será realizada</p>
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

export default CaracterizacaoAcao6;
