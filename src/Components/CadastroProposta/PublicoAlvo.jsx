import React, { useRef, useState, useEffect } from 'react';
import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Button,
  Alert,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CadastroProgramaContext } from '../../Services/CadastroProgramaContext';
import {
  validateNumber,
  validatePublicoExterno,
} from '../../Hooks/formsValidations';
import { saveProposta } from '../../Services/proposta';
import { CadastroCursoContext } from '../../Services/CadastroCursoContext';
import { CadastroEventoContext } from '../../Services/CadastroEventoContext';
import api from '../../Services/sigproj/api';
import { CadastroProjetoContext } from '../../Services/CadastroProjetoContext';

const PublicoAlvo = ({ from, step, setStep }) => {
  const history = useHistory();
  let values;
  let handleChanges;
  let contexto;
  let errors;
  let setErrors;
  const [editais, setEditais] = useState(null);
  const [alert, setAlert] = useState(false);
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
    ({ values, handleChanges, errors, setErrors } = React.useContext(contexto));
  }
  // console.log(from);
  const form = useRef();

  useEffect(() => {
    // console.log(values.publico_externo);
    let error = validatePublicoExterno(values.publico_externo);
    setErrors({
      ...errors,
      ...error,
    });
    if (error.publicoExterno !== '') {
      setAlert(true);
    } else {
      setAlert(false);
    }
  }, [values.publico_externo]);

  const atualizarProposta = async () => {
    try {
      const res = await api.put(`propostas/${values.uuid}`, {
        publico_externo: values.publico_externo,
        publico_interno: values.publico_interno,
      });
      // console.log(res);
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
      let error = validatePublicoExterno(values.publico_externo);
      setErrors({
        ...errors,
        ...error,
      });
      const containError = Object.values(errors).some(
        (error) => error !== null && error !== '',
      );
      if (!containError && form.current.checkValidity() === true) {
        atualizarProposta();
      }
    } else {
      setErrors({});
      setStep(step - 1);
    }
  };

  const handleReturn = () => {
    history.push('/dashboard');
  };

  const handleBlur = (e) => {
    let error = validateNumber(e);
    setErrors({
      ...errors,
      ...error,
    });
    saveProposta('proposta-1212', values);
  };
  return (
    <div className="publico-alvo">
      <button type="button" className="return" onClick={handleReturn}>
        <i className="material-icons md-24">keyboard_backspace</i>
        <p>Voltar ao menu</p>
      </button>
      <hr />
      <Container>
        <Row className="justify-content-md-center">
          <Col className="box" md="8">
            <h3>4. Publico Alvo</h3>
            <hr />
            <Form noValidate ref={form}>
              <FormLabel>
                <h5>Publico Interno</h5>
              </FormLabel>
              <FormGroup
                as={Col}
                className="d-none d-md-inline-block"
                controlId="table-header"
              >
                <Form.Row>
                  <Col className="teste" md="10">
                    <FormLabel>
                      <h6>Grupo</h6>
                    </FormLabel>
                  </Col>
                  <Col md="2">
                    <FormLabel>
                      <h6>Quantidade</h6>
                    </FormLabel>
                  </Col>
                </Form.Row>
              </FormGroup>
              <FormGroup controlId="docentes">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>Docentes</FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_interno"
                      type="number"
                      value={values.publico_interno.docentes}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.docentes && <p>{errors.docentes}</p>}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>
              <FormGroup controlId="discentes_grad">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>Discentes de Graduação</FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_interno"
                      type="number"
                      value={values.publico_interno.discentes_grad}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.number && <p>{errors.number}</p>}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>
              <FormGroup controlId="discentes_pos">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>Discentes de Pós Graduação</FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_interno"
                      type="number"
                      value={values.publico_interno.discentes_pos}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.discentesPos && <p>{errors.discentesPos}</p>}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>
              <FormGroup controlId="tecs_adm">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>Técnicos Administrativos</FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_interno"
                      type="number"
                      value={values.publico_interno.tecs_adm}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.tecnicosAdministrativos && (
                      <p>{errors.tecnicosAdministrativos}</p>
                    )}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>
              <FormGroup controlId="outros">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>Outros</FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_interno"
                      type="number"
                      value={values.publico_interno.outros}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.outros && <p>{errors.outros}</p>}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>

              <FormLabel>
                <h5>Publico Externo</h5>
              </FormLabel>
              <FormGroup
                as={Col}
                className="d-none d-md-inline-block"
                controlId="table-header"
              >
                <Form.Row>
                  <Col className="teste" md="10">
                    <FormLabel>
                      <h6>Grupo</h6>
                    </FormLabel>
                  </Col>
                  <Col md="2">
                    <FormLabel>
                      <h6>Quantidade</h6>
                    </FormLabel>
                  </Col>
                </Form.Row>
              </FormGroup>

              <FormGroup controlId="servidores_federais">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>
                      Servidores de Instituições Governamentais Federais
                    </FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_externo"
                      type="number"
                      value={values.publico_externo.servidores_federais}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.servidoresFederais && (
                      <p>{errors.servidoresFederais}</p>
                    )}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>

              <FormGroup controlId="discentes_federais">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>
                      Discentes de outras Instituições Governamentais Federais
                    </FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_externo"
                      type="number"
                      value={values.publico_externo.discentes_federais}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.discentesFederais && (
                      <p>{errors.discentesFederais}</p>
                    )}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>

              <FormGroup controlId="servidores_estaduais">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>
                      Servidores de Instituições Governamentais Estaduais
                    </FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_externo"
                      type="number"
                      value={values.publico_externo.servidores_estaduais}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.servidoresEstaduais && (
                      <p>{errors.servidoresEstaduais}</p>
                    )}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>

              <FormGroup controlId="discentes_estaduais">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>
                      Discentes de Instituições Governamentais Estaduais
                    </FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_externo"
                      type="number"
                      value={values.publico_externo.discentes_estaduais}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.discentesEstaduais && (
                      <p>{errors.discentesEstaduais}</p>
                    )}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>

              <FormGroup controlId="servidores_municipais">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>
                      Servidores de Instituições Governamentais Municipais
                    </FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_externo"
                      type="number"
                      value={values.publico_externo.servidores_municipais}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.servidoresMunicipais && (
                      <p>{errors.servidoresMunicipais}</p>
                    )}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>

              <FormGroup controlId="discentes_municipais">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>
                      Discentes de Instituições Governamentais Municipais
                    </FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_externo"
                      type="number"
                      value={values.publico_externo.discentes_municipais}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.discentesMunicipais && (
                      <p>{errors.discentesMunicipais}</p>
                    )}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>

              <FormGroup controlId="organizacoes_privadas">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>Organizações de Iniciativa Privada </FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_externo"
                      type="number"
                      value={values.publico_externo.organizacoes_privadas}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.organizacoesPrivadas && (
                      <p>{errors.organizacoesPrivadas}</p>
                    )}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>

              <FormGroup controlId="movimentos_sociais">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>Movimentos Sociais</FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_externo"
                      type="number"
                      value={values.publico_externo.movimentos_sociais}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.movimentosSociais && (
                      <p>{errors.movimentosSociais}</p>
                    )}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>

              <FormGroup controlId="ongs">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>
                      Organizações Não Governamentais (ONGs/OSCIPs)
                    </FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_externo"
                      type="number"
                      value={values.publico_externo.ongs}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.ongs && <p>{errors.ongs}</p>}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>

              <FormGroup controlId="organizacoes_sindicais">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>Organizações Sindicais</FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_externo"
                      type="number"
                      value={values.publico_externo.organizacoes_sindicais}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.organizacoesSindicais && (
                      <p>{errors.organizacoesSindicais}</p>
                    )}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>

              <FormGroup controlId="grupos_comunitarios">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>Grupos Comunitários</FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_externo"
                      type="number"
                      value={values.publico_externo.grupos_comunitarios}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.gruposComunitarios && (
                      <p>{errors.gruposComunitarios}</p>
                    )}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>

              <FormGroup controlId="outros">
                <Form.Row as={Col}>
                  <Col md="10">
                    <FormLabel>Outros</FormLabel>
                  </Col>
                  <Col md="2">
                    <FormControl
                      required
                      title="publico_externo"
                      type="number"
                      value={values.publico_externo.outros}
                      onChange={handleChanges}
                      min={0}
                      onBlur={handleBlur}
                    />
                    {errors.outros && <p>{errors.outros}</p>}
                  </Col>
                </Form.Row>
                <hr className="hrTable" />
              </FormGroup>
              {alert && <Alert variant="danger">{errors.publicoExterno}</Alert>}
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

export default PublicoAlvo;
