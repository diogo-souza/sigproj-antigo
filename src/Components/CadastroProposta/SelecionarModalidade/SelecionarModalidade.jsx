import React from 'react';
import { Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
// import { CadastroProgramaContext } from '../../../Services/CadastroProgramaContext';

const SelecionarModalidade = (props) => {
  const modalidades = [
    'Projeto',
    'Evento',
    'Curso',
    'Programa',
    // 'Prestação de Serviços',
  ];
  const history = useHistory();

  function handleChange(event) {
    const { id } = event.currentTarget;
    props.handleModalidade(id);
  }

  function handleReturn() {
    history.push('/dashboard');
  }

  return (
    <div className="selecionar-modalidade">
      <button type="button" className="return" onClick={handleReturn}>
        <i className="material-icons md-24">keyboard_backspace</i>
        <p>Voltar ao menu</p>
      </button>
      <hr />
      <Row className="justify-content-md-center">
        <Col>
          <h1 className="title">Selecione a modalidade da Proposta</h1>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <Card className="card-modalidades">
            <ListGroup variant="flush">
              {modalidades.map((modalidade) => (
                <ListGroupItem
                  onClick={handleChange}
                  key={modalidade.id}
                  title="modalidade"
                  id={modalidade}
                  className="item-modalidades"
                >
                  {modalidade}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SelecionarModalidade;
