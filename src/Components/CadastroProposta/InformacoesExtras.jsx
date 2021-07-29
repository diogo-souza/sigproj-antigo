import React, { useState } from 'react';
import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Button,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CadastroCursoContext } from '../../Services/CadastroCursoContext';
import { CadastroEventoContext } from '../../Services/CadastroEventoContext';
import { CadastroProgramaContext } from '../../Services/CadastroProgramaContext';
import { CadastroProjetoContext } from '../../Services/CadastroProjetoContext';
import { saveProposta } from '../../Services/proposta';
import api from '../../Services/sigproj/api';

const InformacoesExtras = ({ from, step, setStep }) => {
  let values;
  let handleChanges;
  let contexto;

  const [editais, setEditais] = useState(null);
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
    ({ values, handleChanges } = React.useContext(contexto));
  }
  const history = useHistory();

  const atualizarProposta = async () => {
    try {
      const res = await api.put(`propostas/${values.uuid}`, {
        info_proposta: values.info_proposta,
        doc_chefia_imediata: 'documento chefia imediata',
      });
      // console.log(res);
      localStorage.setItem('prospostaResumo', JSON.stringify(res.data));
      setStep(step + 1);
    } catch (error) {
      // console.log(error.response);
      alert(
        `Não foi possível atualizar a proposta. Erro ${error.response.data.status} - ${error.response.data.titulo}`,
      );
    }
  };

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    if (id === 'next') {
      saveProposta('proposta-1212', values);
      atualizarProposta();
    } else {
      saveProposta('proposta-1212', values);
      setStep(step - 1);
    }
  };

  const handleReturn = () => {
    history.push('/dashboard');
  };

  return (
    <div className="informacoes-extras">
      <button type="button" className="return" onClick={handleReturn}>
        <i className="material-icons md-24">keyboard_backspace</i>
        <p>Voltar ao menu</p>
      </button>
      <hr />
      <Container>
        <Row className="justify-content-md-center">
          <Col className="box" lg="8">
            <Form>
              <FormLabel>
                <h3>7. Rede Sociais</h3>
              </FormLabel>
              <hr />
              <Form.Row>
                <FormGroup as={Col} controlId="email">
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    required
                    value={values.info_proposta.email}
                    onChange={handleChanges}
                    type="text"
                    title="info_proposta"
                    placeholder="Insira um email para contato"
                  />
                </FormGroup>
                <FormGroup as={Col} controlId="telefone">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl
                    required
                    value={values.info_proposta.telefone}
                    onChange={handleChanges}
                    type="text"
                    title="info_proposta"
                    placeholder="Insira um telefone para contato"
                  />
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} controlId="instagram">
                  <FormLabel>Instagram</FormLabel>
                  <FormControl
                    required
                    value={values.info_proposta.instagram}
                    onChange={handleChanges}
                    type="text"
                    title="info_proposta"
                    placeholder="Insira o Link"
                  />
                </FormGroup>
                <FormGroup as={Col} controlId="twitter">
                  <FormLabel>Twitter</FormLabel>
                  <FormControl
                    required
                    value={values.info_proposta.twitter}
                    onChange={handleChanges}
                    type="text"
                    title="info_proposta"
                    placeholder="Insira o Link"
                  />
                </FormGroup>
              </Form.Row>

              <Form.Row>
                <FormGroup as={Col} controlId="facebook">
                  <FormLabel>Facebook</FormLabel>
                  <FormControl
                    required
                    value={values.info_proposta.facebook}
                    onChange={handleChanges}
                    type="text"
                    title="info_proposta"
                    placeholder="Insira o Link"
                  />
                </FormGroup>
                <FormGroup as={Col} controlId="youtube">
                  <FormLabel>Youtube</FormLabel>
                  <FormControl
                    required
                    value={values.info_proposta.youtube}
                    onChange={handleChanges}
                    type="text"
                    title="info_proposta"
                    placeholder="Insira o Link"
                  />
                </FormGroup>
              </Form.Row>

              <Form.Row>
                <FormGroup as={Col} controlId="podcast">
                  <FormLabel>Podcast</FormLabel>
                  <FormControl
                    required
                    value={values.info_proposta.podcast}
                    onChange={handleChanges}
                    type="text"
                    title="info_proposta"
                    placeholder="Insira o Link"
                  />
                </FormGroup>
                <FormGroup as={Col} controlId="outro">
                  <FormLabel>Outro</FormLabel>
                  <FormControl
                    required
                    value={values.info_proposta.outro}
                    onChange={handleChanges}
                    type="text"
                    title="info_proposta"
                    placeholder="Insira o Link"
                  />
                </FormGroup>
              </Form.Row>
              <hr />

              <FormLabel>
                <h3>8. Considerações adicionais sobre a proposta</h3>
              </FormLabel>
              <hr />
              <Form.Row>
                <FormGroup as={Col} controlId="consideracoes_finais">
                  <FormLabel>
                    Espaço livre para o proponente dizer o que deseja
                  </FormLabel>
                  <FormControl
                    as="textarea"
                    value={values.info_proposta.consideracoes_finais}
                    onChange={handleChanges}
                    title="info_proposta"
                    placeholder="Insira suas Considerações Finais"
                    rows={5}
                  />
                </FormGroup>
              </Form.Row>

              <Form.Row className="justify-content-md-center">
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
                  <p>Próximo passo</p>
                  <i className="material-icons">arrow_right</i>
                </Button>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InformacoesExtras;
