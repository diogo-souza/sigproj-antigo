import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  DropdownButton,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
  Row,
  Table,
} from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../Services/UserContext';
import api from '../../Services/sigproj/api';
import usePropostasFiltro from '../../Hooks/usePropostasFiltro';
import PaginationBasic from '../../Components/Pagination/Pagination';

const TodasPropostas = () => {
  const history = useHistory();

  const { getPropostaUuid } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem('session'));
  const [propostas, setPropostas] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  async function getPropostas() {
    try {
      const resPropostas = await api.get('/propostas/buscar', {
        params: JSON.parse(
          sessionStorage.getItem('@NovoSistemadeRegistro-FiltroTodasPropostas'),
        ),
      });
      console.log(resPropostas);
      setPropostas(resPropostas.data.content);
      setTotalPages(resPropostas.data.totalPages);
    } catch (error) {
      error;
    }
  }
  // console.log(propostaData);
  useEffect(() => {
    getPropostas();
  }, []);

  const [filters, setFilters] = useState({
    titulo: null,
    modalidade: null,
    departamento: null,
    limite: 10,
    pagina: 1,
  });

  useEffect(() => {
    sessionStorage.setItem(
      '@NovoSistemadeRegistro-FiltroTodasPropostas',
      JSON.stringify(filters),
    );
  }, [filters]);

  const filtrarPropostas = async () => {
    const filtros = sessionStorage.getItem(
      '@NovoSistemadeRegistro-FiltroTodasPropostas',
    );
    getPropostas();
  };

  const limparFiltros = () => {
    setFilters({
      titulo: null,
      modalidade: null,
      departamento: null,
      limite: 10,
      pagina: 1,
    });
    setTimeout(() => {
      // TODO Procurar forma de atualizar apenas quando o setFilter atualizar/sessionStorage atualizar
      getPropostas();
    }, 500);
  };

  const paginate = (pageNumber) => {
    setFilters({
      ...filters,
      pagina: pageNumber,
    });
    setTimeout(() => {
      // TODO Procurar forma de atualizar apenas quando o setFilter atualizar/sessionStorage atualizar
      getPropostas();
    }, 500);
  };

  console.log(totalPages);
  let propostasFiltradas = propostas;
  console.log(propostasFiltradas);

  const renderPropostas = (proposta, index) => (
    <tr key={index}>
      <td>{proposta.titulo}</td>
      <td>{proposta.edital_titulo}</td>
      <td>{proposta.modalidade}</td>
      <td>{proposta.departamento}</td>
      <td>
        <button
          id={proposta.uuid}
          type="button"
          className="button-nostyle"
          onClick={() => getPropostaUuid(proposta.uuid)}
        >
          Ver Prospota Completa
        </button>
      </td>
    </tr>
  );

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    if (id === 'cadastro') {
      history.push('/cadastro-proposta');
    }
  };
  filters;

  return (
    <section className="dashboard-propostas">
      <div className="box">
        <Row>
          <Col>
            <div className="title">
              <h3>Propostas Gerais</h3>
            </div>
            <hr />
            <div id="filtros">
              <h4>Filtros de Pesquisa</h4>
              <button
                type="button"
                className="limpar-filtros"
                onClick={limparFiltros}
              >
                Limpar filtros
              </button>
              <FormGroup as={Col} xs={12} controlId="filtro">
                <Row>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="titulo-prepend">
                        Título
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Insira o título da proposta que deseja buscar."
                      aria-label="Título"
                      aria-describedby="basic-addon1"
                      onChange={(e) => {
                        setFilters({ ...filters, titulo: e.target.value });
                      }}
                    />
                  </InputGroup>
                </Row>

                <Row>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="departamento-prepend">
                        Departamento
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Insira o departamento da proposta que deseja buscar."
                      aria-label="Departamento"
                      aria-describedby="basic-addon1"
                      onChange={(e) => {
                        setFilters({
                          ...filters,
                          departamento: e.target.value,
                        });
                      }}
                    />
                  </InputGroup>
                </Row>
              </FormGroup>

              <Row>
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
                    title={
                      filters.modalidade ? filters.modalidade : 'Modalidade'
                    }
                    id="modalidades-dropdown"
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
                onClick={filtrarPropostas}
              >
                <p>Buscar</p>
                <i className="material-icons button-icon">search</i>
              </Button>
            </div>
            <Table
              className="table-propostas"
              responsive
              striped
              hover
              size="sm"
            >
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Edital</th>
                  <th>Modalidade</th>
                  <th>Departamento</th>
                  <th>Acessar Proposta</th>
                </tr>
              </thead>
              <tbody>
                {propostasFiltradas && propostasFiltradas.map(renderPropostas)}
              </tbody>
            </Table>
            <div className="center">
              <PaginationBasic
                paginate={paginate}
                totalPages={totalPages && totalPages}
                pageAtual={filters.pagina}
              />
            </div>

            <div className="buttons">
              {/* <button type="button" className="button button-medium">
                <p>Consultar</p>
                <i className="material-icons button-icon">search</i>
              </button> */}
              <button
                type="button"
                className="button"
                id="cadastro"
                onClick={handleClick}
              >
                <p>Cadastrar</p>
                <i className="material-icons button-icon">add</i>
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default TodasPropostas;
