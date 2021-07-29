import React, { useRef, useState } from 'react';
import {
  Form,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Col,
  Row,
  Button,
  Table,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { estados } from '../../../Utils/estados-cidades';
import { CadastroCursoContext } from '../../../Services/CadastroCursoContext';
import { validateEmpty } from '../../../Hooks/formsValidations';
import api from '../../../Services/sigproj/api';

const AcaoCurso2 = ({ step, setStep }) => {
  const history = useHistory();
  const form = useRef();

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleChanges,

    planejamento,
    editandoPlanejamento,
    editPlanejamento,
    handlePlanejamento,
    deletePlanejamento,

    execucao,
    editandoExecucao,
    editExecucao,
    handleExecucao,
    deleteExecucao,

    avaliacao,
    editandoAvaliacao,
    editAvaliacao,
    handleAvaliacao,
    deleteAvaliacao,

    propostaBasica,
  } = React.useContext(CadastroCursoContext);

  const [cursos, setCursos] = useState(null);
  let res;
  let resData;

  const [planejamentoEdicao, setPlanejamentoEdicao] = useState([]);
  const [avaliacaoEdicao, setAvaliacaoEdicao] = useState([]);
  const [execucaoEdicao, setExecucaoEdicao] = useState([]);
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

  const editarExecucao = (e) => {
    const exec = values.cronograma.atividades_execucao.filter(
      (element, index) => e.target.id === index.toString(),
    );
    setExecucaoEdicao(exec);
    editExecucao(e);
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

      if (proposta.data.curso.cronograma.atividades_planejamento.length) {
        planejamentosCadastrados = proposta.data.curso.cronograma.atividades_planejamento.map(
          (planejamento) => planejamento.atividades,
        );
        idsPlanejamentosCadastrados = proposta.data.curso.cronograma.atividades_planejamento.map(
          (planejamento) => planejamento.id,
        );
      }

      let planejamentoCurso;
      let index = -1;
      if (planejamentosCadastrados && planejamentoEdicao.length) {
        index = planejamentosCadastrados.indexOf(
          planejamentoEdicao[0].atividades,
        );
      }

      if (index !== -1) {
        planejamentoCurso = {
          atividades: planejamento.atividades,
          data_inicio: planejamento.data_inicio,
          data_fim: planejamento.data_fim,
          horas_semanais: planejamento.horas_semanais,
          id: idsPlanejamentosCadastrados[index],
        };
      } else {
        planejamentoCurso = {
          atividades: planejamento.atividades,
          data_inicio: planejamento.data_inicio,
          data_fim: planejamento.data_fim,
          horas_semanais: planejamento.horas_semanais,
        };
      }
      // console.log(planejamentoCurso);

      try {
        const res = await api.put(`propostas/curso/${values.uuid}`, {
          cronograma: {
            atividades_planejamento: [planejamentoCurso],
          },
        });
        // console.log(res);
      } catch (e) {
        // console.log(e);
      }

      handleChanges(e);
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

      if (proposta.data.curso.cronograma.atividades_avaliacao.length) {
        avaliacoesCadastradas = proposta.data.curso.cronograma.atividades_avaliacao.map(
          (avaliacao) => avaliacao.atividades,
        );
        idsAvaliacoesCadastradas = proposta.data.curso.cronograma.atividades_avaliacao.map(
          (avaliacao) => avaliacao.id,
        );
      }

      let avaliacaoCurso;
      let index = -1;
      if (avaliacoesCadastradas && avaliacaoEdicao.length) {
        index = avaliacoesCadastradas.indexOf(avaliacaoEdicao[0].atividades);
      }

      if (index !== -1) {
        avaliacaoCurso = {
          atividades: avaliacao.atividades,
          data_inicio: avaliacao.data_inicio,
          data_fim: avaliacao.data_fim,
          horas_semanais: avaliacao.horas_semanais,
          id: idsAvaliacoesCadastradas[index],
        };
      } else {
        avaliacaoCurso = {
          atividades: avaliacao.atividades,
          data_inicio: avaliacao.data_inicio,
          data_fim: avaliacao.data_fim,
          horas_semanais: avaliacao.horas_semanais,
        };
      }

      try {
        const res = await api.put(`propostas/curso/${values.uuid}`, {
          cronograma: {
            atividades_avaliacao: [avaliacaoCurso],
          },
        });
        // console.log(res);
      } catch (e) {
        // console.log(e);
      }

      handleChanges(e);
    }
  };

  const addExecucao = async (e) => {
    if (
      execucao.atividades !== '' &&
      execucao.data_inicio !== '' &&
      execucao.data_fim !== '' &&
      execucao.horas_semanais !== ''
    ) {
      let execucoesCadastradas;
      let idsExecucoesCadastradas;
      const proposta = await api.get(`/propostas/buscar/${values.uuid}`);

      if (proposta.data.curso.cronograma.atividades_execucao.length) {
        execucoesCadastradas = proposta.data.curso.cronograma.atividades_execucao.map(
          (execucao) => execucao.atividades,
        );
        idsExecucoesCadastradas = proposta.data.curso.cronograma.atividades_execucao.map(
          (execucao) => execucao.id,
        );
      }

      let execucaoCurso;
      let index = -1;
      if (execucoesCadastradas && execucaoEdicao.length) {
        index = execucoesCadastradas.indexOf(execucaoEdicao[0].atividades);
      }

      if (index !== -1) {
        execucaoCurso = {
          atividades: execucao.atividades,
          data_inicio: execucao.data_inicio,
          data_fim: execucao.data_fim,
          horas_semanais: execucao.horas_semanais,
          id: idsExecucoesCadastradas[index],
        };
      } else {
        execucaoCurso = {
          atividades: execucao.atividades,
          data_inicio: execucao.data_inicio,
          data_fim: execucao.data_fim,
          horas_semanais: execucao.horas_semanais,
        };
      }

      try {
        const res = await api.put(`propostas/curso/${values.uuid}`, {
          cronograma: {
            atividades_execucao: [execucaoCurso],
          },
        });
        // console.log(res);
      } catch (e) {
        // console.log(e);
      }

      handleChanges(e);
    }
  };

  const deletarPlanejamento = async (e) => {
    let planejamentosCadastrados;
    let idsPlanejamentosCadastrados;
    const result = await api.get(`/propostas/buscar/${values.uuid}`);

    if (result.data.curso.cronograma.atividades_planejamento.length) {
      planejamentosCadastrados = result.data.curso.cronograma.atividades_planejamento.map(
        (planejamento) => planejamento.atividades,
      );
      idsPlanejamentosCadastrados = result.data.curso.cronograma.atividades_planejamento.map(
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
        const res = await api.put(`propostas/curso/${values.uuid}`, {
          cronograma: {
            remover_atividades_planejamento: [
              idsPlanejamentosCadastrados[index],
            ],
          },
        });
        deletePlanejamento(e);
        setPlanejamentoEdicao([]);
        // console.log(res);
      } catch (e) {
        // console.log(e);
      }
    }
  };

  const deletarAvaliacao = async (e) => {
    let avaliacoesCadastradas;
    let idsAvaliacoesCadastradas;
    const result = await api.get(`/propostas/buscar/${values.uuid}`);

    if (result.data.curso.cronograma.atividades_avaliacao.length) {
      avaliacoesCadastradas = result.data.curso.cronograma.atividades_avaliacao.map(
        (avaliacao) => avaliacao.atividades,
      );
      idsAvaliacoesCadastradas = result.data.curso.cronograma.atividades_avaliacao.map(
        (avaliacao) => avaliacao.id,
      );
    }

    let index = -1;
    if (avaliacoesCadastradas) {
      index = avaliacoesCadastradas.indexOf(
        values.cronograma.atividades_avaliacao[e.target.id].atividades,
      );
    }
    if (index !== -1) {
      try {
        const res = await api.put(`propostas/curso/${values.uuid}`, {
          cronograma: {
            remover_atividades_avaliacao: [idsAvaliacoesCadastradas[index]],
          },
        });
        deleteAvaliacao(e);
        setAvaliacaoEdicao([]);
        // console.log(res);
      } catch (e) {
        // console.log(e);
      }
    }
  };

  const deletarExecucao = async (e) => {
    let execucoesCadastradas;
    let idsExecucoesCadastradas;
    const result = await api.get(`/propostas/buscar/${values.uuid}`);

    if (result.data.curso.cronograma.atividades_execucao.length) {
      execucoesCadastradas = result.data.curso.cronograma.atividades_execucao.map(
        (execucao) => execucao.atividades,
      );
      idsExecucoesCadastradas = result.data.curso.cronograma.atividades_execucao.map(
        (execucao) => execucao.id,
      );
    }
    // console.log(execucoesCadastradas);
    // console.log(idsExecucoesCadastradas);
    let index = -1;
    if (execucoesCadastradas) {
      index = execucoesCadastradas.indexOf(
        values.cronograma.atividades_execucao[e.target.id].atividades,
      );
    }
    // console.log(index);
    if (index !== -1) {
      try {
        const res = await api.put(`propostas/curso/${values.uuid}`, {
          cronograma: {
            remover_atividades_execucao: [idsExecucoesCadastradas[index]],
          },
        });
        deleteExecucao(e);
        setExecucaoEdicao([]);
        // console.log(res);
      } catch (e) {
        // console.log(e);
      }
    }
  };

  async function cadastroApi() {
    try {
      res = await api.post('/propostas', propostaBasica);
      resData = res.data;
      setCursos(resData.content);
      // console.log(resData);
    } catch (error) {
      // console.log(error);
    }
  }
  // console.log(values.cronograma);
  const atualizarProposta = async () => {
    // const objetivosEspecificos = values.objetivosEspecificos.map(objetivo => (
    //   {objetivo_especifico: objetivo}
    // ))

    try {
      const res = await api.put(`/propostas/curso/${values.uuid}`, {
        referencias_aplicadas: values.referencias_aplicadas,
        conteudo_programatico: 'conteudo programatico',
        // 'aulas': values.cursos,
        // 'objetivos_especificos': objetivosEspecificos
      });
      const resLocal = await api.put(`propostas/${values.uuid}`, {
        local_estado: values.estado,
        cidade: values.cidade,
        bairro: values.bairro,
      });
      // console.log(res);
      setStep(step + 1);
    } catch (error) {
      // console.log(error.response);
      alert(
        `Não foi possível cadastrar a proposta. Erro ${error.response.data.status} - ${error.response.data.titulo}`,
      );
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

  const renderExecucoes = (execucao, index) => (
    <tr key={index}>
      <td>{execucao.atividades}</td>
      <td>
        {execucao.data_inicio} a {execucao.data_fim}
      </td>
      <td>{execucao.horas_semanais}</td>
      <td>
        <button
          type="button"
          onClick={editarExecucao}
          className="button-nostyle"
          id={index}
        >
          Editar
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={deletarExecucao}
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

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    if (id === 'next') {
      // console.log(values);
      const containError = Object.values(errors).some(
        (error) => error !== null && error !== '',
      );
      if (
        !containError &&
        values.referencias_aplicadas !== '' &&
        values.cidade !== '' &&
        values.bairro !== '' &&
        values.estado !== '' &&
        values.cronograma.atividades_planejamento.length >= 1 &&
        values.cronograma.atividades_execucao.length >= 1 &&
        values.cronograma.atividades_avaliacao.length >= 1
      ) {
        atualizarProposta();
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
            <h3>Detalhes da Ação</h3>
            <h6>
              Dados Aplicáveis ao Registro de Ações de Extensão sem Movimentação
              Financeira
            </h6>
            <hr />
            <Form ref={form}>
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

              <h5>Execução</h5>

              <Form.Row>
                <FormGroup as={Col} controlId="atividades">
                  <FormLabel>Atividade</FormLabel>
                  <FormControl
                    value={execucao.atividades}
                    onChange={handleExecucao}
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
                    value={execucao.data_inicio}
                    onChange={handleExecucao}
                    onBlur={handleBlur}
                    min="1990-01-01"
                  />
                  {errors.data_inicio && (
                    <p className="error">
                      Preencha a data inicial da atividade
                    </p>
                  )}
                </FormGroup>
                {execucao.data_inicio && (
                  <FormGroup as={Col} md={3} controlId="data_fim">
                    <FormLabel>Data Final</FormLabel>
                    <FormControl
                      type="date"
                      value={execucao.data_fim}
                      onChange={handleExecucao}
                      onBlur={handleBlur}
                      min={execucao.data_inicio}
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
                    value={execucao.horas_semanais}
                    onChange={handleExecucao}
                    onBlur={handleBlur}
                    type="number"
                    placeholder="Insira as horas semanais das atividades"
                  />
                  {errors.hora_inicio && (
                    <p className="error">
                      Preencha a hora de início da atividade
                    </p>
                  )}
                </FormGroup>
              </Form.Row>
              {
                // Muda o botão se estiver adicionando ou editando um projeto
                editandoExecucao === false ? (
                  <Button id="add-execucoes" onClick={addExecucao}>
                    Adicionar atividade
                  </Button>
                ) : (
                  <Button id="edit-execucoes" onClick={addExecucao}>
                    Editar Execuções
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
                  {values.cronograma.atividades_execucao &&
                    values.cronograma.atividades_execucao.map(renderExecucoes)}
                </tbody>
              </Table>

              <hr />

              <h5>Avaliação</h5>

              <Form.Row>
                <FormGroup as={Col} controlId="atividades">
                  <FormLabel>Atividade</FormLabel>
                  <FormControl
                    value={avaliacao.atividads}
                    onChange={handleAvaliacao}
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
                    placeholder="Insira a hora de início das atividades"
                  />
                  {errors.horas_semanais && (
                    <p className="error">
                      Preencha as horas semanais das atividades
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
                    <th>Horas Semanais</th>
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

              <hr />
              <h5>Referências aplicadas à execução da ação</h5>

              <FormGroup as={Col} controlId="referencias_aplicadas">
                {/* <FormLabel>Início</FormLabel> */}
                <FormControl
                  value={values.referencias_aplicadas}
                  onChange={handleChanges}
                  title="referencias"
                  required
                  as="textarea"
                  onBlur={handleBlur}
                />
                {errors.referencias_aplicadas && (
                  <p>Preenchimento obrigatório</p>
                )}
              </FormGroup>

              <hr />
              <h5>Local de execução das atividades</h5>
              <Form.Row>
                <FormGroup as={Col} md="4" controlId="estado">
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

              <Form.Row>
                <FormGroup as={Col} controlId="endereco">
                  <FormLabel>
                    Se na UFPE, informar o espaço. Se for fora da UFPE, informar
                    o endereço:
                  </FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    value={values.endereco}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.endereco && <p>Preenchimento obrigatório</p>}
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

export default AcaoCurso2;
