import React, { useContext, useRef, useEffect } from 'react';
import {
  Button,
  Col,
  Row,
  Container,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import { useHistory } from 'react-router';
import ScrollTopArrow from '../../Components/ScrollArrow/ScrollArrow';
import { UserContext } from '../../Services/UserContext';
import useConsulta from '../../Hooks/useConsulta';
import PaginationBasic from '../../Components/Pagination/Pagination';

const ConsultaResultado = () => {
  const inputEl = useRef('');
  const history = useHistory();
  const { listaPropostas, getPropostaUuid, getPropostas } = useContext(
    UserContext,
  );
  const { handleChange, dadosConsulta, paginate } = useConsulta();

  useEffect(() => {
    getPropostas(dadosConsulta);
  }, [dadosConsulta]);

  const handleReturn = () => {
    history.go(-2);
  };

  return (
    <div className="consulta">
      <Container>
        <Row className="justify-content-md-center">
          <Col className="conteudo-col texto-principal">
            <div>
              <header className="header-resultado">
                <button type="button" className="return" onClick={handleReturn}>
                  <i className="material-icons md-24">keyboard_backspace</i>
                  <p>Voltar</p>
                </button>
                <h1 ref={inputEl} id="ref">
                  Resultados
                </h1>

                <FormGroup as={Col} md="1" controlId="limite">
                  <FormControl
                    as="select"
                    value={dadosConsulta.limite}
                    onChange={handleChange}
                  >
                    <option>4</option>
                    <option>8</option>
                    <option>12</option>
                    <option>16</option>
                    <option>20</option>
                  </FormControl>
                </FormGroup>
              </header>
              {listaPropostas &&
                listaPropostas.content.map((list) => (
                  <div className="textos" key={list.id}>
                    <h2 id={list.titulo}>{list.titulo}</h2>
                    <hr />
                    <p>Area Tematica:{list.area_tematica}</p>
                    <p>Centro: {list.centro}</p>
                    <p>Departamento: {list.departamento}</p>
                    <p>Edital Titulo: {list.edital_titulo}</p>
                    <p>Modalidade: {list.modalidade}</p>
                    <Row className="row-btn">
                      <Button
                        className="button button-small"
                        id="button"
                        onClick={() => getPropostaUuid(list.uuid)}
                      >
                        <p>Ver mais</p>
                        <i className="material-icons button-icon">person</i>
                      </Button>
                    </Row>
                  </div>
                ))}
            </div>
            <div className="button-up">
              <ScrollTopArrow estado={inputEl} />
            </div>
            <PaginationBasic
              paginate={paginate}
              totalPages={listaPropostas && listaPropostas.totalPages}
              pageAtual={dadosConsulta.pagina}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ConsultaResultado;
