/* eslint-disable no-param-reassign */
import React, { useRef } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { useHistory } from 'react-router';
import api from '../../Services/sigproj/api';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import useCadastroEdital from '../../Hooks/useCadastroEdital';
import {
  validateEmpty,
  validateModalidades,
} from '../../Hooks/formsValidations';

const CadastroEdital = () => {
  const {
    step,
    values,
    editorState,
    modalidades,
    errors,
    createMarkup,
    handleChanges,
    handleEditorChange,
    handleModalidades,
    setEditorState,
    setErrors,
  } = useCadastroEdital();
  const form = useRef();
  const history = useHistory();

  async function handleClick() {
    const containError = Object.values(errors).some(
      (error) => error !== null && error !== '',
    );

    if (!containError && form.current.checkValidity() === true) {
      try {
        // console.log(values);
        const res = await api.post('/editais', values);
        // console.log(res);
        alert('Edital cadastrado.');
        history.push('/dashboard');
      } catch (error) {
        // console.log(error);
      }

      // localStorage.setItem('edital', values)
    }
  }

  const handleBlur = (e) => {
    const { id } = e.currentTarget;
    let error;
    if (
      id === 'Curso' ||
      id === 'Evento' ||
      id === 'Projeto' ||
      id === 'Programa'
    ) {
      error = validateModalidades(modalidades);
    } else {
      error = validateEmpty(e);
    }
    setErrors({
      ...errors,
      ...error,
    });
  };

  const handleReturn = () => {
    history.push('/dashboard');
  };
  return (
    <div className="cadastro-edital">
      <Container>
        <div>
          <button type="button" className="return" onClick={handleReturn}>
            <i className="material-icons md-24">keyboard_backspace</i>
            <p>Voltar ao menu</p>
          </button>
          <hr />

          <Row className="justify-content-md-center">
            <Col className="box" lg="12">
              <h3>Cadastro de Edital</h3>
              <hr />
              <Form ref={form}>
                <Form.Row>
                  <FormGroup as={Col} controlId="titulo">
                    <FormLabel>Título do Edital</FormLabel>
                    <FormControl
                      required
                      value={values.titulo}
                      onChange={handleChanges}
                      onBlur={handleBlur}
                      type="text"
                    />
                    {errors.titulo && (
                      <p className="error">Preencha o título do Edital</p>
                    )}
                  </FormGroup>
                </Form.Row>
                <Form.Row>
                  <FormGroup as={Col} md="6" controlId="instituicao">
                    <FormLabel>Instituição</FormLabel>
                    <FormControl
                      disabled
                      as="select"
                      value={values.instituicao}
                      onChange={handleChanges}
                    >
                      <option value="">Selecione a Instituição</option>
                      <option value="Universidade Federal de Pernambuco">
                        Universidade Federal de Pernambuco
                      </option>
                    </FormControl>
                  </FormGroup>
                  <FormGroup as={Col} md={3} controlId="data_inicio">
                    <FormLabel>Data Inicial</FormLabel>
                    <FormControl
                      required
                      type="date"
                      value={values.data_inicio}
                      onChange={handleChanges}
                      onBlur={handleBlur}
                      min="1990-01-01"
                    />
                    {errors.data_inicio && (
                      <p className="error">Preencha a data inicial do Edital</p>
                    )}
                  </FormGroup>
                  {values.data_inicio && (
                    <FormGroup as={Col} md={3} controlId="data_fim">
                      <FormLabel>Data Final</FormLabel>
                      <FormControl
                        required
                        type="date"
                        value={values.data_fim}
                        onChange={handleChanges}
                        min={values.data_inicio}
                      />
                      {errors.data_fim && (
                        <p className="error">Preencha a data final do Edital</p>
                      )}
                    </FormGroup>
                  )}
                </Form.Row>
                <Form.Row>
                  <FormGroup as={Col} md="12" controlId="chamada">
                    <FormLabel>Chamada</FormLabel>
                    <FormControl
                      required
                      rows={3}
                      as="textarea"
                      value={values.chamada}
                      onChange={handleChanges}
                      onBlur={handleBlur}
                    />
                    {errors.chamada && (
                      <p className="error">Preencha a chamada do Edital</p>
                    )}
                  </FormGroup>
                </Form.Row>
                <Form.Row>
                  <FormGroup as={Col} md={3} controlId="modalidades">
                    <FormLabel>Modalidades</FormLabel>
                    <Form.Check
                      id="Curso"
                      type="checkbox"
                      label="Curso"
                      checked={modalidades.curso}
                      onChange={handleModalidades}
                      onBlur={handleBlur}
                    />
                    <Form.Check
                      id="Evento"
                      type="checkbox"
                      label="Evento"
                      checked={modalidades.evento}
                      onChange={handleModalidades}
                      onBlur={handleBlur}
                    />
                    <Form.Check
                      id="Programa"
                      type="checkbox"
                      label="Programa"
                      checked={modalidades.programa}
                      onChange={handleModalidades}
                      onBlur={handleBlur}
                    />
                    <Form.Check
                      id="Projeto"
                      type="checkbox"
                      label="Projeto"
                      checked={modalidades.projeto}
                      onChange={handleModalidades}
                      onBlur={handleBlur}
                    />
                    {errors.modalidades && (
                      <p className="error">Selecione ao menos uma modalidade</p>
                    )}
                  </FormGroup>
                </Form.Row>
                <Form.Row>
                  <FormGroup as={Col} controlId="corpoEdital">
                    <FormLabel>Corpo do Edital</FormLabel>
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={handleEditorChange}
                      wrapperClassName="editor-wrapper"
                      toolbarClassName="editor-toolbar"
                      editorClassName="editor-content"
                      stripPastedStyles
                      localization={{
                        locale: 'pt',
                      }}
                      toolbar={{
                        options: [
                          'inline',
                          'blockType',
                          'list',
                          'textAlign',
                          'embedded',
                        ],
                      }}
                    />
                  </FormGroup>
                </Form.Row>
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Button
              id="next"
              className="button button-medium"
              onClick={handleClick}
            >
              <p>Cadastrar Edital</p>
              <i className="material-icons">add</i>
            </Button>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default CadastroEdital;
