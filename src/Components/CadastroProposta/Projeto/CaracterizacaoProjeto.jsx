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
import { CadastroEventoContext } from '../../../Services/CadastroEventoContext';
import { TooltipsTexts } from '../../../Utils/TooltipsTexts';
import { validateEmpty } from '../../../Hooks/formsValidations';
import { saveProposta } from '../../../Services/proposta';
import api from '../../../Services/sigproj/api';
import { CadastroProjetoContext } from '../../../Services/CadastroProjetoContext';

const CaracterizacaoProjeto = ({ from, step, setStep, proposta }) => {
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
  } = React.useContext(CadastroProjetoContext);

  const populateValues = () => {
    const objEspecificos = proposta[from].objetivos_especificos.map((obj) => ({
      atividades: obj.atividades,
      data_fim: obj.data_fim.substring(0, 7),
      data_inicio: obj.data_inicio.substring(0, 7),
      desenvolvimento_atv: obj.desenvolvimento_atv,
      horas_semanais: obj.horas_semanais,
      objetivo_especifico: obj.objetivo_especifico,
    }));

    const membros = proposta.usuarios_proposta.map((membro) => ({
      cpf: membro.usuario.cpf,
      nome: membro.usuario.nome,
      tipo: membro.usuario.tipo_institucional,
      funcao: membro.usuario.funcao,
      email: membro.usuario.email,
      carga_horaria: membro.usuario.carga_horaria,
    }));
    // console.log(membros);
    setValues({
      ...values,
      uuid: proposta.uuid,
      titulo: proposta.titulo,
      subTitulo: proposta.subtitulo,
      objetivoGeral: proposta.objetivo_geral,
      objetivosEspecificos: objEspecificos,
      cidade: proposta.cidade,
      centro: proposta.centro,
      estado: proposta.local_estado,
      bairro: proposta.bairro,
      publico_externo: proposta.publico_externo,
      publico_interno: proposta.publico_interno,
      info_proposta: proposta.info_proposta,
      diretrizes_proposta: proposta.diretrizes_proposta,
      area_tematica: proposta.area_tematica,
      saberesTeoricos: proposta[from].aspectos_teoricos,
      carga_horaria: proposta.carga_horaria,
      usuarios_proposta: membros,
      eventosVinculados: proposta.projeto.eventos,
      cursosVinculados: proposta.projeto.cursos,
    });
  };
  // console.log(proposta);
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

  const addObjetivo = (e) => {
    if (objetivoEspecifico !== '') {
      handleChanges(e);
      saveProposta('proposta-1212', values);
    }
  };

  const atualizarProposta = async (uuid) => {
    try {
      const resProposta = await api.put(`propostas/${uuid}`, {
        objetivo_geral: values.objetivoGeral,
        subtitulo: values.subTitulo,
      });
      // console.log(resProposta);
      setStep(step + 1);
    } catch (error) {
      // console.log(error.response);
      alert(
        `Não foi possível atualizar a proposta. Erro ${error.response.data.status} - ${error.response.data.titulo}`,
      );
    }
  };

  const cadastrarProposta = async () => {
    try {
      const res = await api.post('/propostas', propostaBasica);
      // console.log(res);
      setValues({
        ...values,
        uuid: res.data.uuid,
      });
      // setStep(step + 1);
      atualizarProposta(res.data.uuid);
    } catch (error) {
      // console.log(error.response);
      alert(
        `Não foi possível cadastrar a proposta. Erro ${error.response.data.status} - ${error.response.data.titulo}`,
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
        values.uuid === ''
      ) {
        cadastrarProposta();
      } else {
        atualizarProposta(values.uuid);
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
      <td>{objetivoEspecifico.objetivo_especifico}</td>
      <td>
        <button
          type="button"
          onClick={editObjetivo}
          className="button-nostyle"
          id={index}
        >
          Editar
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={deleteObjetivo}
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
              Dados Aplicáveis ao Registro de Projeto de Extensão sem
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
                    disabled={values.uuid !== ''}
                    value={values.titulo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.titulo && <p>Determine o título da ação</p>}
                </FormGroup>
              </Form.Row>

              <Form.Row>
                <FormGroup as={Col} controlId="subTitulo">
                  <FormLabel>Subtítulo da Ação (Opcional)</FormLabel>
                  <FormControl
                    required
                    type="text"
                    placeholder="Insira o Subtítulo da Ação"
                    value={values.subTitulo}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.subTitulo && <p>Determine o subtítulo da ação</p>}
                </FormGroup>
              </Form.Row>

              <Form.Row>
                <FormGroup as={Col} controlId="objetivoGeral">
                  <FormLabel>
                    Objetivo Geral da Ação
                    <OverlayTrigger
                      placement="right"
                      overlay={popover('objGeral')}
                      container={objGeral.current}
                    >
                      <i className="material-icons">help_outline</i>
                    </OverlayTrigger>
                  </FormLabel>
                  <FormControl
                    required
                    type="text"
                    placeholder="Insira o Objetivo Geral da Ação"
                    value={values.objetivoGeral}
                    onChange={handleChanges}
                    onBlur={handleBlur}
                  />
                  {errors.objetivoGeral && (
                    <p>Determine o objetivo geral da ação</p>
                  )}
                </FormGroup>
              </Form.Row>
              <hr />
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
                    value={objetivoEspecifico.objetivo_especifico}
                    onChange={handleObjetivoEspecifico}
                    type="text"
                    placeholder="Insira o Objetivo Específico"
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

export default CaracterizacaoProjeto;
