/* eslint-disable no-fallthrough */
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {
  CadastroProgramaContext,
  CadastroProgramaData,
} from '../../Services/CadastroProgramaContext';
import SelecionarEdital from '../../Components/CadastroProposta/SelecionarEdital/SelecionarEdital';
import CaracterizacaoAcao from '../../Components/CadastroProposta/Programa/CaracterizacaoAcao';
import CaracterizacaoProponente from '../../Components/CadastroProposta/Programa/CaracterizacaoProponente';
import SelecionarModalidade from '../../Components/CadastroProposta/SelecionarModalidade/SelecionarModalidade';
import CaracterizacaoAcao2 from '../../Components/CadastroProposta/Programa/CaracterizacaoAcao2';
import CaracterizacaoAcao3 from '../../Components/CadastroProposta/Programa/CaracterizacaoAcao3';
import CaracterizacaoAcao4 from '../../Components/CadastroProposta/Programa/CaracterizacaoAcao4';
import CaracterizacaoAcao5 from '../../Components/CadastroProposta/Programa/CaracterizacaoAcao5';
import CaracterizacaoAcao6 from '../../Components/CadastroProposta/Programa/CaracterizacaoAcao6';
import CaracterizacaoProjeto from '../../Components/CadastroProposta/Projeto/CaracterizacaoProjeto';
import PublicoAlvo from '../../Components/CadastroProposta/PublicoAlvo';
import MembrosEquipe from '../../Components/CadastroProposta/MembrosEquipe';
import InformacoesExtras from '../../Components/CadastroProposta/InformacoesExtras';
import DocumentosObrigatorios from '../../Components/CadastroProposta/DocumentosObrigatorios';
import Resumo from '../../Components/CadastroProposta/Programa/Resumo';
import { CadastroCursoData } from '../../Services/CadastroCursoContext';
import AcaoCurso from '../../Components/CadastroProposta/Cursos/AcaoCurso';
import AcaoCurso1 from '../../Components/CadastroProposta/Cursos/AcaoCurso1';
import AcaoCurso2 from '../../Components/CadastroProposta/Cursos/AcaoCurso2';
import { CadastroEventoData } from '../../Services/CadastroEventoContext';
import CaracterizacaoEvento from '../../Components/CadastroProposta/Evento/CaracterizacaoEvento';
import CaracterizacaoEvento1 from '../../Components/CadastroProposta/Evento/CaracterizacaoEvento1';
import CaracterizacaoEvento2 from '../../Components/CadastroProposta/Evento/CaracterizacaoEvento2';
import { CadastroProjetoData } from '../../Services/CadastroProjetoContext';
import InserirEventoCurso from '../../Components/CadastroProposta/InserirEventoCurso';
import ResumoProposta from '../Proposta/ResumoProposta';
import api from '../../Services/sigproj/api';

const CadastroProposta = (props) => {
  const [modalidade, setModalidade] = useState('');
  const [step, setStep] = useState(0);
  const [proposta, setProposta] = useState('');
  // console.log(step);

  /*  Verifica se recebeu uma uuid na url. Caso positvo, isso significa que o usuário irá editar uma proposta criada anteriormente.
  Dependendo da modalidade, o step será diferente, pois os componentes variam. */
  useEffect(() => {
    if (props.match.params.uuid) {
      const { uuid } = props.match.params;
      api.get(`propostas/buscar/${uuid}`).then((res) => {
        const proposta = res.data;
        if (proposta.modalidade === 'Programa') {
          setStep(3);
        } else if (proposta.modalidade === 'Projeto') {
          setStep(3);
        } else if (proposta.modalidade === 'Evento') {
          setStep(3);
        } else if (proposta.modalidade === 'Curso') {
          setStep(4);
        }
        setModalidade(proposta.modalidade);
        setProposta(proposta);
      });
    }
  }, []);

  /* Manipula qual componente está sendo exibido, de acordo com o step */
  const CadastrarProposta = () => {
    if (modalidade === 'Programa') {
      const from = 'programa';
      const props = {
        from,
        step,
        setStep,
        proposta,
      };
      let component;
      switch (step) {
        case 0:
          component = <SelecionarEdital {...props} />;
          break;
        case 1:
          component = <CaracterizacaoProponente {...props} />;
          break;
        case 2:
          component = <CaracterizacaoAcao {...props} />;
          break;
        case 3:
          component = <CaracterizacaoAcao2 {...props} />;
          break;
        case 4:
          component = <CaracterizacaoAcao3 {...props} />;
          break;
        case 5:
          component = <CaracterizacaoAcao4 {...props} />;
          break;
        case 6:
          component = <CaracterizacaoAcao5 {...props} />;
          break;
        case 7:
          component = <CaracterizacaoAcao6 {...props} />;
          break;
        case 8:
          component = <PublicoAlvo {...props} />;
          break;
        case 9:
          component = <MembrosEquipe {...props} />;
          break;
        case 10:
          component = <DocumentosObrigatorios {...props} />;
          break;
        case 11:
          component = <InformacoesExtras {...props} />;
          break;
        case 12:
          component = <ResumoProposta from="cadastro-proposta" />;
          break;
        default:
          component = null;
      }
      return component;
    }
    if (modalidade === 'Projeto') {
      const from = 'projeto';
      const props = { from, step, setStep, proposta };
      let component;
      switch (step) {
        case 0:
          component = <SelecionarEdital {...props} />;
          break;
        case 1:
          component = <CaracterizacaoProponente {...props} />;
          break;
        case 2:
          component = <CaracterizacaoAcao {...props} />;
          break;
        case 3:
          component = <CaracterizacaoProjeto {...props} />;
          break;
        case 4:
          component = <CaracterizacaoAcao4 {...props} />;
          break;
        case 5:
          component = <CaracterizacaoAcao5 {...props} />;
          break;
        case 6:
          component = <CaracterizacaoAcao6 {...props} />;
          break;
        case 7:
          component = <InserirEventoCurso {...props} />;
          break;
        case 8:
          component = <PublicoAlvo {...props} />;
          break;
        case 9:
          component = <MembrosEquipe {...props} />;
          break;
        case 10:
          component = <DocumentosObrigatorios {...props} />;
          break;
        case 11:
          component = <InformacoesExtras {...props} />;
          break;
        case 12:
          component = <ResumoProposta from="cadastro-proposta" />;
          break;
        default:
          component = null;
      }
      return component;
    }
    if (modalidade === 'Evento') {
      const from = 'evento';
      const props = { from, step, setStep, proposta };
      let component;
      switch (step) {
        case 0:
          component = <SelecionarEdital {...props} />;
          break;
        case 1:
          component = <CaracterizacaoProponente {...props} />;
          break;
        case 2:
          component = <CaracterizacaoAcao {...props} />;
          break;
        case 3:
          component = <CaracterizacaoAcao2 {...props} />;
          break;
        case 4:
          component = <CaracterizacaoEvento {...props} />;
          break;
        case 5:
          component = <CaracterizacaoEvento2 {...props} />;
          break;
        case 6:
          component = <CaracterizacaoAcao5 {...props} />;
          break;
        case 7:
          component = <PublicoAlvo {...props} />;
          break;
        case 8:
          component = <MembrosEquipe {...props} />;
          break;
        case 9:
          component = <DocumentosObrigatorios {...props} />;
          break;
        case 10:
          component = <InformacoesExtras {...props} />;
          break;
        case 11:
          component = <ResumoProposta from="cadastro-proposta" />;
          break;
        default:
          component = null;
      }
      return component;
    }
    if (modalidade === 'Curso') {
      const from = 'curso';
      const props = { from, step, setStep, proposta };
      // console.log(proposta);
      let component;
      switch (step) {
        case 0:
          component = <SelecionarEdital {...props} />;
          break;
        case 1:
          component = <CaracterizacaoProponente {...props} />;
          break;
        case 2:
          component = <CaracterizacaoAcao {...props} />;
          break;
        case 3:
          component = <AcaoCurso {...props} />;
          break;
        case 4:
          component = <AcaoCurso1 {...props} />;
          break;
        case 5:
          component = <AcaoCurso2 {...props} />;
          break;
        case 6:
          component = <CaracterizacaoAcao5 {...props} />;
          break;
        case 7:
          component = <PublicoAlvo {...props} />;
          break;
        case 8:
          component = <MembrosEquipe {...props} />;
          break;
        case 9:
          component = <DocumentosObrigatorios {...props} />;
          break;
        case 10:
          component = <InformacoesExtras {...props} />;
          break;
        case 11:
          component = <ResumoProposta from="cadastro-proposta" />;
          break;
        default:
          component = null;
      }
      return component;
    }
  };

  /* Determina qual contexto será utilizado, de acordo com a modalidade */
  const Componente = () => {
    if (modalidade === 'Programa') {
      return (
        <CadastroProgramaData>
          <CadastrarProposta />
        </CadastroProgramaData>
      );
    }
    if (modalidade === 'Evento') {
      return (
        <CadastroEventoData>
          <CadastrarProposta />
        </CadastroEventoData>
      );
    }
    if (modalidade === 'Curso') {
      return (
        <CadastroCursoData>
          <CadastrarProposta />
        </CadastroCursoData>
      );
    }
    if (modalidade === 'Projeto') {
      return (
        <CadastroProjetoData>
          <CadastrarProposta />
        </CadastroProjetoData>
      );
    }
    return <CadastroProjetoData />;
  };

  return (
    <div className="cadastro-proposta">
      <Container>
        {modalidade === '' ? (
          <SelecionarModalidade handleModalidade={setModalidade} />
        ) : (
          Componente()
        )}
      </Container>
    </div>
  );
};

export default CadastroProposta;
