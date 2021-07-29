import React from 'react';

// React-Bootstrap componentes
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';

const Contato = () => (
  <div className="contato">
    <Container>
      <h1>Fale Conosco</h1>
      <hr className="hr-1" />
      <div className="form">
        <Form>
          <FormGroup>
            <FormLabel>Nome</FormLabel>
            <FormControl type="text" placeholder="Digite seu nome" />
          </FormGroup>
          <FormGroup>
            <FormLabel>Instituição</FormLabel>
            <FormControl as="select" custom>
              <option>Escolha uma Instituição</option>
              <option>Universidade Federal de Pernambuco - UFPE</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>Tipo de Usuário</FormLabel>
            <FormControl as="select" custom>
              <option>Escolha um Tipo Institucional</option>
              <option>Dicente</option>
              <option>Docente</option>
              <option>Técnico Administrativo</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>Assunto</FormLabel>
            <FormControl
              type="text"
              placeholder="Digite o assunto que deseja tratar"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Mensagem</FormLabel>
            <FormControl
              as="textarea"
              rows={10}
              placeholder="Detalhe o porquê do contato"
            />
          </FormGroup>
        </Form>
      </div>
    </Container>
  </div>
);

export default Contato;
