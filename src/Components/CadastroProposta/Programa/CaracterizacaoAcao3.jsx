/* eslint-disable no-await-in-loop */
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
  Table,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CadastroProgramaContext } from '../../../Services/CadastroProgramaContext';
import { TooltipsTexts } from '../../../Utils/TooltipsTexts';
import { validateEmpty } from '../../../Hooks/formsValidations';
import { saveProposta } from '../../../Services/proposta';
import api from '../../../Services/sigproj/api';

const CaracterizacaoAcao3 = ({ from, step, setStep }) => {
  const history = useHistory();
  const objEspecificos = useRef(null);
  const tituloAcao = useRef(null);
  const objGeral = useRef(null);
  const projetos = useRef(null);
  const [tituloProjeto, setTituloProjeto] = useState('');
  const [tituloEvento, setTituloEvento] = useState('');
  const [tituloCurso, setTituloCurso] = useState('');
  const [proposta, setProposta] = useState({});
  const {
    values,
    objetivoEspecifico,
    editandoObjetivo,
    handleChanges,
    handleObjetivoEspecifico,
    deleteObjetivo,
    editObjetivo,
    errors,
    setErrors,
    addProjeto,
    addEvento,
    addCurso,
    removeProjeto,
    removeEvento,
    removeCurso,
    editandoProjeto,
    projeto,
    handleProjeto,
    editProjeto,
    deleteProjeto,
  } = React.useContext(CadastroProgramaContext);

  useEffect(() => {
    const fetchProposta = async () => {
      const result = await api.get(`/propostas/buscar/${values.uuid}`);
      setProposta(result.data);
    };
    fetchProposta();
  }, []);
  // console.log(proposta);

  const popover = (id) => (
    <Popover id="popover-positioned-right">
      <Popover.Title as="h3">Dica:</Popover.Title>
      {TooltipsTexts.filter((element) => element.id === id).map((tooltip) => (
        <Popover.Content>{tooltip.text}</Popover.Content>
      ))}
    </Popover>
  );

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    if (id === 'next') {
      const containError = Object.values(errors).some(
        (error) => error !== null && error !== '',
      );
      if (
        !containError &&
        values.objetivosEspecificos.length >= 1 &&
        values.projetosVinculados.length >= 0
      ) {
        setStep(step + 1);
      }
    } else {
      setErrors({});
      setStep(step - 1);
    }
  };

  const handleReturn = () => {
    history.push('/dashboard');
  };

  const addObjetivo = (e) => {
    if (objetivoEspecifico !== '') {
      handleChanges(e);
      saveProposta('proposta-1212', values);
    }
  };

  const deletarObjetivo = async (e) => {
    const { id } = e.currentTarget;
    const objetivo = values.objetivosEspecificos[id];
    // console.log(objetivo);
    if (proposta && proposta.programa.objetivos_especificos.length) {
      const result = proposta.programa.objetivos_especificos.filter(
        (obj) => obj.objetivo_especifico === objetivo.objetivo_especifico,
      );
      // console.log(result);
      if (result.length) {
        try {
          const response = await api.put(`propostas/${from}/${values.uuid}`, {
            remover_objetivos_especificos: [result[0].id],
          });
          // console.log(response);
        } catch (e) {
          // console.log(e);
        }
      }
    }
    deleteObjetivo(id);
  };

  const renderObjetivosEspecificos = (objetivoEspecifico, index) => (
    // console.log(index);
    <tr key={index}>
      <td>{objetivoEspecifico.objetivo_especifico}</td>
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
  const adicionarProjeto = async (e) => {
    if (tituloProjeto !== '') {
      try {
        const res = await api.get(`propostas/buscar?titulo=${tituloProjeto}`);
        if (
          res.data.content.length > 0 &&
          res.data.content[0].modalidade === 'Projeto'
        ) {
          const projetoCompleto = await api.get(
            `propostas/buscar/${res.data.content[0].uuid}`,
          );
          // console.log(projetoCompleto);
          // console.log(res);
          const contains = values.projetosVinculados.filter(
            (e) => e.titulo === res.data.content[0].titulo,
          );
          if (contains.length === 0) {
            // Projeto ainda não foi vinculado
            // TODO Um projeto pode estar vinculado a mais de um programa?
            try {
              const res2 = await api.put(`propostas/programa/${values.uuid}`, {
                projetos_vincular: [res.data.content[0].uuid],
              });
              // console.log(res2);
              addProjeto(res.data.content[0].uuid, res.data.content[0].titulo);
            } catch (error) {
              // console.log(error);
            }
          } else {
            alert('Projeto já vinculado.');
          }
        } else {
          alert('Ação não encontrada ou faz parte de outra modalidade.');
        }
      } catch (error) {
        // console.log(error);
        alert('Erro.');
      }
    } else {
      alert('Insira o título do projeto.');
    }
  };

  const adicionarEvento = async (e) => {
    if (tituloEvento !== '') {
      try {
        const res = await api.get(`propostas/buscar?titulo=${tituloEvento}`);
        // console.log(res);
        if (
          res.data.content.length > 0 &&
          res.data.content[0].modalidade === 'Evento'
        ) {
          const contains = values.eventosVinculados.filter(
            (e) => e.titulo === res.data.content[0].titulo,
          );
          if (contains.length === 0) {
            const ev = await api.get(
              `propostas/buscar/${res.data.content[0].uuid}`,
            );
            // console.log(ev);
            if (ev.data.evento.projeto === null) {
              try {
                const res2 = await api.put(
                  `propostas/programa/${values.uuid}`,
                  {
                    eventos_vincular: [res.data.content[0].uuid],
                  },
                );
                // console.log(res2);
                addEvento(res.data.content[0].uuid, res.data.content[0].titulo);
              } catch (error) {
                // console.log(error);
              }
            } else {
              alert('Evento já vinculado a uma proposta.');
            }
          } else {
            alert('Evento já vinculado.');
          }
        } else {
          alert('Ação não encontrada ou faz parte de outra modalidade.');
        }
      } catch (error) {
        // console.log(error);
        alert('Erro.');
      }
    } else {
      alert('Insira o título do evento.');
    }
  };

  const adicionarCurso = async (e) => {
    if (tituloCurso !== '') {
      try {
        const res = await api.get(`propostas/buscar?titulo=${tituloCurso}`);
        // console.log(res);
        if (
          res.data.content.length > 0 &&
          res.data.content[0].modalidade === 'Curso'
        ) {
          const contains = values.eventosVinculados.filter(
            (e) => e.titulo === res.data.content[0].titulo,
          );
          if (contains.length === 0) {
            const cur = await api.get(
              `propostas/buscar/${res.data.content[0].uuid}`,
            );
            // console.log(cur);
            if (cur.data.curso.projeto === null) {
              try {
                const res2 = await api.put(
                  `propostas/programa/${values.uuid}`,
                  {
                    cursos_vincular: [res.data.content[0].uuid],
                  },
                );
                // console.log(res2);
                addCurso(res.data.content[0].uuid, res.data.content[0].titulo);
              } catch (error) {
                // console.log(error);
              }
            } else {
              alert('Curso   já vinculado a uma proposta.');
            }
          } else {
            alert('Curso já vinculado.');
          }
        } else {
          alert('Ação não encontrada ou faz parte de outra modalidade.');
        }
      } catch (error) {
        // console.log(error);
        alert('Erro.');
      }
    } else {
      alert('Insira o título do curso.');
    }
  };

  const removerProjeto = async (e) => {
    const { id } = e.target;
    const { uuid } = values.projetosVinculados[id];
    try {
      const resPut = await api.put(`propostas/programa/${values.uuid}`, {
        projetos_desvincular: [uuid],
      });
      // console.log(resPut);
      removeProjeto(id);
    } catch (e) {
      // console.log(e);
      alert(`Não foi possível remover o prjeto.`);
    }
  };

  const removerEvento = async (e) => {
    const { id } = e.target;
    const { uuid } = values.eventosVinculados[id];
    // console.log(uuid);
    try {
      const resPut = await api.put(`propostas/programa/${values.uuid}`, {
        eventos_desvincular: [uuid],
      });
      // console.log(resPut);
      removeEvento(id);
    } catch (e) {
      // console.log(e);
      alert(`Não foi possível remover o evento.`);
    }
  };

  const removerCurso = async (e) => {
    const { id } = e.target;
    const { uuid } = values.cursosVinculados[id];
    try {
      const resPut = await api.put(`propostas/programa/${values.uuid}`, {
        cursos_desvincular: [uuid],
      });
      // console.log(resPut);
      removeCurso(id);
    } catch (e) {
      // console.log(e);
      alert(`Não foi possível remover o curso.`);
    }
  };

  const renderProjetos = (projeto, index) => (
    <tr key={index}>
      <td>{projeto.titulo}</td>
      <td>
        <button
          type="button"
          className="button-nostyle"
          id={index}
          onClick={removerProjeto}
        >
          Remover
        </button>
      </td>
    </tr>
  );

  const renderEventos = (evento, index) => (
    <tr key={index}>
      <td>{evento.titulo}</td>
      <td>
        <button
          type="button"
          className="button-nostyle"
          id={index}
          onClick={removerEvento}
        >
          Remover
        </button>
      </td>
    </tr>
  );

  const renderCursos = (curso, index) => (
    <tr key={index}>
      <td>{curso.titulo}</td>
      <td>
        <button
          type="button"
          className="button-nostyle"
          id={index}
          onClick={removerCurso}
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
            <h3>3.2 Caracterização da Ação</h3>
            <h6>
              Dados Aplicáveis ao Registro de Programas de Extensão sem
              Movimentação Financeira
            </h6>
            <hr />
            <Form>
              <Form.Row>
                <FormGroup as={Col} controlId="objetivo-geral-projeto1">
                  <FormLabel>Objetivo Geral do Projeto 1</FormLabel>
                  <FormControl
                    required
                    disabled
                    type="text"
                    value="Objetivo Geral do Projeto 1"
                  />
                </FormGroup>
              </Form.Row>

              <Form.Row>
                <FormGroup as={Col} controlId="objetivo-geral-projeto2">
                  <FormLabel>Objetivo Geral do Projeto 2</FormLabel>
                  <FormControl
                    required
                    disabled
                    type="text"
                    value="Objetivo Geral do Projeto 2"
                  />
                </FormGroup>
              </Form.Row>

              <Form.Row>
                <FormGroup as={Col} controlId="objetivo_especifico">
                  <FormLabel>
                    Outros Objetivos Específicos
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
                    value={objetivoEspecifico.objetivo_especifico}
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
                    <th>Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {values.objetivosEspecificos &&
                    values.objetivosEspecificos.map(renderObjetivosEspecificos)}
                </tbody>
              </Table>

              <hr />
              <div id="projetos_vinculados">
                <FormLabel ref={projetos}>
                  <h5>
                    Projetos Vinculados ao Programa{' '}
                    <OverlayTrigger
                      placement="right"
                      overlay={popover('programasVinculados')}
                      container={tituloAcao.current}
                    >
                      <i className="material-icons">help_outline</i>
                    </OverlayTrigger>
                  </h5>
                </FormLabel>

                <Form.Row>
                  <FormGroup as={Col} md="6" controlId="nomeProjeto">
                    <FormLabel>Nome do Projeto</FormLabel>
                    <FormControl
                      required
                      value={tituloProjeto}
                      onChange={(e) => setTituloProjeto(e.target.value)}
                      type="text"
                      placeholder="Insira o Nome do Projeto"
                    />
                  </FormGroup>
                </Form.Row>

                {
                  // Muda o botão se estiver adicionando ou editando um projeto
                  editandoProjeto === false ? (
                    <Button id="add-projeto" onClick={adicionarProjeto}>
                      Adicionar Projeto
                    </Button>
                  ) : (
                    <Button id="edit-projeto" onClick={addProjeto}>
                      Editar Projeto
                    </Button>
                  )
                }
                <Table className="table" responsive striped hover size="sm">
                  <thead>
                    <tr>
                      <th>Nome do Projeto</th>
                      <th>Remover</th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.projetosVinculados &&
                      values.projetosVinculados.map(renderProjetos)}
                  </tbody>
                </Table>
              </div>

              <hr />
              <div id="eventos_vinculados">
                <Form.Row>
                  <FormGroup as={Col} md="6" controlId="nomeProjeto">
                    <FormLabel>Nome do Evento</FormLabel>
                    <FormControl
                      required
                      value={tituloEvento}
                      onChange={(e) => setTituloEvento(e.target.value)}
                      type="text"
                      placeholder="Insira o Nome do Projeto"
                    />
                  </FormGroup>
                </Form.Row>

                <Button id="add-evento" onClick={adicionarEvento}>
                  Adicionar Evento
                </Button>

                <Table className="table" responsive striped hover size="sm">
                  <thead>
                    <tr>
                      <th>Nome do Evento</th>
                      <th>Remover</th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.eventosVinculados &&
                      values.eventosVinculados.map(renderEventos)}
                  </tbody>
                </Table>
              </div>

              <div id="cursos_vinculados">
                <Form.Row>
                  <FormGroup as={Col} md="6" controlId="nomeCurso">
                    <FormLabel>Nome do Curso</FormLabel>
                    <FormControl
                      required
                      value={tituloCurso}
                      onChange={(e) => setTituloCurso(e.target.value)}
                      type="text"
                      placeholder="Insira o Nome do Curso"
                    />
                  </FormGroup>
                </Form.Row>

                <Button id="add-evento" onClick={adicionarCurso}>
                  Adicionar Curso
                </Button>

                <Table className="table" responsive striped hover size="sm">
                  <thead>
                    <tr>
                      <th>Nome do Curso</th>
                      <th>Remover</th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.cursosVinculados &&
                      values.cursosVinculados.map(renderCursos)}
                  </tbody>
                </Table>
              </div>

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

export default CaracterizacaoAcao3;
