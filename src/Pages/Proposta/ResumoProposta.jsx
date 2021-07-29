import React, { useRef, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import {
  Form,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Col,
  Row,
  Button,
  Tabs,
  Tab,
  Badge,
} from 'react-bootstrap';
import InputText from '../../Components/Forms/InputText';
import InputNumber from '../../Components/Forms/InputNumber';
import InputSelect from '../../Components/Forms/InputSelect';

import { UserContext } from '../../Services/UserContext';
import CursoContext from '../../Hooks/useCadastroCurso';
import api from '../../Services/sigproj/api';

const ResumoProposta = ({ from }) => {
  const history = useHistory();
  const { userSession } = useContext(UserContext);
  const propostaUuid = JSON.parse(localStorage.getItem('prospostaResumo'));
  // console.log(propostaUuid);
  let qualMod;
  let campoAberto = true;
  const perguntas = [
    'Quais foram as questões da sociedade (comunidades, outras instituições de ensino, empresas, políticas públicas, situações de força maior) que demandaram pela realização da ação?',
    'Como a ação contribuirá para solucionar essas questões?',
    'Como se estabelecerá o diálogo entre a comunidade interna e externa (momentos, ações)?',
    'Como se dará a troca de saberes (ouvir, refletir, retornar)?',
    'O que eles têm a aprender sobre sua área de atuação?',
    'O que eles têm a aprender sobre a área de atuação dos colegas de outros cursos?',
    'O que eles têm a aprender sobre o planejamento, organização, execução e avaliação de uma ação de extensão?',
    'O que eles têm a aprender sobre o cenário social, econômico e/ou cultural da sua região?',
    'Como as disciplinas e aulas das áreas dos graduandos da equipe de execução dialogarão para o planejamento, organização, execução e/ou avaliação da proposta?',
    'Como as áreas de formação dos envolvidos na equipe de execução (discentes e servidores) dialogarão para o planejamento, organização, execução e/ou avaliação da proposta?',
    'Como se dará a relação com as disciplinas e aulas das áreas dos graduandos?',
    'Como as questões vindas da pesquisa serão colocadas no diálogo com os outros setores da sociedade?',
    'Como as questões vindas do diálogo com os outros setores da sociedade serão abordadas pela pesquisa e pelo ensino?',
    'Por que a Extensão é a melhor forma de abordar essa questão trazida pela proposta?',
  ];

  // if (userSession) {
  //   campoAberto = false;
  // }

  useEffect(() => {
    qualMod = propostaUuid.modalidade;
  }, [propostaUuid.modalidade]);

  const submeterProposta = async () => {
    const get = await api.get(`propostas/buscar/${propostaUuid.uuid}`);
    // console.log(get);
    const res = await api.put(`propostas/submeter/${propostaUuid.uuid}`);
    // console.log(res);
    alert('Proposta submetida.');
    history.push('/dashboard');
  };
  const renderProjetos = (projeto, index) => (
    <>
      <p>
        <b>Projeto {index + 1}</b>
      </p>
      <p>Número do Registro: {projeto.numeroRegistro}</p>
      <p>Nome do Projeto: {projeto.nomeProjeto}</p>
      <p>Nome do Proponente: {projeto.nomeProponente}</p>
      <p>Objetivo Geral: {projeto.objetivoGeral}</p>
    </>
  );

  const renderAtiAvalicao = (atividade, index) => (
    <>
      <p>
        <b>Atividade Avaliacao{index + 1}</b>
      </p>
      <p>Atividade: {atividade.atividades}</p>
      <p>Data Inicial: {atividade.data_inicio}</p>
      <p>Data Final: {atividade.data_fim}</p>
      <p>Hora Semanais: {atividade.horas_semanais}</p>
      <br />
    </>
  );

  const renderAtiPlanejamento = (atividade, index) => (
    <>
      <p>
        <b>Atividade Avaliacao{index + 1}</b>
      </p>
      <p>Atividade: {atividade.atividades}</p>
      <p>Data Inicial: {atividade.data_inicio}</p>
      <p>Data Final: {atividade.data_fim}</p>
      <p>Hora Semanais: {atividade.horas_semanais}</p>
      <br />
    </>
  );

  const renderAtividades = (atividade, index) => (
    <>
      <p>
        <b>Atividade {index + 1}</b>
      </p>
      <p>Atividade: {atividade.atividades}</p>
      <p>Data Inicial: {atividade.data_inicio}</p>
      <p>Data Final: {atividade.data_fim}</p>
      <p>Hora Inicial: {atividade.hora_inicio}</p>
      <p>Hora Final: {atividade.hora_fim}</p>
      <br />
    </>
  );

  const renderMembros = (membro, index) => (
    <>
      <Col md="6">
        <p>
          <b> Membro {index + 1}</b>
        </p>
        <Form.Row>
          <InputText
            label="Nome"
            value={membro.usuario.nome}
            disabled={campoAberto}
          />
        </Form.Row>
        <Form.Row>
          <InputText
            label="CPF"
            value={membro.usuario.cpf}
            disabled={campoAberto}
          />
          <InputText
            label="Email"
            value={membro.usuario.email}
            disabled={campoAberto}
          />
        </Form.Row>
        <Form.Row>
          <InputText
            label="Função"
            value={membro.usuario.funcao}
            disabled={campoAberto}
          />
        </Form.Row>
        <Form.Row>
          <InputText
            label="Tipo Institucional"
            value={membro.usuario.tipo_institucional}
            disabled={campoAberto}
          />
          <InputNumber
            label="Carga Horaria"
            value={membro.usuario.carga_horaria}
            disabled={campoAberto}
          />
        </Form.Row>
      </Col>
    </>
  );

  const renderObjEspecificos = (objetivos_especificos, index) => {
    if (
      propostaUuid.modalidade.toLowerCase() === 'programa' ||
      propostaUuid.modalidade.toLowerCase() === 'projeto'
    ) {
      return (
        <>
          <p>
            <b>Objetivo Específico {index + 1}</b>
          </p>
          <Form.Row>
            <InputText
              label="Objetivo"
              value={objetivos_especificos.objetivo_especifico}
              disabled={campoAberto}
            />
            <InputText
              label="Atividade"
              value={objetivos_especificos.desenvolvimento_atv}
              disabled={campoAberto}
            />
          </Form.Row>
          <Form.Row>
            <InputText
              label="Descrição"
              value={objetivos_especificos.atividades}
              disabled={campoAberto}
            />
            <InputText
              label="Carga Horária"
              value={objetivos_especificos.horas_semanais}
              disabled={campoAberto}
            />
          </Form.Row>
          <Form.Row>
            <InputText
              label="Data Inicial"
              value={objetivos_especificos.data_inicio}
              disabled={campoAberto}
            />
            <InputText
              label="Data Final"
              value={objetivos_especificos.data_fim}
              disabled={campoAberto}
            />
          </Form.Row>
          <br />
        </>
      );
    }
    if (
      propostaUuid.modalidade.toLowerCase() === 'evento' ||
      propostaUuid.modalidade.toLowerCase() === 'curso'
    ) {
      return (
        <>
          <InputText
            label="Objetivo Especifico"
            value={objetivos_especificos.objetivo_especifico}
            disabled={campoAberto}
          />
        </>
      );
    }
  };

  const situacaoProposta = (situacaoProposta) => {
    if (situacaoProposta === 'Aprovada') {
      return <Badge variant="success">Aprovada</Badge>;
    }
    if (situacaoProposta === 'Preenchimento') {
      return <Badge variant="secondary">Preenchimento</Badge>;
    }
    if (situacaoProposta === 'Analise') {
      return <Badge variant="info">Analise</Badge>;
    }
    if (situacaoProposta === 'Correção') {
      return <Badge variant="warning">Correção</Badge>;
    }
    if (situacaoProposta === 'Não Recomendada') {
      return <Badge variant="danger">Não Recomendada</Badge>;
    }
  };
  const handleReturn = () => {
    history.go(-1);
  };

  const editarProposta = () => {
    history.push(`/cadastro-proposta/${propostaUuid.uuid}`);
  };

  return (
    <div className="consulta">
      <Container>
        <header className="header-resultado">
          <button type="button" className="return" onClick={handleReturn}>
            <i className="material-icons md-24">keyboard_backspace</i>
            <p>Voltar</p>
          </button>
          <h1>Resumo da Proposta</h1>
          <div>
            <p>Modalidade: {propostaUuid.modalidade}</p>
            <p>Edital: {propostaUuid.edital_resumo.titulo}</p>
            {situacaoProposta(propostaUuid.estado)}
          </div>
        </header>
        <hr />
        <div className="resumo box-all">
          <Tabs
            defaultActiveKey="parte-1"
            transition={false}
            id="noanim-tab-example"
          >
            <Tab eventKey="parte-1" title="Caracterização do Proponente">
              <div className="boxForm">
                <Form>
                  <InputText
                    label="CPF"
                    value={propostaUuid.proponente.cpf}
                    disabled={campoAberto}
                  />
                  <InputText
                    label="Nome"
                    value={propostaUuid.proponente.nome}
                    disabled={campoAberto}
                  />
                  <InputText
                    label="Função"
                    value={propostaUuid.proponente.funcao}
                    disabled={campoAberto}
                  />
                  <InputText
                    label="Email"
                    value={propostaUuid.proponente.email}
                    disabled={campoAberto}
                  />
                  <InputText
                    label="Tipo Institucional"
                    value={propostaUuid.proponente.tipo_institucional}
                    disabled={campoAberto}
                  />
                  <InputText
                    label="Carga Horaria"
                    value={propostaUuid.proponente.carga_horaria}
                    disabled={campoAberto}
                  />
                </Form>
              </div>
            </Tab>
            <Tab eventKey="parte-2" title="Dados Basicos da Proposta">
              <div className="boxForm">
                <Form.Row>
                  <InputText
                    label="Titulo da Ação"
                    value={propostaUuid.titulo}
                    disabled={campoAberto}
                  />
                  <InputText
                    label="Subtitulo da Ação"
                    value={propostaUuid.subtitulo}
                    disabled={campoAberto}
                  />
                </Form.Row>
                <Form.Row>
                  <InputText
                    label="Estado"
                    value={propostaUuid.local_estado}
                    disabled={campoAberto}
                  />
                  <InputText
                    label="Objetivo Geral"
                    value={propostaUuid.objetivo_geral}
                    disabled={campoAberto}
                  />
                  <InputText
                    label="Area Tematica"
                    value={propostaUuid.area_tematica}
                    disabled={campoAberto}
                  />
                </Form.Row>
                <Form.Row>
                  <InputText
                    label="Cidade"
                    placeholder="Cidade"
                    value={propostaUuid.cidade}
                    disabled={campoAberto}
                  />
                  <InputText
                    label="Bairro"
                    value={propostaUuid.bairro}
                    disabled={campoAberto}
                  />

                  <InputNumber
                    label="Carga Horaria"
                    value={propostaUuid.carga_horaria}
                    disabled={campoAberto}
                  />
                </Form.Row>

                <Form.Row>
                  <InputSelect
                    label="Centro"
                    value={propostaUuid.centro}
                    disabled={campoAberto}
                    optionsList={[
                      'CAC - Centro de Artes e Comunicação',
                      'CB - Centro de Biociências',
                      'CCEN - Centro de Ciências Exatas e da Natureza',
                      'CCJ - Centro de Ciências Jurídicas',
                      'CCS - Centro de Ciências da Sáude',
                      'CCM - Centro de Ciências Médicas',
                      'CCSA - Centro de Ciências Sociais Aplicadas',
                      'CE - Centro de Educação',
                      'CFCH - Centro de Filosofia e Ciências Humanas',
                      'CIn - Centro de Informática',
                      'CTG - Centro de Tecnologia e Geociências',
                    ]}
                  />
                  <InputSelect
                    label="Departamento"
                    value={propostaUuid.departamento}
                    disabled={campoAberto}
                    optionsList={[
                      'Departamento de Artes',
                      'Departamento de Informatica',
                      'Departamento de Letras',
                      'Departamento de Saúde',
                      'Departamento de Exatas',
                    ]}
                  />
                </Form.Row>
              </div>
              <div className="boxForm">
                {propostaUuid.modalidade.toLowerCase() === 'programa' && (
                  <>
                    <h5>Dados do Programa</h5>
                    <Form.Row>
                      <InputText
                        label="Vice Coordenador"
                        value={
                          propostaUuid[propostaUuid.modalidade.toLowerCase()]
                            .vice_coord
                        }
                        disabled={campoAberto}
                      />
                      <InputText
                        label="Carga Horaria Vice Coordenador"
                        value={
                          propostaUuid[propostaUuid.modalidade.toLowerCase()]
                            .ch_vice_coord
                        }
                        disabled={campoAberto}
                      />
                    </Form.Row>
                    <Form.Row>
                      <InputText
                        label="Relações entre os saberes teóricos da área com os saberes teóricos da Extensão Universitária"
                        value={
                          propostaUuid[propostaUuid.modalidade.toLowerCase()]
                            .aspectos_teoricos
                        }
                        disabled={campoAberto}
                      />
                    </Form.Row>
                  </>
                )}
                {propostaUuid.modalidade === 'programa' && (
                  <>
                    <h5>Projetos Vinculados ao Programa</h5>
                    {propostaUuid[propostaUuid.modalidade].projetos.map(
                      renderProjetos,
                    )}
                    <br />
                  </>
                )}
                <h5>Objetivos Específicos da Ação</h5>
                {propostaUuid[
                  propostaUuid.modalidade.toLowerCase()
                ].objetivos_especificos.map(renderObjEspecificos)}
                <br />
                {propostaUuid.modalidade.toLowerCase() === 'evento' && (
                  <>
                    <h5>Atividades da Ação</h5>
                    {propostaUuid[
                      propostaUuid.modalidade.toLowerCase()
                    ].atividades.map(renderAtividades)}
                  </>
                )}
                <hr />
                {propostaUuid.modalidade.toLowerCase() === 'evento' && (
                  <>
                    <h5>Cronograma do Evento</h5>
                    {propostaUuid[
                      propostaUuid.modalidade.toLowerCase()
                    ].cronograma.atividades_avaliacao.map(renderAtiAvalicao)}
                    <hr />

                    {propostaUuid[
                      propostaUuid.modalidade.toLowerCase()
                    ].cronograma.atividades_avaliacao.map(
                      renderAtiPlanejamento,
                    )}
                    <hr />
                    {/* <p>
                  Início do Planejamento:{' '}
                  {propostaUuid[propostaUuid.modalidade.toLowerCase()].cronograma.inicio_planejamento}
                </p>
                <p>
                  Final do Planejamento:{' '}
                  {propostaUuid[propostaUuid.modalidade.toLowerCase()].cronograma.fim_planejamento}
                </p>
                <p>
                  Carga Horária Semanal:{' '}
                  {propostaUuid[propostaUuid.modalidade.toLowerCase()].cronograma.horas_semanais_planejamento}
                </p>
                <p>
                  Atividades Desenvolvidas:{' '}
                  {propostaUuid[propostaUuid.modalidade.toLowerCase()].cronograma.atividades_planejamento}
                </p>
                <br />
                <p>
                  <b>
                    Avaliação da Ação (pelo público alvo e pela equipe de
                    execução)
                  </b>
                </p>
                <p>
                  Início da Avaliação:{' '}
                  {propostaUuid.cronograma.inicio_avaliacao}
                </p>
                <p>
                  Final da Avaliação: {propostaUuid.cronograma.fim_avaliacao}
                </p>
                <p>
                  Carga Horária Semanal:{' '}
                  {propostaUuid.cronograma.horas_semanais_avaliacao}
                </p>
                <p>
                  Atividades Desenvolvidas:{' '}
                  {propostaUuid.cronograma.atividades_avaliacao}
                </p> */}
                  </>
                )}
              </div>
            </Tab>
            <Tab eventKey="parte-3" title="Diretrizes">
              <div className="boxForm">
                <h5>
                  Relação entre a proposta e as Diretrizes da Extensão
                  Universitária
                </h5>
                {Object.entries(propostaUuid.diretrizes_proposta).map(
                  (list, index) => (
                    <div>
                      <InputText
                        label={perguntas[index]}
                        value={list[1]}
                        disabled={campoAberto}
                      />
                      <hr />
                    </div>
                  ),
                )}
              </div>
            </Tab>
            <Tab eventKey="parte-4" title="Membros e Publicos">
              <div className="boxForm">
                <h5>Membros</h5>
                <Form.Row>
                  {propostaUuid.usuarios_proposta.map(renderMembros)}
                </Form.Row>
                <br />
              </div>
              <div className="boxForm">
                <h5>Público Interno</h5>
                {/* {Object.entries(propostaUuid.publico_interno).map(
              (list, index) => (
                <div>
                  <InputNumber
                    label={list[0]}
                    value={list[1]}
                    disabled={campoAberto}
                  />
                  <hr />
                </div>
              ),
            )} */}
                <InputNumber
                  mdLabel={10}
                  mdValue={2}
                  label="Discentes Graduação:"
                  value={propostaUuid.publico_interno.discentes_grad}
                />
                <InputNumber
                  mdLabel={10}
                  mdValue={2}
                  label="Discentes Pos:"
                  value={propostaUuid.publico_interno.discentes_pos}
                />
                <InputNumber
                  mdLabel={10}
                  mdValue={2}
                  label="Docentes:"
                  value={propostaUuid.publico_interno.docentes}
                />
                <InputNumber
                  mdLabel={10}
                  mdValue={2}
                  label="Tecnicos Admnistrativos:"
                  value={propostaUuid.publico_interno.tecs_adm}
                />
                <InputNumber
                  mdLabel={10}
                  mdValue={2}
                  label="Outros:"
                  value={propostaUuid.publico_interno.outros}
                />
                <br />
                <Form.Row>
                  <Col>
                    <h5>Público Externo</h5>
                    <InputNumber
                      label="Discentes estaduais:"
                      value={propostaUuid.publico_externo.discentes_estaduais}
                    />
                    <InputNumber
                      label="Discentes federais:"
                      value={propostaUuid.publico_externo.discentes_federais}
                    />
                    <InputNumber
                      label="Discentes municipais:"
                      value={propostaUuid.publico_externo.discentes_municipais}
                    />
                    <InputNumber
                      label="Grupos comunitarios:"
                      value={propostaUuid.publico_externo.grupos_comunitarios}
                    />
                    <InputNumber
                      label="Movimentos sociais:"
                      value={propostaUuid.publico_externo.movimentos_sociais}
                    />
                    <InputNumber
                      label="Organizacoes privadas:"
                      value={propostaUuid.publico_externo.organizacoes_privadas}
                    />
                  </Col>
                  <Col>
                    <h5>Público Externo</h5>
                    <InputNumber
                      label="Organizacoes sindicais:"
                      value={
                        propostaUuid.publico_externo.organizacoes_sindicais
                      }
                    />
                    <InputNumber
                      label="Servidores estaduais:"
                      value={propostaUuid.publico_externo.servidores_estaduais}
                    />
                    <InputNumber
                      label="Servidores federais:"
                      value={propostaUuid.publico_externo.servidores_federais}
                    />
                    <InputNumber
                      label="Servidores municipais:"
                      value={propostaUuid.publico_externo.servidores_municipais}
                    />
                    <InputNumber
                      label="Ongs:"
                      value={propostaUuid.publico_externo.ongs}
                    />
                    <InputNumber
                      label="Outros:"
                      value={propostaUuid.publico_externo.outros}
                    />
                    <br />
                  </Col>
                </Form.Row>
              </div>
            </Tab>
            <Tab eventKey="parte-5" title="Informações Extras">
              <div className="boxForm">
                <InputText
                  label="Instagram"
                  value={propostaUuid.info_proposta.instagram}
                />
                <InputText
                  label="Twitter"
                  value={propostaUuid.info_proposta.twitter}
                />
                <InputText
                  label="Facebook"
                  value={propostaUuid.info_proposta.facebook}
                />
                <InputText
                  label="Youtube"
                  value={propostaUuid.info_proposta.youtube}
                />
                <InputText
                  label="Podcast"
                  value={propostaUuid.info_proposta.podcast}
                />
                <InputText
                  label="Outro"
                  value={propostaUuid.info_proposta.outro}
                />
                <InputText
                  label="Considerações Finais"
                  value={propostaUuid.info_proposta.consideracoes_finais}
                />
              </div>
            </Tab>
          </Tabs>
        </div>
        {propostaUuid.estado === 'Preenchimento' ? (
          <Form.Row className="justify-content-md-center">
            <Button
              id="previous"
              className="button button-medium"
              onClick={editarProposta}
            >
              <p>Editar</p>
              <i className="material-icons">arrow_left</i>
            </Button>

            {from === 'cadastro-proposta' ? (
              <Button
                id="next"
                className="button button-medium"
                onClick={submeterProposta}
              >
                <p>Próximo passo</p>
                <i className="material-icons">arrow_right</i>
              </Button>
            ) : (
              <></>
            )}
          </Form.Row>
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
};
export default ResumoProposta;
