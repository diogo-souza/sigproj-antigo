import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Form,
  Container,
} from 'react-bootstrap';
import useConsulta from '../../Hooks/useConsulta';
import { UserContext } from '../../Services/UserContext';

const ConsultaAcao = () => {
  const history = useHistory();
  const [consult, setConsult] = useState(false);
  const { userSession } = useContext(UserContext);
  const {
    handleChange,
    dadosConsulta,
    setDadosConsulta,
    validated,
    handleSubmitConsultar,
  } = useConsulta();

  const handleReturn = () => {
    history.go(-1);
  };

  return (
    <div className="consulta">
      <Container>
        <div>
          <button type="button" className="return" onClick={handleReturn}>
            <i className="material-icons md-24">keyboard_backspace</i>
            <p>Voltar</p>
          </button>
        </div>
        <header className="cabecalho">
          <h1>Ações de Extensão Registradas</h1>
        </header>

        {consult === false ? (
          <div className="box-all">
            <Row className="justify-content-md-center">
              <Col className="boxForm" md="8">
                <div className="titulo">
                  <h2>Realize uma Consulta Rápida</h2>
                </div>
                <Form
                  className="consulta-especifica"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmitConsultar}
                >
                  <Form.Row>
                    <FormGroup as={Col} controlId="titulo">
                      <FormLabel>Título</FormLabel>
                      <FormControl
                        type="text"
                        placeholder="Insira o titulo"
                        value={dadosConsulta.titulo}
                        maxLength="100"
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Preencha.
                      </Form.Control.Feedback>
                    </FormGroup>
                  </Form.Row>
                  <Form.Row className="row-btn">
                    <Button
                      className="button button-medium"
                      id="button"
                      value={dadosConsulta.titulo}
                      onClick={() => setConsult(!consult)}
                    >
                      <p>Refinar busca</p>
                      <i className="material-icons button-icon">person</i>
                    </Button>
                    <Button
                      className="button button-medium"
                      id="button"
                      type="submit"
                    >
                      <p>Consultar</p>
                      <i className="material-icons button-icon">person</i>
                    </Button>
                  </Form.Row>
                </Form>
              </Col>
            </Row>
          </div>
        ) : (
          <div className="box-all">
            <Row className="justify-content-md-center">
              <Col className="boxForm" md="12">
                <div className="titulo">
                  <h2>Especificações</h2>
                </div>
                <div>
                  <h3>Consulta Simples</h3>
                  <hr />
                </div>
                <Form
                  className="consulta-especifica"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmitConsultar}
                >
                  <Form.Row>
                    <FormGroup as={Col} controlId="titulo">
                      <FormLabel>Título</FormLabel>
                      <FormControl
                        type="text"
                        placeholder="Insira o titulo completo"
                        value={dadosConsulta.titulo}
                        maxLength="100"
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Preencha.
                      </Form.Control.Feedback>
                    </FormGroup>
                    {/* <FormGroup as={Col} controlId="membro">
                      <FormLabel>Membro</FormLabel>
                      <FormControl

                        type="text"
                        placeholder="Insira o nome do membro"
                        value={dadosConsulta.membro}
                        maxLength="100"
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Preencha.
                      </Form.Control.Feedback>
                    </FormGroup> */}
                  </Form.Row>
                  <Form.Row>
                    {/* <FormGroup as={Col} md="2" controlId="data">
                      <FormLabel>Ano da Ação</FormLabel>
                      <FormControl

                        type="date"
                        onChange={handleChange}
                        value={dadosConsulta.data}
                      />
                      <Form.Control.Feedback type="invalid">
                        Preencha sua data de nascimento.
                      </Form.Control.Feedback>
                    </FormGroup> */}
                    {/* <FormGroup as={Col} controlId="numero_protocolo">
                      <FormLabel>Número do Protocolo</FormLabel>
                      <FormControl

                        type="text"
                        placeholder="Insira seu numero_protocolo completo"
                        value={dadosConsulta.numero_protocolo}
                        maxLength="100"
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Preencha seu numero_protocolo.
                      </Form.Control.Feedback>
                    </FormGroup> */}
                    {/* <FormGroup as={Col} md="6" controlId="edital">
                      <FormLabel>Edital</FormLabel>
                      <FormControl

                        type="text"
                        placeholder="Preencha o título do Edital."
                        value={dadosConsulta.edital}
                        maxLength="100"
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Preencha o título do Edital.
                      </Form.Control.Feedback>
                    </FormGroup> */}
                  </Form.Row>
                  <div>
                    <h3>Consulta Detalhada</h3>
                    <hr />
                  </div>
                  <Form.Row>
                    <FormGroup as={Col} controlId="area_tematica">
                      <FormLabel>Área Temática</FormLabel>
                      <FormControl
                        type="text"
                        placeholder="Preencha a Área Temática."
                        value={dadosConsulta.area_tematica}
                        maxLength="100"
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Preencha a Área Temática.
                      </Form.Control.Feedback>
                    </FormGroup>
                  </Form.Row>
                  <Form.Row>
                    <FormGroup as={Col} controlId="centro">
                      <FormLabel>Centro</FormLabel>
                      <FormControl
                        as="select"
                        value={dadosConsulta.centro}
                        onChange={handleChange}
                      >
                        <option>Selecione o centro</option>
                        <option>CAC - Centro de Artes e Comunicação</option>
                        <option>CB - Centro de Biociências</option>
                        <option>
                          CCEN - Centro de Ciências Exatas e da Natureza
                        </option>
                        <option>CCJ - Centro de Ciências Jurídicas</option>
                        <option>CCS - Centro de Ciências da Sáude</option>
                        <option>CCM - Centro de Ciências Médicas</option>
                        <option>
                          CCSA - Centro de Ciências Sociais Aplicadas
                        </option>
                        <option>CE - Centro de Educação</option>
                        <option>
                          CFCH - Centro de Filosofia e Ciências Humanas
                        </option>
                        <option>CIn - Centro de Informática</option>
                        <option>
                          CTG - Centro de Tecnologia e Geociências
                        </option>
                      </FormControl>
                    </FormGroup>
                    <FormGroup as={Col} controlId="departamento">
                      <FormLabel>Departamento</FormLabel>
                      <FormControl
                        as="select"
                        onChange={handleChange}
                        value={dadosConsulta.departamento}
                      >
                        <option>Selecione o departamento</option>
                        <option value="Artes">Departamento de Artes</option>
                        <option value="Informatica">
                          Departamento de Informática
                        </option>
                        <option value="Letras">Departamento de Letras</option>
                        <option value="Saude">Departamento de Saúde</option>
                        <option value="Exatas">Departamento de Exatas</option>
                      </FormControl>
                    </FormGroup>
                    <FormGroup as={Col} controlId="modalidade">
                      <FormLabel>Modalidade</FormLabel>
                      <FormControl
                        as="select"
                        onChange={handleChange}
                        value={dadosConsulta.modalidade}
                      >
                        <option>Selecione a Modalidade</option>
                        <option>Projeto</option>
                        <option>Evento</option>
                        <option>Curso</option>
                        <option>Programa</option>
                        <option>Prestação de Serviços</option>
                      </FormControl>
                    </FormGroup>
                  </Form.Row>
                  <Form.Row className="row-btn">
                    <Button
                      className="button button-medium"
                      id="button"
                      onClick={() => setConsult(!consult)}
                    >
                      <p>Consulta Rápida</p>
                      <i className="material-icons button-icon">person</i>
                    </Button>
                    <Button
                      className="button button-medium"
                      id="button"
                      type="submit"
                    >
                      <Link to="/consulta-resultado/" />
                      <p>Consultar</p>
                      <i className="material-icons button-icon">person</i>
                    </Button>
                  </Form.Row>
                </Form>
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ConsultaAcao;
