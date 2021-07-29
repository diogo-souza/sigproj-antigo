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
import { estados } from '../../../Utils/estados-cidades';
import api from '../../../Services/sigproj/api';

const CaracterizacaoEvento = ({ from, step, setStep }) => {
  const history = useHistory();
  const form = useRef();
  const {
    values,
    handleChanges,
    editandoObjetivo,
    objetivoEspecifico,
    handleObjetivoEspecifico,
    atividade,
    editandoAtividade,
    editAtividade,
    handleAtividade,
    deleteAtividade,
    editObjetivo,
    deleteObjetivo,

    planejamento,
    editandoPlanejamento,
    editPlanejamento,
    handlePlanejamento,
    deletePlanejamento,

    avaliacao,
    editandoAvaliacao,
    editAvaliacao,
    handleAvaliacao,
    deleteAvaliacao,

    errors,
    setErrors,
    propostaBasica,
    propostaGeral,
    handlePropostaGeral,
  } = React.useContext(CadastroEventoContext);
  const [planejamentoEdicao, setPlanejamentoEdicao] = useState([]);
  const [avaliacaoEdicao, setAvaliacaoEdicao] = useState([]);
  // console.log(values);

  const editarPlanejamento = (e) => {
    const plan = values.cronograma.atividades_planejamento.filter(
      (element, index) => e.target.id === index.toString(),
    );
    setPlanejamentoEdicao(plan);
    editPlanejamento(e);
  };

  const editarAvaliacao = (e) => {
    const av = values.cronograma.atividades_avaliacao.filter(
      (element, index) => e.target.id === index.toString(),
    );
    setAvaliacaoEdicao(av);
    editAvaliacao(e);
  };

  const addPlanejamento = async (e) => {
    if (
      planejamento.atividades !== '' &&
      planejamento.data_inicio !== '' &&
      planejamento.data_fim !== '' &&
      planejamento.horas_semanais !== ''
    ) {
      let planejamentosCadastrados;
      let idsPlanejamentosCadastrados;
      const proposta = await api.get(`/propostas/buscar/${values.uuid}`);

      if (proposta.data.evento.cronograma.atividades_planejamento.length) {
        planejamentosCadastrados = proposta.data.evento.cronograma.atividades_planejamento.map(
          (planejamento) => planejamento.atividades,
        );
        idsPlanejamentosCadastrados = proposta.data.evento.cronograma.atividades_planejamento.map(
          (planejamento) => planejamento.id,
        );
      }

      let planejamentoEvento;
      let index = -1;
      if (planejamentosCadastrados && planejamentoEdicao.length) {
        index = planejamentosCadastrados.indexOf(
          planejamentoEdicao[0].atividades,
        );
      }

      if (index !== -1) {
        planejamentoEvento = {
          atividades: planejamento.atividades,
          data_inicio: planejamento.data_inicio,
          data_fim: planejamento.data_fim,
          horas_semanais: planejamento.horas_semanais,
          id: idsPlanejamentosCadastrados[index],
        };
      } else {
        planejamentoEvento = {
          atividades: planejamento.atividades,
          data_inicio: planejamento.data_inicio,
          data_fim: planejamento.data_fim,
          horas_semanais: planejamento.horas_semanais,
        };
      }
      // console.log(planejamentoEvento);

      try {
        const res = await api.put(`propostas/evento/${values.uuid}`, {
          cronograma: {
            atividades_planejamento: [planejamentoEvento],
          },
        });
        setPlanejamentoEdicao([]);
        // console.log(res);
      } catch (e) {
        // console.log(e);
      }

      handleChanges(e);
      saveProposta('proposta-1212', values);
    }
  };

  const addAvaliacao = async (e) => {
    if (
      avaliacao.atividades !== '' &&
      avaliacao.data_inicio !== '' &&
      avaliacao.data_fim !== '' &&
      avaliacao.horas_semanais !== ''
    ) {
      let avaliacoesCadastradas;
      let idsAvaliacoesCadastradas;
      const proposta = await api.get(`/propostas/buscar/${values.uuid}`);

      if (proposta.data.evento.cronograma.atividades_avaliacao.length) {
        avaliacoesCadastradas = proposta.data.evento.cronograma.atividades_avaliacao.map(
          (avaliacao) => avaliacao.atividades,
        );
        idsAvaliacoesCadastradas = proposta.data.evento.cronograma.atividades_avaliacao.map(
          (avaliacao) => avaliacao.id,
        );
      }

      let avaliacaoEvento;
      let index = -1;
      if (avaliacoesCadastradas && avaliacaoEdicao.length) {
        index = avaliacoesCadastradas.indexOf(avaliacaoEdicao[0].atividades);
      }

      if (index !== -1) {
        avaliacaoEvento = {
          atividades: avaliacao.atividades,
          data_inicio: avaliacao.data_inicio,
          data_fim: avaliacao.data_fim,
          horas_semanais: avaliacao.horas_semanais,
          id: idsAvaliacoesCadastradas[index],
        };
      } else {
        avaliacaoEvento = {
          atividades: avaliacao.atividades,
          data_inicio: avaliacao.data_inicio,
          data_fim: avaliacao.data_fim,
          horas_semanais: avaliacao.horas_semanais,
        };
      }

      try {
        const res = await api.put(`propostas/evento/${values.uuid}`, {
          cronograma: {
            atividades_avaliacao: [avaliacaoEvento],
          },
        });
        setAvaliacaoEdicao([]);
        // console.log(res);
      } catch (e) {
        // console.log(e);
      }

      handleChanges(e);
      saveProposta('proposta-1212', values);
    }
  };

  const deletarPlanejamento = async (e) => {
    let planejamentosCadastrados;
    let idsPlanejamentosCadastrados;
    const result = await api.get(`/propostas/buscar/${values.uuid}`);

    if (result.data.evento.cronograma.atividades_planejamento.length) {
      planejamentosCadastrados = result.data.evento.cronograma.atividades_planejamento.map(
        (planejamento) => planejamento.atividades,
      );
      idsPlanejamentosCadastrados = result.data.evento.cronograma.atividades_planejamento.map(
        (planejamento) => planejamento.id,
      );
    }

    let index = -1;
    if (planejamentosCadastrados) {
      index = planejamentosCadastrados.indexOf(
        values.cronograma.atividades_planejamento[e.target.id].atividades,
      );
    }
    if (index !== -1) {
      try {
        const res = await api.put(`propostas/evento/${values.uuid}`, {
          cronograma: {
            remover_atividades_planejamento: [
              idsPlanejamentosCadastrados[index],
            ],
          },
        });
        setPlanejamentoEdicao([]);
        deletePlanejamento(e);
        // console.log(res);
      } catch (e) {
        // console.log(e);
      }
    }
  };

  const deletarAvaliacao = async (e) => {
    let avalicoesCadastradas;
    let idsAvaliacoesCadastradas;
    const result = await api.get(`/propostas/buscar/${values.uuid}`);

    if (result.data.evento.cronograma.atividades_avaliacao.length) {
      avalicoesCadastradas = result.data.evento.cronograma.atividades_avaliacao.map(
        (avaliacao) => avaliacao.atividades,
      );
      idsAvaliacoesCadastradas = result.data.evento.cronograma.atividades_avaliacao.map(
        (avaliacao) => avaliacao.id,
      );
    }

    let index = -1;
    if (avalicoesCadastradas) {
      index = avalicoesCadastradas.indexOf(
        values.cronograma.atividades_avaliacao[e.target.id].atividades,
      );
    }
    if (index !== -1) {
      try {
        const res = await api.put(`propostas/evento/${values.uuid}`, {
          cronograma: {
            remover_atividades_avaliacao: [idsAvaliacoesCadastradas[index]],
          },
        });
        setAvaliacaoEdicao([]);
        deleteAvaliacao(e);
        // console.log(res);
      } catch (e) {
        // console.log(e);
      }
    }
  };

  const atualizarProposta = async () => {
    try {
      const resLocal = await api.put(`propostas/${values.uuid}`, {
        local_estado: values.local_estado,
        cidade: values.cidade,
        bairro: values.bairro,
      });
      // console.log(resLocal);
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
      if (
        !containError &&
        values.objetivosEspecificos.length >= 1 &&
        form.current.checkValidity() === true
      ) {
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

  const renderPlanejamentos = (planejamento, index) => (
    <tr key={index}>
      <td>{planejamento.atividades}</td>
      <td>
        {planejamento.data_inicio} a {planejamento.data_fim}
      </td>
      <td>{planejamento.horas_semanais}</td>
      <td>
        <button
          type="button"
          onClick={editarPlanejamento}
          className="button-nostyle"
          id={index}
        >
          Editar
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={deletarPlanejamento}
          className="button-nostyle"
          id={index}
        >
          Remover
        </button>
      </td>
    </tr>
  );

  const renderAvaliacoes = (avaliacao, index) => (
    <tr key={index}>
      <td>{avaliacao.atividades}</td>
      <td>
        {avaliacao.data_inicio} a {avaliacao.data_fim}
      </td>
      <td>{avaliacao.horas_semanais}</td>
      <td>
        <button
          type="button"
          onClick={editarAvaliacao}
          className="button-nostyle"
          id={index}
        >
          Editar
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={deletarAvaliacao}
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
              Dados Aplicáveis ao Registro de Programas de Extensão sem
              Movimentação Financeira
            </h6>
            <hr />
            <Form ref={form}>
              <h4>Descrição da Ação</h4>
              <br />
              <br />
              <h5>Planejamento e preparação</h5>

              <Form.Row>
                <FormGroup as={Col} controlId="atividades">
                  <FormLabel>Atividade</FormLabel>
                  <FormControl
                    value={planejamento.atividades}
                    onChange={handlePlanejamento}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Apresente as atividades desenvolvidas"
                  />
                  {errors.atividade && <p>Preenchimento obrigatório</p>}
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} md={3} controlId="data_inicio">
                  <FormLabel>Data Inicial</FormLabel>
                  <FormControl
                    type="date"
                    value={planejamento.data_inicio}
                    onChange={handlePlanejamento}
                    onBlur={handleBlur}
                    min="1990-01-01"
                  />
                  {errors.data_inicio && (
                    <p className="error">
                      Preencha a data inicial da atividade
                    </p>
                  )}
                </FormGroup>
                {planejamento.data_inicio && (
                  <FormGroup as={Col} md={3} controlId="data_fim">
                    <FormLabel>Data Final</FormLabel>
                    <FormControl
                      type="date"
                      value={planejamento.data_fim}
                      onChange={handlePlanejamento}
                      onBlur={handleBlur}
                      min={planejamento.data_inicio}
                    />
                    {errors.data_fim && (
                      <p className="error">
                        Preencha a data final da atividade
                      </p>
                    )}
                  </FormGroup>
                )}
                <FormGroup as={Col} md={3} controlId="horas_semanais">
                  <FormLabel>Horas Semanais</FormLabel>
                  <FormControl
                    value={planejamento.horas_semanais}
                    onChange={handlePlanejamento}
                    onBlur={handleBlur}
                    type="number"
                    placeholder="Insira as horas semanais das atividades"
                  />
                  {errors.horas_semanais && (
                    <p className="error">
                      Insira as horas semanais das atividades
                    </p>
                  )}
                </FormGroup>
              </Form.Row>
              {
                // Muda o botão se estiver adicionando ou editando um projeto
                editandoPlanejamento === false ? (
                  <Button id="add-planejamentos" onClick={addPlanejamento}>
                    Adicionar atividade
                  </Button>
                ) : (
                  <Button id="edit-planejamentos" onClick={addPlanejamento}>
                    Editar Planejamentos
                  </Button>
                )
              }
              <Table className="table" responsive striped hover size="sm">
                <thead>
                  <tr>
                    <th>Atividade</th>
                    <th>Intervalo de Datas</th>
                    <th>Horas Semanais</th>
                    <th>Editar</th>
                    <th>Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {values.cronograma.atividades_planejamento &&
                    values.cronograma.atividades_planejamento.map(
                      renderPlanejamentos,
                    )}
                </tbody>
              </Table>

              <hr />
              <h5>Avaliação</h5>

              <Form.Row>
                <FormGroup as={Col} controlId="atividades">
                  <FormLabel>Atividade</FormLabel>
                  <FormControl
                    value={avaliacao.atividades}
                    onChange={handleAvaliacao}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Apresente as atividades desenvolvidas"
                  />
                  {errors.atividades && <p>Preenchimento obrigatório</p>}
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} md={3} controlId="data_inicio">
                  <FormLabel>Data Inicial</FormLabel>
                  <FormControl
                    type="date"
                    value={avaliacao.data_inicio}
                    onChange={handleAvaliacao}
                    onBlur={handleBlur}
                    min="1990-01-01"
                  />
                  {errors.data_inicio && (
                    <p className="error">
                      Preencha a data inicial da atividade
                    </p>
                  )}
                </FormGroup>
                {avaliacao.data_inicio && (
                  <FormGroup as={Col} md={3} controlId="data_fim">
                    <FormLabel>Data Final</FormLabel>
                    <FormControl
                      type="date"
                      value={avaliacao.data_fim}
                      onChange={handleAvaliacao}
                      onBlur={handleBlur}
                      min={avaliacao.data_inicio}
                    />
                    {errors.data_fim && (
                      <p className="error">
                        Preencha a data final da atividade
                      </p>
                    )}
                  </FormGroup>
                )}
                <FormGroup as={Col} md={3} controlId="horas_semanais">
                  <FormLabel>Horas Semanais</FormLabel>
                  <FormControl
                    value={avaliacao.horas_semanais}
                    onChange={handleAvaliacao}
                    onBlur={handleBlur}
                    type="number"
                    placeholder="Insira as horas semanais da atividade"
                  />
                  {errors.horas_semanais && (
                    <p className="error">
                      Preencha as horas semanais da atividade
                    </p>
                  )}
                </FormGroup>
              </Form.Row>
              {
                // Muda o botão se estiver adicionando ou editando um projeto
                editandoAvaliacao === false ? (
                  <Button id="add-avaliacoes" onClick={addAvaliacao}>
                    Adicionar atividade
                  </Button>
                ) : (
                  <Button id="edit-avaliacoes" onClick={addAvaliacao}>
                    Editar atividade
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
                  {values.cronograma.atividades_avaliacao &&
                    values.cronograma.atividades_avaliacao.map(
                      renderAvaliacoes,
                    )}
                </tbody>
              </Table>
              <h5>Local de execução das atividades</h5>
              <Form.Row>
                <FormGroup as={Col} md="4" controlId="local_estado">
                  <FormLabel>Estado</FormLabel>
                  <FormControl
                    required
                    as="select"
                    value={values.local_estado}
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
                <FormGroup as={Col} md="4" controlId="cidade">
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
                <FormGroup as={Col} md="4" controlId="bairro">
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
