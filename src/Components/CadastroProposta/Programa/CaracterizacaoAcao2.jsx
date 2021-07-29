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
import { CadastroProjetoContext } from '../../../Services/CadastroProjetoContext';
import { CadastroEventoContext } from '../../../Services/CadastroEventoContext';
import { CadastroCursoContext } from '../../../Services/CadastroCursoContext';

const CaracterizacaoAcao2 = ({ from, step, setStep, proposta }) => {
  const history = useHistory();
  const tituloAcao = useRef(null);
  const objGeral = useRef(null);

  const [tituloProjeto, setTituloProjeto] = useState('');
  let contexto;
  let values;
  let setValues;
  let handleChanges;
  let errors;
  let setErrors;
  let propostaBasica;
  let handlePropostaBasica;
  let addProjeto;
  if (from === 'programa') {
    contexto = CadastroProgramaContext;
  } else if (from === 'projeto') {
    contexto = CadastroProjetoContext;
  } else if (from === 'evento') {
    contexto = CadastroEventoContext;
  } else if (from === 'curso') {
    contexto = CadastroCursoContext;
  }
  if (contexto) {
    ({
      values,
      setValues,
      handleChanges,
      errors,
      setErrors,
      propostaBasica,
      handlePropostaBasica,
      addProjeto,
    } = React.useContext(contexto));
  }

  const populateValues = () => {
    const membros = proposta.usuarios_proposta.map((membro) => ({
      cpf: membro.usuario.cpf,
      nome: membro.usuario.nome,
      tipo: membro.usuario.tipo_institucional,
      funcao: membro.usuario.funcao,
      email: membro.usuario.email,
      carga_horaria: membro.usuario.carga_horaria,
    }));

    if (from === 'programa') {
      const objEspecificos = proposta[from].objetivos_especificos.map(
        (obj) => ({
          atividades: obj.atividades,
          data_fim: obj.data_fim.substring(0, 7),
          data_inicio: obj.data_inicio.substring(0, 7),
          desenvolvimento_atv: obj.desenvolvimento_atv,
          horas_semanais: obj.horas_semanais,
          objetivo_especifico: obj.objetivo_especifico,
        }),
      );

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
        projetosVinculados: proposta[from].projetos,
        eventosVinculados: proposta[from].eventos,
        cursosVinculados: proposta[from].cursos,
      });
    } else {
      const objEspecificos = proposta[from].objetivos_especificos.map(
        (obj) => obj.objetivo_especifico,
      );
      // console.log(proposta);

      setValues({
        ...values,
        uuid: proposta.uuid,
        titulo: proposta.titulo,
        subTitulo: proposta.subtitulo,
        objetivoGeral: proposta.objetivo_geral,
        objetivosEspecificos: objEspecificos,
        cidade: proposta.cidade,
        centro: proposta.centro,
        local_estado: proposta.local_estado,
        bairro: proposta.bairro,
        publico_externo: proposta.publico_externo,
        publico_interno: proposta.publico_interno,
        info_proposta: proposta.info_proposta,
        diretrizes_proposta: proposta.diretrizes_proposta,
        area_tematica: proposta.area_tematica,
        saberesTeoricos: proposta[from].aspectos_teoricos,
        carga_horaria: proposta.carga_horaria,
        usuarios_proposta: membros,
        atividades: proposta[from].atividades,
        cronograma: proposta[from].cronograma,
      });
    }
  };

  // console.log(values);
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

  const atualizarProposta = async (uuid) => {
    try {
      const res = await api.put(`/propostas/${uuid}`, {
        objetivo_geral: values.objetivoGeral,
        subtitulo: values.subTitulo,
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

  const cadastrarProposta = async () => {
    try {
      const res = await api.post('/propostas', propostaBasica);
      // console.log(res);
      setValues({
        ...values,
        uuid: res.data.uuid,
      });
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
      // console.log(containError);
      if (!containError) {
        // console.log(values);
        if (values.uuid === '') {
          cadastrarProposta();
        } else {
          atualizarProposta(values.uuid);
        }
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

  // console.log(propostaBasica);
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
            <h3>3.1 Caracterização da Ação</h3>
            <h6>
              Dados Aplicáveis ao Registro de Programas de Extensão sem
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
                    disabled={values.uuid !== ''}
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

export default CaracterizacaoAcao2;
