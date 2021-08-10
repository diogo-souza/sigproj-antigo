/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  Col,
  InputGroup,
  DropdownButton,
  Row,
  Table,
  FormControl,
  FormGroup,
  FormLabel,
  ButtonGroup,
} from 'react-bootstrap';

import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useHistory } from 'react-router-dom';
import api from '../../../Services/sigproj/api';
import useEditaisFiltro from '../../../Hooks/useEditaisFiltro';
import { CadastroProgramaContext } from '../../../Services/CadastroProgramaContext';
import { CadastroCursoContext } from '../../../Services/CadastroCursoContext';
import { CadastroEventoContext } from '../../../Services/CadastroEventoContext';
import { saveProposta } from '../../../Services/proposta';
import { CadastroProjetoContext } from '../../../Services/CadastroProjetoContext';
import PaginationBasic from '../../Pagination/Pagination';

const SelecionarEdital = ({ from, step, setStep }) => {
  let values;
  let handleChanges;
  let contexto;
  let handlePropostaBasica;
  const [editais, setEditais] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  if (from === 'programa') {
    contexto = CadastroProgramaContext;
  } else if (from === 'curso') {
    contexto = CadastroCursoContext;
  } else if (from === 'evento') {
    contexto = CadastroEventoContext;
  } else if (from === 'projeto') {
    contexto = CadastroProjetoContext;
  }
  if (contexto) {
    ({ values, handleChanges, handlePropostaBasica } = React.useContext(
      contexto,
    ));
  }
  const history = useHistory();

  let editaisData;

  async function getEditais() {
    editaisData = await api.get('editais?ativos=true', {
      params: JSON.parse(
        sessionStorage.getItem('@NovoSistemadeRegistro-FiltroEditais'),
      ),
    });
    setEditais(editaisData.data.content);
    setTotalPages(editaisData.data.totalPages);
  }

  const [filters, setFilters] = useState({
    titulo: null,
    modalidade: null,
    data_inicio: null,
    data_fim: null,
    estado: null,
    limite: 10,
    pagina: 1,
  });

  const capitalize = (word) =>
    word[0].toUpperCase() + word.slice(1).toLowerCase();

  useEffect(() => {
    sessionStorage.setItem(
      '@NovoSistemadeRegistro-FiltroEditais',
      JSON.stringify(filters),
    );
  }, [filters]);

  useEffect(() => {
    if (from) {
      setFilters({
        ...filters,
        modalidade: capitalize(from),
      });

      sessionStorage.setItem(
        '@NovoSistemadeRegistro-FiltroEditais',
        JSON.stringify({
          titulo: null,
          modalidade: capitalize(from),
          data_inicio: null,
          data_fim: null,
          estado: null,
          limite: 10,
          pagina: 1,
        }),
      );
    }
    getEditais();
  }, []);

  function handleClick(event) {
    const { id } = event.currentTarget;
    if (id === 'previous') {
      setStep(step - 1);
    } else if (id === 'next') {
      if (values.edital !== '') {
        saveProposta('proposta-1212', values);
        setStep(step + 1);
      }
    } else {
      // Selecionou edital
      handleChanges(event);
      // handleModalidade(from);
      handlePropostaBasica(event, values.modalidade);
    }
  }

  function handleReturn() {
    history.push('/dashboard');
  }

  const paginate = (pageNumber) => {
    setFilters({
      ...filters,
      pagina: pageNumber,
    });
    setTimeout(() => {
      // TODO Procurar forma de atualizar apenas quando o setFilter atualizar/sessionStorage atualizar
      getEditais();
    }, 500);
  };

  const limparFiltros = () => {
    if (from) {
      setFilters({
        titulo: '',
        modalidade: capitalize(from),
        data_inicio: '',
        data_fim: '',
        estado: null,
        limite: 10,
        pagina: 1,
      });
    } else {
      setFilters({
        titulo: '',
        modalidade: null,
        data_inicio: '',
        data_fim: '',
        estado: null,
        limite: 10,
        pagina: 1,
      });
    }

    setTimeout(() => {
      // TODO Procurar forma de atualizar apenas quando o setFilter atualizar/sessionStorage atualizar
      getEditais();
    }, 500);
  };

  // Pega a data de hoje para o filtro
  let today;
  (function getCurrentDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day.toString().length === 1) {
      day = `0${day}`;
    }
    if (month.toString().length === 1) {
      month = `0${month}`;
    }
    today = `${year}-${month}-${day}`;
  })();

  let editaisFiltrados = editais;

  function visualizarEdital(event) {
    const { id } = event.currentTarget;
    history.push(`/visualizar-edital/${editais[parseInt(id)].uuid}`);
  }

  // Renderiza os editais. Todos os operadores ternários definem o que renderizar, caso o formulário esteja sendo exibido no dashbord ou no cadastro de proposta (que contém conteúdo adicional)
  const renderEditais = (edital, index) => {
    const [anoInicial, mesInicial, diaInicial] = edital[1].data_inicio.split(
      '-',
    );
    const dataInicial = `${diaInicial}/${mesInicial}/${anoInicial}`;
    const [anoFinal, mesFinal, diaFinal] = edital[1].data_fim.split('-');
    const dataFinal = `${diaFinal}/${mesFinal}/${anoFinal}`;
    return (
      <tr key={index}>
        <td>
          <p>{edital[1].titulo}</p>
        </td>
        <td>
          <p>
            {edital[1].modalidades.map((item) => {
              if (
                edital[1].modalidades.indexOf(item) ===
                edital[1].modalidades.length - 1
              ) {
                return item;
              }
              return `${item}, `;
            })}
          </p>
        </td>
        <td>
          <p>{dataInicial}</p>
        </td>
        <td>
          <p>{dataFinal}</p>
        </td>
        <td>
          <button
            id={edital[0]}
            type="button"
            className="button-nostyle"
            onClick={visualizarEdital}
          >
            Ver Edital Completo
          </button>
        </td>
        {from === 'programa' ||
        from === 'curso' ||
        from === 'evento' ||
        from === 'projeto' ? (
          <td>
            {values.edital_resumo.uuid === edital[1].uuid ? (
              <Button
                onClick={handleClick}
                title="edital"
                id={edital[1].uuid}
                name={edital[1].titulo}
                className="button button-medium"
              >
                <p>Selecionado</p>
                <i className="material-icons">done</i>
              </Button>
            ) : (
              <Button
                onClick={handleClick}
                title="edital"
                id={edital[1].uuid}
                name={edital[1].titulo}
                className="button button-medium"
              >
                <p>Selecionar</p>
                <i className="material-icons">add</i>
              </Button>
            )}
          </td>
        ) : (
          <></>
        )}
      </tr>
    );
  };

  return (
    <section className="selecionar-edital">
      {from === 'programa' ||
      from === 'curso' ||
      from === 'evento' ||
      from === 'evento' ? (
        <>
          <button type="button" className="return" onClick={handleReturn}>
            <i className="material-icons md-24">keyboard_backspace</i>
            <p>Voltar ao menu</p>
          </button>
          <hr />
        </>
      ) : (
        <></>
      )}

      <div className="box">
        <Row>
          <Col xs="">
            {from === 'programa' ||
            from === 'curso' ||
            from === 'evento' ||
            from === 'evento' ? (
              <h3>1. Seleção de Edital</h3>
            ) : (
              <h3>Editais</h3>
            )}
            <hr />
          </Col>
        </Row>
        <div id="filtros">
          <h4>Filtros de Pesquisa</h4>
          <button
            type="button"
            className="limpar-filtros"
            onClick={limparFiltros}
          >
            Limpar filtros
          </button>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="titulo-evento">Título</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Insira o título da proposta que deseja buscar."
                  aria-label="Título"
                  aria-describedby="basic-addon1"
                  value={filters.titulo}
                  onChange={(e) => {
                    setFilters({ ...filters, titulo: e.target.value });
                  }}
                />
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <h6>Intervalo de Datas</h6>
            </Col>
          </Row>
          <Row>
            <FormGroup as={Col} md={3} controlId="dataInicial">
              <FormLabel>Data Inicial</FormLabel>
              <FormControl
                required
                type="date"
                min="1990-01-01"
                max={today}
                value={filters.data_inicio}
                onChange={(e) => {
                  setFilters({ ...filters, data_inicio: e.target.value });
                }}
              />
            </FormGroup>

            <FormGroup as={Col} md={3} controlId="dataFinal">
              <FormLabel>Data Final</FormLabel>
              <FormControl
                required
                type="date"
                min="1990-01-01"
                value={filters.data_fim}
                onChange={(e) => {
                  setFilters({ ...filters, data_fim: e.target.value });
                }}
              />
            </FormGroup>

            <FormGroup
              as={Col}
              xs={12}
              sm={4}
              md={3}
              lg={2}
              controlId="modalidade"
            >
              <FormLabel>Modalidade</FormLabel>
              <DropdownButton
                as={ButtonGroup}
                title={filters.modalidade ? filters.modalidade : 'Modalidade'}
                id="modalidades-evento"
                onSelect={(e, ev) => {
                  setFilters({ ...filters, modalidade: e });
                }}
              >
                <DropdownItem eventKey="Programa">Programa</DropdownItem>
                <DropdownItem eventKey="Projeto">Projeto</DropdownItem>
                <DropdownItem eventKey="Evento">Evento</DropdownItem>
                <DropdownItem eventKey="Curso">Curso</DropdownItem>
              </DropdownButton>
            </FormGroup>
          </Row>

          <Button
            className="button button-small button-search"
            onClick={getEditais}
          >
            <p>Buscar</p>
            <i className="material-icons button-icon">search</i>
          </Button>
        </div>
        <Row>
          <Col>
            <Table className="table-editais" responsive striped hover size="sm">
              {from === 'programa' ||
              from === 'curso' ||
              from === 'evento' ||
              from === 'projeto' ? (
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Modalidades</th>
                    <th>Aberto em</th>
                    <th>Prazo</th>
                    <th>Acessar Edital</th>
                    <th>Selecionar Edital</th>
                  </tr>
                </thead>
              ) : (
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Modalidades</th>
                    <th>Aberto em</th>
                    <th>Prazo</th>
                    <th>Acessar Edital</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {editaisFiltrados &&
                  Object.entries(editaisFiltrados).map(renderEditais)}
              </tbody>
            </Table>
            <div className="center-edital">
              <PaginationBasic
                paginate={paginate}
                totalPages={totalPages && totalPages}
                pageAtual={filters.pagina}
              />
            </div>
          </Col>
        </Row>
        {from === 'programa' ||
        from === 'curso' ||
        from === 'projeto' ||
        from === 'evento' ? (
          <Row className="justify-content-md-center">
            <Button
              id="next"
              className="button button-medium"
              onClick={handleClick}
            >
              <p>Próximo passo</p>
              <i className="material-icons">arrow_right</i>
            </Button>
          </Row>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};
export default SelecionarEdital;
