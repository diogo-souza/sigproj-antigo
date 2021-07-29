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

const ConsultaResultadoEdital = () => {
  const inputEl = useRef('');
  const history = useHistory();
  const { listaEditais, getEditalUuid, getEditais } = useContext(UserContext);

  const {
    handleChangeEdital,
    dadosConsultaEditais,
    paginateEdital,
  } = useConsulta();

  useEffect(() => {
    getEditais(dadosConsultaEditais);
  }, [dadosConsultaEditais]);

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
                    value={dadosConsultaEditais.limite}
                    onChange={handleChangeEdital}
                  >
                    <option>4</option>
                    <option>8</option>
                    <option>12</option>
                    <option>16</option>
                    <option>20</option>
                  </FormControl>
                </FormGroup>
              </header>
              {listaEditais &&
                listaEditais.content.map((list) => (
                  <div className="textos" key={list.uuid}>
                    <h2 id={list.titulo}>{list.titulo}</h2>
                    <hr />
                    <p>Status: {list.ativo ? 'Ativo' : 'Fechado'}</p>
                    <p>Data Inicial: {list.data_inicio}</p>
                    <p>Data Final: {list.data_fim}</p>
                    {list.modalidades &&
                      list.modalidades.map((mod, index) => (
                        <p key={list.uuid.concat(index)}>
                          Modalidade {index + 1}: {mod}
                        </p>
                      ))}

                    <Row className="row-btn">
                      <Button
                        className="button button-small"
                        id="button"
                        onClick={() => getEditalUuid(list.uuid)}
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
              paginate={paginateEdital}
              totalPages={listaEditais && listaEditais.totalPages}
              pageAtual={dadosConsultaEditais.pagina}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ConsultaResultadoEdital;
