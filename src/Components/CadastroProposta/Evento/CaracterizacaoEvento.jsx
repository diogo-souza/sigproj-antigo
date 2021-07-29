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
  Table,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CadastroEventoContext } from '../../../Services/CadastroEventoContext';
import { TooltipsTexts } from '../../../Utils/TooltipsTexts';
import { validateEmpty } from '../../../Hooks/formsValidations';
import { saveProposta } from '../../../Services/proposta';
import api from '../../../Services/sigproj/api';

const CaracterizacaoEvento = ({ step, setStep }) => {
  const history = useHistory();
  const tituloAcao = useRef(null);
  const objGeral = useRef(null);
  const projetos = useRef(null);
  const objEspecificos = useRef(null);
  const {
    values,
    setValues,
    handleChanges,

    atividade,
    editandoAtividade,
    editAtividade,
    handleAtividade,
    deleteAtividade,

    editandoObjetivo,
    objetivoEspecifico,
    handleObjetivoEspecifico,
    editObjetivo,
    deleteObjetivo,

    errors,
    setErrors,
    evento,
    handleEvento,
    handlePropostaBasica,
    propostaBasica,
    propostaGeral,
    handlePropostaGeral,
  } = React.useContext(CadastroEventoContext);

  const popover = (id) => (
    <Popover id="popover-positioned-right">
      <Popover.Title as="h3">Dica:</Popover.Title>
      {TooltipsTexts.filter((element) => element.id === id).map((tooltip) => (
        <Popover.Content>{tooltip.text}</Popover.Content>
      ))}
    </Popover>
  );

  const [objEspecifico, setObjEspecifico] = useState('');
  const [atividadeEdicao, setAtividadeEdicao] = useState('');

  const editarObjetivo = (e) => {
    // console.log(values);
    const obj = values.objetivosEspecificos.filter(
      (element, index) => e.target.id === index.toString(),
    );
    setObjEspecifico(obj[0]);
    editObjetivo(e);
  };

  const editarAtividade = (e) => {
    const atv = values.atividades.filter(
      (element, index) => e.target.id === index.toString(),
    );
    setAtividadeEdicao(atv[0]);
    editAtividade(e);
  };

  const addObjetivo = async (e) => {
    // console.log('test');
    if (objetivoEspecifico !== '') {
      let objetivosCadastrados;
      let idsObjetivosCadastrados;
      const proposta = await api.get(`/propostas/buscar/${values.uuid}`);
      // // console.log(proposta.data)
      if (proposta.data.evento.objetivos_especificos.length) {
        objetivosCadastrados = proposta.data.evento.objetivos_especificos.map(
          (objetivo) => objetivo.objetivo_especifico,
        );
        idsObjetivosCadastrados = proposta.data.evento.objetivos_especificos.map(
          (objetivo) => objetivo.id,
        );
      }

      let objEspec;
      let index = -1;
      if (objetivosCadastrados && objEspecifico !== '') {
        index = objetivosCadastrados.indexOf(objEspecifico);
      }
      if (index !== -1) {
        objEspec = {
          objetivo_especifico: objetivoEspecifico,
          id: idsObjetivosCadastrados[index],
        };
      } else {
        // console.log(objetivoEspecifico);
        objEspec = {
          objetivo_especifico: objetivoEspecifico,
        };
      }
      try {
        const res = await api.put(`/propostas/evento/${values.uuid}`, {
          objetivos_especificos: [objEspec],
          conteudo_programatico: 'conteudo programatico',
        });
        // console.log(res);
        handleChanges(e);
        setObjEspecifico('');
      } catch (e) {
        // console.log(e);
      }
    }
  };

  const deletarObjetivo = async (e) => {
    let objetivosCadastrados;
    let idsObjetivosCadastrados;
    const proposta = await api.get(`/propostas/buscar/${values.uuid}`);

    if (proposta.data.evento.objetivos_especificos.length) {
      objetivosCadastrados = proposta.data.evento.objetivos_especificos.map(
        (objetivo) => objetivo.objetivo_especifico,
      );
      idsObjetivosCadastrados = proposta.data.evento.objetivos_especificos.map(
        (objetivo) => objetivo.id,
      );
    }
    // console.log(objetivosCadastrados);
    // console.log(idsObjetivosCadastrados);
    let index = -1;

    if (objetivosCadastrados) {
      index = objetivosCadastrados.indexOf(
        values.objetivosEspecificos[e.target.id],
      );
    }
    // console.log(values.objetivosEspecificos[e.target.id]);
    try {
      const proposta = await api.put(`propostas/evento/${values.uuid}`, {
        remover_objetivos_especificos: [idsObjetivosCadastrados[index]],
      });
      // console.log(proposta);
      deleteObjetivo(e);
      setObjEspecifico('');
    } catch (e) {
      // console.log(e);
    }
  };

  const addAtividade = async (e) => {
    if (atividade !== '') {
      let atividadesCadastradas;
      let idsAtividadesCadastradas;
      const proposta = await api.get(`/propostas/buscar/${values.uuid}`);

      if (proposta.data.evento.atividades.length) {
        atividadesCadastradas = proposta.data.evento.atividades.map(
          (atividade) => atividade.atividades,
        );
        idsAtividadesCadastradas = proposta.data.evento.atividades.map(
          (atividade) => atividade.id,
        );
      }

      let atividadesEvento;
      let index = -1;
      if (atividadesCadastradas && atividadeEdicao !== '') {
        index = atividadesCadastradas.indexOf(atividadeEdicao.atividades);
      }

      if (index !== -1) {
        atividadesEvento = {
          atividades: atividade.atividades,
          data_inicio: atividade.data_inicio,
          data_fim: atividade.data_fim,
          hora_inicio: atividade.hora_inicio,
          hora_fim: atividade.hora_fim,
          id: idsAtividadesCadastradas[index],
        };
      } else {
        atividadesEvento = {
          atividades: atividade.atividades,
          data_inicio: atividade.data_inicio,
          data_fim: atividade.data_fim,
          hora_inicio: atividade.hora_inicio,
          hora_fim: atividade.hora_fim,
        };
      }

      try {
        const res = await api.put(`propostas/evento/${values.uuid}`, {
          atividades: [atividadesEvento],
        });
        // console.log(res);
      } catch (e) {
        // console.log(e);
      }

      handleChanges(e);
      saveProposta('proposta-1212', values);
    }
  };

  const deletarAtividade = async (e) => {
    let atividadesCadastradas;
    let idsAtividadesCadastradas;
    const result = await api.get(`/propostas/buscar/${values.uuid}`);

    if (result.data.evento.atividades.length) {
      atividadesCadastradas = result.data.evento.atividades.map(
        (atividade) => atividade.atividades,
      );
      idsAtividadesCadastradas = result.data.evento.atividades.map(
        (atividade) => atividade.id,
      );
    }

    let index = -1;
    // console.log(atividadesCadastradas);
    if (atividadesCadastradas) {
      index = atividadesCadastradas.indexOf(
        values.atividades[e.target.id].atividades,
      );
    }
    // console.log(index);
    if (index !== -1) {
      // console.log(idsAtividadesCadastradas);
      // console.log(atividadesCadastradas[index]);
      try {
        const res = await api.put(`propostas/evento/${values.uuid}`, {
          remover_atividades: [idsAtividadesCadastradas[index]],
        });
        deleteAtividade(e);
        // console.log(res);
      } catch (e) {
        // console.log(e);
      }
    }
  };

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    if (id === 'next') {
      const containError = Object.values(errors).some(
        (error) => error !== null && error !== '',
      );
      if (
        !containError &&
        values.objetivosEspecificos.length >= 1 &&
        values.atividades.length >= 1
      ) {
        setStep(step + 1);
      }
    } else {
      setErrors({});
      setStep(step - 1);
    }
  };

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

  const renderObjetivosEspecificos = (objetivoEspecifico, index) => (
    <tr key={index}>
      <td>{objetivoEspecifico}</td>
      <td>
        <button
          type="button"
          onClick={editarObjetivo}
          className="button-nostyle"
          id={index}
        >
          Editar
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={deletarObjetivo}
          className="button-nostyle"
          id={index}
        >
          Remover
        </button>
      </td>
    </tr>
  );

  const renderAtividades = (atividade, index) => (
    <tr key={index}>
      <td>{atividade.atividades}</td>
      <td>
        {atividade.data_inicio} a {atividade.data_fim}
      </td>
      <td>
        {atividade.hora_inicio} a {atividade.hora_fim}
      </td>
      <td>
        <button
          type="button"
          onClick={editarAtividade}
          className="button-nostyle"
          id={index}
        >
          Editar
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={deletarAtividade}
          className="button-nostyle"
          id={index}
        >
          Remover
        </button>
      </td>
    </tr>
  );

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
            <h3>3.1 Caracterização da Ação</h3>
            <h6>
              Dados Aplicáveis ao Registro de Evento de Extensão sem
              Movimentação Financeira
            </h6>
            <hr />
            <Form>
              <Form.Row>
                <FormGroup as={Col} controlId="objetivo">
                  <FormLabel>
                    Objetivos Específicos
                    <OverlayTrigger
                      placement="right"
                      overlay={popover('objEspecificos')}
                      container={objEspecificos.current}
                    >
                      <i className="material-icons">help_outline</i>
                    </OverlayTrigger>
                  </FormLabel>
                  <FormControl
                    required
                    value={objetivoEspecifico}
                    onChange={handleObjetivoEspecifico}
                    type="text"
                    placeholder="Insira o Objetivo Geral da Ação"
                  />
                </FormGroup>
              </Form.Row>
              {
                // Muda o botão se estiver adicionando ou editando um projeto
                editandoObjetivo === false ? (
                  <Button id="add-objetivo-especifico" onClick={addObjetivo}>
                    Adicionar Objetivo
                  </Button>
                ) : (
                  <Button id="edit-objetivo-especifico" onClick={addObjetivo}>
                    Editar Objetivo
                  </Button>
                )
              }
              <Table className="table" responsive striped hover size="sm">
                <thead>
                  <tr>
                    <th>Objetivo Específico</th>
                    <th>Editar</th>
                    <th>Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {values.objetivosEspecificos &&
                    values.objetivosEspecificos.map(renderObjetivosEspecificos)}
                </tbody>
              </Table>

              <hr />
              <Form.Row>
                <FormGroup as={Col} controlId="atividades">
                  <FormLabel>Atividades</FormLabel>
                  <FormControl
                    required
                    value={atividade.atividades}
                    onChange={handleAtividade}
                    type="text"
                    placeholder="Apresente as atividades desenvolvidas"
                  />
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} md={3} controlId="data_inicio">
                  <FormLabel>Data Inicial</FormLabel>
                  <FormControl
                    required
                    type="date"
                    value={atividade.data_inicio}
                    onChange={handleAtividade}
                    onBlur={handleBlur}
                    min="1990-01-01"
                  />
                  {errors.data_inicio && (
                    <p className="error">
                      Preencha a data inicial da atividade
                    </p>
                  )}
                </FormGroup>
                {atividade.data_inicio && (
                  <FormGroup as={Col} md={3} controlId="data_fim">
                    <FormLabel>Data Final</FormLabel>
                    <FormControl
                      required
                      type="date"
                      value={atividade.data_fim}
                      onChange={handleAtividade}
                      onBlur={handleBlur}
                      min={atividade.data_inicio}
                    />
                    {errors.data_fim && (
                      <p className="error">
                        Preencha a data final da atividade
                      </p>
                    )}
                  </FormGroup>
                )}
                <FormGroup as={Col} md={3} controlId="hora_inicio">
                  <FormLabel>Hora Inicial</FormLabel>
                  <FormControl
                    required
                    value={atividade.hora_inicio}
                    onChange={handleAtividade}
                    onBlur={handleBlur}
                    type="time"
                    placeholder="Insira a hora de início das atividades"
                  />
                  {errors.hora_inicio && (
                    <p className="error">
                      Preencha a hora de início da atividade
                    </p>
                  )}
                </FormGroup>
                <FormGroup as={Col} md={3} controlId="hora_fim">
                  <FormLabel>Hora Final</FormLabel>
                  <FormControl
                    required
                    value={atividade.hora_fim}
                    onChange={handleAtividade}
                    onBlur={handleBlur}
                    type="time"
                    placeholder="Insira a hora de término das atividades"
                  />
                  {errors.hora_fim && (
                    <p className="error">
                      Preencha a hora de término da atividade
                    </p>
                  )}
                </FormGroup>
              </Form.Row>
              {
                // Muda o botão se estiver adicionando ou editando um projeto
                editandoAtividade === false ? (
                  <Button id="add-atividades" onClick={addAtividade}>
                    Adicionar Atividades
                  </Button>
                ) : (
                  <Button id="edit-atividades" onClick={addAtividade}>
                    Editar Atividades
                  </Button>
                )
              }
              <Table className="table" responsive striped hover size="sm">
                <thead>
                  <tr>
                    <th>Atividade</th>
                    <th>Intervalo de Datas</th>
                    <th>Intervalo de Horário</th>
                    <th>Editar</th>
                    <th>Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {values.atividades && values.atividades.map(renderAtividades)}
                </tbody>
              </Table>

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

export default CaracterizacaoEvento;
