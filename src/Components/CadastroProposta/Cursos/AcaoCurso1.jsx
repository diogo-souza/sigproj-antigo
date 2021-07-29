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

const AcaoCurso1 = ({ step, setStep, from, proposta }) => {
  const history = useHistory();
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
  // console.log(values);
  // console.log(proposta);
  const populateValues = () => {
    const membros = proposta.usuarios_proposta.map((membro) => ({
      cpf: membro.usuario.cpf,
      nome: membro.usuario.nome,
      tipo: membro.usuario.tipo_institucional,
      funcao: membro.usuario.funcao,
      email: membro.usuario.email,
      carga_horaria: membro.usuario.carga_horaria,
    }));

    const objEspecificos = proposta[from].objetivos_especificos.map(
      (obj) => obj.objetivo_especifico,
    );
    // console.log(proposta);

    setValues({
      ...values,
      uuid: proposta.uuid,
      titulo: proposta.titulo,
      subtitulo: proposta.subtitulo,
      objetivoGeral: proposta.objetivo_geral,
      objetivos_especificos: objEspecificos,
      cidade: proposta.cidade,
      centro: proposta.centro,
      estado: proposta.local_estado,
      bairro: proposta.bairro,
      publico_externo: proposta.publico_externo,
      publico_interno: proposta.publico_interno,
      info_proposta: proposta.info_proposta,
      diretrizes_proposta: proposta.diretrizes_proposta,
      area_tematica: proposta.area_tematica,
      carga_horaria: proposta.carga_horaria,
      usuarios_proposta: membros,
      cronograma: proposta[from].cronograma,
      ementa: proposta[from].ementa,
      aulas: proposta[from].aulas,
      referencias_aplicadas: proposta[from].referencias_aplicadas,
      // Endereço??
    });
  };

  useEffect(() => {
    if (proposta) {
      populateValues();
    }
  }, []);

  const popover = (id) => (
    <Popover id="popover-positioned-right">
      <Popover.Title as="h3">Dica:</Popover.Title>
      {TooltipsTexts.filter((element) => element.id === id).map((tooltip) => (
        <Popover.Content>{tooltip.text}</Popover.Content>
      ))}
    </Popover>
  );

  const handleChange = (e) => {
    handleChanges(e);
    handlePropostaBasica(e);
  };

  // Objetivos específicos

  const [objEspecifico, setObjEspecifico] = useState('');

  const editarObjetivo = (e) => {
    const obj = values.objetivos_especificos.filter(
      (element, index) => e.target.id === index.toString(),
    );
    setObjEspecifico(obj[0]);
    editObjetivo(e);
  };

  const addObjetivo = async (e) => {
    if (objetivo_especifico !== '') {
      let objetivosCadastrados;
      let idsObjetivosCadastrados;
      const proposta = await api.get(`/propostas/buscar/${values.uuid}`);
      // console.log(proposta.data);
      if (proposta.data.curso.objetivos_especificos.length) {
        objetivosCadastrados = proposta.data.curso.objetivos_especificos.map(
          (objetivo) => objetivo.objetivo_especifico,
        );
        idsObjetivosCadastrados = proposta.data.curso.objetivos_especificos.map(
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
          objetivo_especifico,
          id: idsObjetivosCadastrados[index],
        };
      } else {
        objEspec = {
          objetivo_especifico,
        };
      }
      try {
        const res = await api.put(`/propostas/curso/${values.uuid}`, {
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

    if (proposta.data.curso.objetivos_especificos.length) {
      objetivosCadastrados = proposta.data.curso.objetivos_especificos.map(
        (objetivo) => objetivo.objetivo_especifico,
      );
      idsObjetivosCadastrados = proposta.data.curso.objetivos_especificos.map(
        (objetivo) => objetivo.id,
      );
    }

    let index = -1;

    if (objetivosCadastrados) {
      index = objetivosCadastrados.indexOf(
        values.objetivos_especificos[e.target.id],
      );
    }

    try {
      const proposta = await api.put(`propostas/curso/${values.uuid}`, {
        remover_objetivos_especificos: [idsObjetivosCadastrados[index]],
      });
      // console.log(proposta);
      deleteObjetivo(e);
      setObjEspecifico('');
    } catch (e) {
      // console.log(e);
    }
  };

  // Conteúdo Programático

  const [conteudos, setConteudos] = useState('');
  // const [cursos, setCursos] = useState(null);

  const editarConteudo = (e) => {
    const curso = values.aulas.filter(
      (element, index) => e.target.id === index.toString(),
    );
    setConteudos(curso);
    editCurso(e);
  };

  const addCurso = async (e) => {
    if (curso.aula !== '' && curso.conteudo !== '') {
      let cursosCadastrados;
      let idsCursosCadastrados;
      const proposta = await api.get(`/propostas/buscar/${values.uuid}`);

      if (proposta.data.curso.aulas.length) {
        cursosCadastrados = proposta.data.curso.aulas.map(
          (aula) => aula.titulo,
        );
        idsCursosCadastrados = proposta.data.curso.aulas.map((aula) => aula.id);
      }

      let aula_curso;
      let index = -1;
      if (cursosCadastrados && conteudos.length) {
        index = cursosCadastrados.indexOf(conteudos[0].titulo);
      }
      if (index !== -1) {
        aula_curso = {
          titulo: curso.titulo,
          conteudo: curso.conteudo,
          id: idsCursosCadastrados[index],
        };
      } else {
        aula_curso = {
          titulo: curso.titulo,
          conteudo: curso.conteudo,
        };
      }
      try {
        const res = await api.put(`/propostas/curso/${values.uuid}`, {
          aulas: [aula_curso],
        });
        handleChanges(e);
        setConteudos('');
        // console.log(res);
      } catch (e) {
        // console.log(e);
      }
    }
  };

  const deletarCurso = async (e) => {
    let cursosCadastrados;
    let idsCursosCadastrados;
    const proposta = await api.get(`/propostas/buscar/${values.uuid}`);
    // console.log(proposta.data);
    // console.log(proposta.data.curso.aulas.length);
    if (proposta.data.curso.aulas.length) {
      cursosCadastrados = proposta.data.curso.aulas.map((aula) => aula.titulo);
      idsCursosCadastrados = proposta.data.curso.aulas.map((aula) => aula.id);
    }

    // console.log(idsCursosCadastrados);

    let index = -1;

    if (cursosCadastrados) {
      index = cursosCadastrados.indexOf(values.aulas[e.target.id].titulo);
    }
    if (index !== -1) {
      try {
        const proposta = await api.put(`propostas/curso/${values.uuid}`, {
          remover_aulas: [idsCursosCadastrados[index]],
        });

        deleteCurso(e);
        setConteudos('');
        // console.log(proposta);
      } catch (e) {
        // console.log(e);
        // console.log(proposta);
      }
    }
  };

  const atualizarProposta = async () => {
    try {
      const res = await api.put(`/propostas/curso/${values.uuid}`, {
        ementa: values.ementa,
      });
      const res1 = await api.put(`/propostas/${values.uuid}`, {
        objetivo_geral: values.objetivoGeral,
        subtitulo: values.subtitulo,
      });
      // console.log(res);
      // console.log(res1);
      setStep(step + 1);
    } catch (error) {
      // console.log(error.response);
      alert(
        `Não foi possível cadastrar a proposta. Erro ${error.response.data.status} - ${error.response.data.titulo}`,
      );
      // console.log(values.ementa);
    }
  };

  // useEffect(() => {
  //   setCursos();
  // }, []);

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

  const renderCursos = (curso, index) => (
    <tr key={index}>
      <td>{curso.titulo}</td>
      <td>{curso.conteudo}</td>
      <td>
        <button
          type="button"
          className="button-nostyle"
          id={index}
          onClick={editarConteudo}
        >
          Editar
        </button>
      </td>
      <td>
        <button
          type="button"
          className="button-nostyle"
          id={index}
          onClick={deletarCurso}
        >
          Remover
        </button>
      </td>
    </tr>
  );

  const renderObjetivosEspecificos = (objetivo_especifico, index) => (
    <tr key={index}>
      <td>{objetivo_especifico}</td>
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

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    if (id === 'next') {
      const containError = Object.values(errors).some(
        (error) => error !== null && error !== '',
      );
      if (!containError && values.aulas.length >= 1) {
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
            <h3>Caracterização da Ação</h3>
            <h6>
              Dados Aplicáveis ao Registro de Cursos de Extensão sem
              Movimentação Financeira
            </h6>
            <hr />
            <Form>
              <Form.Row>
                <FormGroup as={Col} controlId="subtitulo">
                  <FormLabel>Subtítulo da Ação (Opcional)</FormLabel>
                  <FormControl
                    type="text"
                    placeholder="Insira o Subtítulo da Ação"
                    value={values.subtitulo}
                    onChange={handleChanges}
                  />
                </FormGroup>
              </Form.Row>

              <hr />
              <h5>Apresentação do curso</h5>
              <Form.Row>
                <FormGroup as={Col} controlId="ementa" id="ementa">
                  <FormLabel>Ementa</FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    placeholder="Insira a Ementa do Curso"
                    value={values.ementa}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.ementa && <p>Preenchimento obrigatório</p>}
                </FormGroup>
              </Form.Row>

              <Form.Row>
                <FormGroup as={Col} controlId="objetivoGeral">
                  <FormLabel>Objetivo Geral</FormLabel>
                  <FormControl
                    required
                    as="textarea"
                    placeholder="Insira o Objetivo Geral do Curso"
                    value={values.objetivoGeral}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.objetivoGeral && <p>Preenchimento obrigatório</p>}
                </FormGroup>
              </Form.Row>

              <Form.Row>
                <FormGroup as={Col} controlId="objetivo_especifico">
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
                    value={objetivo_especifico}
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
                  {values.objetivos_especificos &&
                    values.objetivos_especificos.map(
                      renderObjetivosEspecificos,
                    )}
                </tbody>
              </Table>

              <hr />

              <div id="conteudo-programatico">
                <FormLabel>
                  <h5>Conteúdo programático</h5>
                </FormLabel>

                <Form.Row>
                  <FormGroup as={Col} md="3" controlId="titulo">
                    <FormLabel>Aula</FormLabel>
                    <FormControl
                      required
                      type="textarea"
                      placeholder="Insira o número da Aula"
                      value={curso.titulo}
                      onChange={handleCurso}
                      onBlur={handleBlur}
                    />
                    {errors.aula && <p>Preenchimento obrigatório</p>}
                  </FormGroup>

                  <FormGroup as={Col} md="9" controlId="conteudo">
                    <FormLabel>Conteúdo</FormLabel>
                    <FormControl
                      required
                      as="textarea"
                      placeholder="Insira o conteúdo da aula"
                      value={curso.conteudo}
                      onChange={handleCurso}
                      onBlur={handleBlur}
                    />
                    {errors.conteudo && <p>Preenchimento obrigatório</p>}
                  </FormGroup>
                </Form.Row>
                {
                  // Muda o botão se estiver adicionando ou editando um curso
                  editandoCurso === false ? (
                    <Button id="add-curso" onClick={addCurso}>
                      Adicionar Curso
                    </Button>
                  ) : (
                    <Button id="edit-curso" onClick={addCurso}>
                      Editar Curso
                    </Button>
                  )
                }
                <Table className="table" responsive striped hover size="sm">
                  <thead>
                    <tr>
                      <th>Aulas</th>
                      <th>Conteúdo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.aulas && values.aulas.map(renderCursos)}
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

export default AcaoCurso1;
