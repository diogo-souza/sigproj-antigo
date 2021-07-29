import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CadastroProgramaContext } from '../../../Services/CadastroProgramaContext';
import { saveProposta } from '../../../Services/proposta';
import { CadastroCursoContext } from '../../../Services/CadastroCursoContext';
import { CadastroEventoContext } from '../../../Services/CadastroEventoContext';

const Resumo = (props) => {
  let step;
  let setStep;
  let values;
  let errors;
  let setErrors;
  let handleChanges;
  let contexto;

  if (props.from === 'programa') {
    contexto = CadastroProgramaContext;
  } else if (props.from === 'curso') {
    contexto = CadastroCursoContext;
  } else if (props.from === 'evento') {
    contexto = CadastroEventoContext;
  } else if (props.from === 'projeto ') {
    // contexto = CadastroProgramaContext;
  }
  if (contexto) {
    ({
      values,
      handleChanges,
      step,
      setStep,
      errors,
      setErrors,
    } = React.useContext(contexto));
  }
  const history = useHistory();

  const handleReturn = () => {
    history.push('/dashboard');
  };

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    if (id === 'previous') {
      setStep(step - 1);
    } else {
      saveProposta('proposta-1212', values);
      history.push('/dashboard');
    }
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
  const renderObjEspecificos = (objEspecifico, index) => {
    if (props.from === 'programa') {
      return (
        <>
          <p>
            <b>Objetivo Específico {index + 1}</b>
          </p>
          <p>Objetivo: {objEspecifico.objetivo}</p>
          <p>Atividade: {objEspecifico.atividade}</p>
          <p>Descrição: {objEspecifico.descricao}</p>
          <p>Data Inicial: {objEspecifico.data_inicio}</p>{' '}
          <p>Data Final: {objEspecifico.fim}</p>{' '}
          <p>Carga Horária: {objEspecifico.cargaHoraria}</p>
          <br />
        </>
      );
    }
    if (props.from === 'evento') {
      return (
        <>
          <p>
            Objetivo Específico {index + 1}: {objEspecifico}
          </p>
          <br />
        </>
      );
    }
  };

  const renderAtividades = (atividade, index) => (
    <>
      <p>
        <b>Atividade {index + 1}</b>
      </p>
      <p>Atividade: {atividade.atividade}</p>
      <p>Data Inicial: {atividade.data_inicio}</p>
      <p>Data Final: {atividade.data_fim}</p>
      <p>Hora Inicial: {atividade.horas_semanais}</p>
      <br />
    </>
  );

  const renderMembros = (membro, index) => (
    <>
      <p>
        <b> Membro {index + 1}</b>
      </p>
      <p>CPF: {membro.cpf}</p>
      <p>Nome Completo: {membro.nome}</p>
      <p>Tipo Institucional: {membro.tipo}</p>
      <p>Função: {membro.funcao}</p>
      <p>Carga Horária: {membro.ch}</p>
    </>
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
          <Col className="box">
            <h3>Resumo da Proposta</h3>
            <hr />
            <h4>1. Dados Básicos da Proposta</h4>
            <p>Modalidade: {values.modalidade}</p>
            <p>Edital: {values.edital}</p>
            <hr />
            <h4>2. Caracterização do Proponente</h4>
            <p>CPF do Proponente: {values.cpf}</p>
            <p>Nome do Proponente: {values.nome}</p>
            <p>Centro do Proponente: {values.centro}</p>
            <p>Departamento do Proponente: {values.departamento}</p>
            <p>Tipo Institucional do do Proponente: {values.cargo}</p>
            <p>Email do Proponente: {values.email}</p>
            <p>Telefone do Proponente: {values.telefone}</p>
            <hr />
            <h4>3. Caracterização da Ação</h4>
            <p>Titulo da Ação: {values.titulo}</p>
            <p>subTitulo da Ação: {values.subTitulo}</p>
            <p>Objetivo Geral da Ação: {values.objetivoGeral}</p>
            <p>
              A Ação Possui Movimentação Financeira Externa?{' '}
              {values.movimentacaoFinanceiraExterna}
            </p>
            <br />
            {props.from === 'programa' && (
              <>
                <h5>Projetos Vinculados ao Programa</h5>
                {values.projetos.map(renderProjetos)}
                <br />
              </>
            )}
            <h5>Objetivos Específicos da Ação</h5>
            {values.objetivosEspecificos.map(renderObjEspecificos)}
            <br />
            {props.from === 'evento' && (
              <>
                <h5>Atividades da Ação</h5>
                {values.atividades.map(renderAtividades)}
              </>
            )}
            <br />
            {props.from === 'evento' && (
              <>
                <h5>Descrição da Ação</h5>
                <p>
                  <b>Planejamento da Ação</b>
                </p>
                <p>
                  Início do Planejamento:{' '}
                  {values.cronograma.inicio_planejamento}
                </p>
                <p>
                  Final do Planejamento: {values.cronograma.fim_planejamento}
                </p>
                <p>
                  Carga Horária Semanal:{' '}
                  {values.cronograma.horas_semanais_planejamento}
                </p>
                <p>
                  Atividades Desenvolvidas:{' '}
                  {values.cronograma.atividades_planejamento}
                </p>
                <br />
                <p>
                  <b>
                    Avaliação da Ação (pelo público alvo e pela equipe de
                    execução)
                  </b>
                </p>
                <p>Início da Avaliação: {values.cronograma.inicio_avaliacao}</p>
                <p>Final da Avaliação: {values.cronograma.fim_avaliacao}</p>
                <p>
                  Carga Horária Semanal:{' '}
                  {values.cronograma.horas_semanais_avaliacao}
                </p>
                <p>
                  Atividades Desenvolvidas:{' '}
                  {values.cronograma.atividades_avaliacao}
                </p>
              </>
            )}
            <h5>
              Relação entre a proposta e as Diretrizes da Extensão Universitária
            </h5>
            <p>
              Quais foram as questões da sociedade (comunidades, outras
              instituições de ensino, empresas, políticas públicas, situações de
              força maior) que demandaram pela realização da ação?
              <br />
              <p>{values.diretrizes_proposta.pergunta1}</p>
            </p>
            <p>
              Como a ação contribuirá para solucionar essas questões?
              <br />
              <p>{values.diretrizes_proposta.pergunta2}</p>
            </p>
            <p>
              Como se estabelecerá o diálogo entre a comunidade interna e
              externa (momentos, ações)?
              <br />
              <p>{values.diretrizes_proposta.pergunta3}</p>
            </p>
            <p>
              Como se dará a troca de saberes (ouvir, refletir, retornar)?
              <br />
              <p>{values.diretrizes_proposta.pergunta4}</p>
            </p>
            <p>
              O que eles têm a aprender sobre sua área de atuação?
              <br />
              <p>{values.diretrizes_proposta.pergunta5}</p>
            </p>
            <p>
              O que eles têm a aprender sobre a área de atuação dos colegas de
              outros cursos?
              <br />
              <p>{values.diretrizes_proposta.pergunta6}</p>
            </p>
            <p>
              O que eles têm a aprender sobre o planejamento, organização,
              execução e avaliação de uma ação de extensão?
              <br />
              <p>{values.diretrizes_proposta.pergunta7}</p>
            </p>
            <p>
              O que eles têm a aprender sobre os outros setores da sociedade
              envolvidos?
              <br />
              <p>{values.diretrizes_proposta.pergunta8}</p>
            </p>
            <p>
              O que eles têm a aprender sobre o cenário social, econômico e/ou
              cultural da sua região?
              <br />
              <p>{values.diretrizes_proposta.pergunta9}</p>
            </p>
            <p>
              Como as disciplinas e aulas das áreas dos graduandos da equipe de
              execução dialogarão para o planejamento, organização, execução
              e/ou avaliação da proposta?
              <br />
              <p>{values.diretrizes_proposta.pergunta10}</p>
            </p>
            <p>
              Como as áreas de formação dos envolvidos na equipe de execução
              (discentes e servidores) dialogarão para o planejamento,
              organização, execução e/ou avaliação da proposta?
              <br />
              <p>{values.diretrizes_proposta.pergunta11}</p>
            </p>
            <p>
              Como se dará a relação com as disciplinas e aulas das áreas dos
              graduandos?
              <br />
              <p>{values.diretrizes_proposta.pergunta12}</p>
            </p>
            <p>
              Como as questões vindas da pesquisa serão colocadas no diálogo com
              os outros setores da sociedade?
              <br />
              <p>{values.diretrizes_proposta.pergunta13}</p>
            </p>
            <p>
              Como as questões vindas do diálogo com os outros setores da
              sociedade serão abordadas pela pesquisa e pelo ensino?
              <br />
              <p>{values.diretrizes_proposta.pergunta14}</p>
            </p>
            <p>
              Por que a Extensão é a melhor forma de abordar essa questão
              trazida pela proposta?
              <br />
              <p>{values.diretrizes_proposta.pergunta15}</p>
            </p>
            <br />
            {props.from === 'programa' && (
              <p>
                Relações entre os saberes teóricos da área com os saberes
                teóricos da Extensão Universitária: {values.saberesTeoricos}
              </p>
            )}
            <p>Período de Execução da Proposta: {values.periodoExecucao}</p>
            <p>Carga Horária Total da Proposta: {values.carga_horaria}</p>
            <p>Estado: {values.estado}</p>
            <p>Cidade: {values.cidade}</p>
            <p>Bairro: {values.bairro}</p>
            <br />
            <h5>Público Interno</h5>
            <p>Docentes: {values.publico_interno.docentes}</p>
            <p>
              Discentes de Graduação:{' '}
              {values.publico_interno.discentesGraduacao}
            </p>
            <p>
              Docentes de Pós Graduação: {values.publico_interno.discentesPos}
            </p>
            <p>
              Técnicos Administrativos:{' '}
              {values.publico_interno.tecnicosAdministrativos}
            </p>
            <p>Outros: {values.publico_interno.outros}</p>
            <br />
            <h5>Público Externo</h5>
            <p>
              Servidores de Instituições Governamentais Federais:{' '}
              {values.publico_externo.servidoresFederais}
            </p>
            <p>
              Discentes de Instituições Governamentais Federais:{' '}
              {values.publico_externo.discentesFederais}
            </p>
            <p>
              Servidores de Instituições Governamentais Estaduais:{' '}
              {values.publico_externo.servidoresEstaduais}
            </p>
            <p>
              Discentes de Instituições Governamentais Estaduais:{' '}
              {values.publico_externo.discentesEstaduais}
            </p>
            <p>
              Servidores de Instituições Governamentais Municipais:{' '}
              {values.publico_externo.servidoresMunicipais}
            </p>
            <p>
              Discentes de Instituições Governamentais Municipais:{' '}
              {values.publico_externo.discentesMunicipais}
            </p>
            <p>
              Organizações Privadas:{' '}
              {values.publico_externo.organizacoesPrivadas}
            </p>
            <p>
              Movimentos Sociais: {values.publico_externo.movimentosSociais}
            </p>
            <p>
              Organizações Não Governamentais: {values.publico_externo.ongs}
            </p>
            <p>
              Organizações Sindicais:{' '}
              {values.publico_externo.organizacoesSindicais}
            </p>
            <p>
              Grupos Comunitários: {values.publico_externo.gruposComunitarios}
            </p>
            <p>Outros: {values.publico_externo.Discentes}</p>
            <br />
            <h5>Membros</h5>
            {values.usuarios_proposta.map(renderMembros)}
            <br />
            <h5>
              <p>Informações Extras</p>
            </h5>
            <p>
              Instagram:{' '}
              <a href={values.info_proposta.instagram}>
                {values.info_proposta.instagram}
              </a>
            </p>
            <p>
              Twitter:{' '}
              <a href={values.info_proposta.twitter}>
                {values.info_proposta.twitter}
              </a>
            </p>
            <p>
              Facebook:{' '}
              <a href={values.info_proposta.facebook}>
                {values.info_proposta.facebook}
              </a>
            </p>
            <p>
              Youtube:{' '}
              <a href={values.info_proposta.youtube}>
                {values.info_proposta.youtube}
              </a>
            </p>
            <p>
              Podcast:{' '}
              <a href={values.info_proposta.podcast}>
                {values.info_proposta.podcast}
              </a>
            </p>
            <p>
              Outro:{' '}
              <a href={values.info_proposta.outro}>
                {values.info_proposta.outro}
              </a>
            </p>
            <p>
              Considerações Finais: {values.info_proposta.consideracoes_finais}
            </p>
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
                <p>Submeter</p>
                <i className="material-icons">arrow_right</i>
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Resumo;
