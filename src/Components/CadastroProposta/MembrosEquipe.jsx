/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Button,
  Table,
  Popover,
  OverlayTrigger,
  Alert,
} from 'react-bootstrap';
import { CadastroProgramaContext } from '../../Services/CadastroProgramaContext';
import { TooltipsTexts } from '../../Utils/TooltipsTexts';
import {
  validateEmpty,
  validateCPF,
  validateNumber,
  validateEmail,
  validateMembrosEquipe,
} from '../../Hooks/formsValidations';
import { saveProposta } from '../../Services/proposta';
import { CadastroCursoContext } from '../../Services/CadastroCursoContext';
import { CadastroEventoContext } from '../../Services/CadastroEventoContext';
import api from '../../Services/sigproj/api';
import { CadastroProjetoContext } from '../../Services/CadastroProjetoContext';

const MembrosEquipe = ({ step, setStep, from }) => {
  const history = useHistory();
  let values;
  let handleChanges;
  let errors;
  let setErrors;
  let membro;
  let editMembro;
  let deleteMembro;
  let handleMembro;
  let editandoMembro;
  let propostaGeral;
  let handlePropostaGeral;
  let contexto;
  const membrosEquipe = useRef(null);
  const cadastrado = useRef(null);
  const naoCadastrado = useRef(null);
  const [proposta, setProposta] = useState({});
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const fetchProposta = async () => {
      const result = await api.get(`/propostas/buscar/${values.uuid}`);
      setProposta(result.data);
    };
    fetchProposta();
  }, []);

  // console.log(proposta);

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
    ({
      values,
      handleChanges,
      errors,
      setErrors,
      membro,
      editMembro,
      deleteMembro,
      handleMembro,
      editandoMembro,
      propostaGeral,
      handlePropostaGeral,
    } = React.useContext(contexto));
  }

  useEffect(() => {
    // console.log(values.usuarios_proposta);
    let error = validateMembrosEquipe(values.usuarios_proposta);
    setErrors({
      ...errors,
      ...error,
    });
    if (error.membrosEquipe !== '') {
      setAlert(true);
    } else {
      setAlert(false);
    }
  }, [values]);

  const popover = (id) => (
    <Popover id="popover-positioned-right">
      <Popover.Title as="h3">Dica:</Popover.Title>
      {TooltipsTexts.filter((element) => element.id === id).map((tooltip) => (
        <Popover.Content>{tooltip.text}</Popover.Content>
      ))}
    </Popover>
  );

  const form = useRef();

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    if (id === 'next') {
      const containError = Object.values(errors).some(
        (error) => error !== null && error !== '',
      );
      if (values.usuarios_proposta.length >= 1 && !containError) {
        setStep(step + 1);
      }
    } else {
      setErrors({});
      setStep(step - 1);
    }
  };

  const handleBlur = (e) => {
    const { id } = e.currentTarget;
    let error;
    if (id === 'cpf') {
      error = validateCPF(e);
    } else if (id === 'carga_horaria') {
      error = validateNumber(e);
    } else if (id === 'email') {
      error = validateEmail(e);
    } else {
      error = validateEmpty(e);
    }
    setErrors({
      ...errors,
      ...error,
    });
    saveProposta('proposta-1212', values);
  };

  const handleReturn = () => {
    history.push('/dashboard');
  };

  const addMembro = async (e) => {
    // TODO Eu preciso checar se o usuário é realmente do tipo inserido
    const containError = Object.values(errors).some(
      (error) =>
        error !== null &&
        error !== '' &&
        error !==
          'A proposta precisa incluir pelo menos um membro discente de graduação da UFPE.',
    );
    // console.log(errors);
    // console.log(values);
    if (
      membro.cpf !== null &&
      membro.nome !== '' &&
      membro.funcao !== '' &&
      membro.carga_horaria !== 0 &&
      membro.email !== '' &&
      !containError
    ) {
      let user;
      // console.log(membro);
      if (cadastrado.current.checked) {
        // console.log('teste');
        try {
          user = {
            carga_horaria: membro.carga_horaria,
            cpf: membro.cpf,
            funcao: membro.funcao,
            nome: membro.nome,
            tipo_institucional: membro.tipo,
          };
          const res = await api.put(`propostas/${values.uuid}`, {
            usuarios_proposta_cadastrados: [user],
          });
          // console.log(res);
          handleChanges(e);
        } catch (e) {
          // console.log(e);
        }
      } else if (naoCadastrado.current.checked) {
        // console.log('teste');
        try {
          user = {
            carga_horaria: membro.carga_horaria,
            cpf: membro.cpf,
            email: membro.email,
            funcao: membro.funcao,
            nome: membro.nome,
            tipo_institucional: membro.tipo,
          };
          // console.log(user);
          const res = await api.put(`propostas/${values.uuid}`, {
            usuarios_proposta_nao_cadastrados: [user],
          });
          // console.log(res);
          handleChanges(e);
        } catch (e) {
          // console.log(e);
        }
      }
    }
  };

  const deletarMembro = async (e) => {
    let membrosCadastrados;
    let idsMembrosCadastrados;
    let uuidMembrosCadastrados;
    const result = await api.get(`/propostas/buscar/${values.uuid}`);
    setProposta(result.data);

    if (result.data.usuarios_proposta.length) {
      membrosCadastrados = result.data.usuarios_proposta.map(
        (usuario) => usuario.usuario.cpf,
      );
      idsMembrosCadastrados = result.data.usuarios_proposta.map(
        (usuario) => usuario.usuario.uuid,
      );
      uuidMembrosCadastrados = result.data.usuarios_proposta.map(
        (usuario) => usuario.usuario.uuid,
      );
    }

    let index = -1;
    // console.log(membrosCadastrados);
    if (membrosCadastrados) {
      index = membrosCadastrados.indexOf(
        values.usuarios_proposta[e.target.id].cpf,
      );
    }
    // console.log(index);
    if (index !== -1) {
      // console.log(idsMembrosCadastrados);
      if (idsMembrosCadastrados[index] !== null) {
        // console.log(membrosCadastrados[index]);
        try {
          const res = await api.put(`propostas/${values.uuid}`, {
            remover_usuarios_cadastrados: [uuidMembrosCadastrados[index]],
          });
          deleteMembro(e);
          // console.log(res);
        } catch (e) {
          // console.log(e);
        }
      } else {
        try {
          const res = await api.put(`propostas/${values.uuid}`, {
            remover_usuarios_nao_cadastrados: [membrosCadastrados[index]],
          });
          // console.log(res);
          deleteMembro(e);
          // console.log(res);
        } catch (e) {
          // console.log(e);
        }
      }
    }
  };

  const renderMembros = (usuario_proposta, index) => (
    <tr key={index}>
      <td>{usuario_proposta.cpf}</td>
      <td>{usuario_proposta.nome}</td>
      <td>{usuario_proposta.email}</td>
      <td>{usuario_proposta.funcao}</td>
      <td>{usuario_proposta.carga_horaria}</td>
      <td>
        <button
          type="button"
          className="button-nostyle"
          id={index}
          onClick={editMembro}
        >
          Editar
        </button>
      </td>
      <td>
        <button
          type="button"
          className="button-nostyle"
          id={index}
          onClick={deletarMembro}
        >
          Remover
        </button>
      </td>
    </tr>
  );

  return (
    <div className="caracterizacao-acao">
      <button type="button" className="return" onClick={handleReturn}>
        <i className="material-icons md-24">keyboard_backspace</i>
        <p>Voltar ao menu</p>
      </button>
      <hr />
      <Container>
        <Row className="justify-content-md-center">
          <Col className="box" lg="12">
            <h3>5. Membros da Equipe</h3>
            <hr />
            <Form noValidate ref={form}>
              <FormLabel ref={membrosEquipe}>
                <h5>Membros Vinculados ao Programa</h5>
                <OverlayTrigger
                  placement="right"
                  overlay={popover('membrosEquipe')}
                  container={membrosEquipe.current}
                >
                  <i className="material-icons">help_outline</i>
                </OverlayTrigger>
              </FormLabel>

              <Form.Row>
                <FormGroup as={Col} md="3" controlId="cpf">
                  <FormLabel>CPF</FormLabel>
                  <FormControl
                    required
                    value={membro.cpf}
                    onChange={handleMembro}
                    type="text"
                    placeholder="Insira o CPF do Membro"
                    onBlur={handleBlur}
                  />
                  {errors.cpf && <p className="error">{errors.cpf}</p>}
                </FormGroup>
                <FormGroup as={Col} md="9" controlId="nome">
                  <FormLabel>Nome</FormLabel>
                  <FormControl
                    required
                    value={membro.nome}
                    onChange={handleMembro}
                    type="text"
                    placeholder="Insira o Nome do Membro"
                  />
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} md="3" controlId="tipo">
                  <FormLabel>Tipo Institucional</FormLabel>
                  <FormControl
                    as="select"
                    value={membro.tipo}
                    onChange={handleMembro}
                    onBlur={handleBlur}
                  >
                    <option value="">Escolha o Tipo Institucional</option>
                    <option value="Docente">Docente da UFPE</option>
                    <option value="Discente Graduacao">
                      Discente de graduação da UFPE
                    </option>
                    <option value="Discente Pos-Graduacao">
                      Discente de pós-graduação da UFPE
                    </option>
                    <option value="Tecnico Administrativo">
                      Técnico Administrativo da UFPE
                    </option>
                    <option value="Outro">Outro</option>
                  </FormControl>
                  {errors.tipo && <p className="error">{errors.tipo}</p>}
                </FormGroup>

                <FormGroup as={Col} md="2" controlId="carga_horaria">
                  <FormLabel>Carga Horária</FormLabel>
                  <FormControl
                    required
                    value={membro.carga_horaria}
                    onChange={handleMembro}
                    type="number"
                    placeholder="Insira a Carga Horária do Membro"
                    onBlur={handleBlur}
                  />
                  {errors.carga_horaria && (
                    <p className="error">{errors.carga_horaria}</p>
                  )}
                </FormGroup>
                <FormGroup as={Col} controlId="funcao">
                  <FormLabel>Função</FormLabel>
                  <FormControl
                    required
                    as="select"
                    value={membro.funcao}
                    onChange={handleMembro}
                    placeholder="Insira a Função do Membro"
                    onBlur={handleBlur}
                  >
                    <option value="">Escolha a Função</option>
                    <option value="Coordenador(a)">Coordenador(a)</option>
                    <option value="Vice-Coordenador">Vice-Coordenador</option>
                    <option value="Membro Docente da equipe de execução">
                      Membro Docente da equipe de execução
                    </option>
                    <option value="Membro Discente da equipe de execução (não bolsista)">
                      Membro Discente da equipe de execução (não bolsista)
                    </option>
                    <option value="Discente Bolsista da equipe de execução">
                      Discente Bolsista da equipe de execução
                    </option>
                    <option value="Colaborador(a) (integrante da equipe de execução não vinculado à UFPE)">
                      Colaborador(a) (integrante da equipe de execução não
                      vinculado à UFPE)
                    </option>
                    <option value="Ministrante (para cursos)">
                      Ministrante (para cursos)
                    </option>
                    <option value="Palestrante (para eventos)">
                      Palestrante (para eventos)
                    </option>
                  </FormControl>

                  {errors.funcao && <p className="error">{errors.funcao}</p>}
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <FormGroup as={Col} controlId="email">
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    required
                    value={membro.email}
                    onChange={handleMembro}
                    type="text"
                    placeholder="Insira o Email do Membro"
                    onBlur={handleBlur}
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </FormGroup>
              </Form.Row>
              <Form.Check
                ref={cadastrado}
                name="cadastro-radio"
                type="radio"
                id="usuario-cadastrado"
                label="Usuário cadastrado no sistema"
              />

              <Form.Check
                ref={naoCadastrado}
                name="cadastro-radio"
                type="radio"
                label="Usuário não cadastrado no sistema"
                id="usuario-nao-cadastrado"
              />

              {
                // Muda o botão se estiver adicionando ou editando um projeto
                editandoMembro === false ? (
                  <Button id="add-usuario_proposta" onClick={addMembro}>
                    Adicionar Membro
                  </Button>
                ) : (
                  <Button id="edit-usuario_proposta" onClick={addMembro}>
                    Editar Membro
                  </Button>
                )
              }
              <Table className="table" responsive striped hover size="sm">
                <thead>
                  <tr>
                    <th>CPF</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Função</th>
                    <th>Carga Horária</th>
                    <th>Editar</th>
                    <th>Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {values.usuarios_proposta &&
                    values.usuarios_proposta.map(renderMembros)}
                </tbody>
              </Table>
              {alert && <Alert variant="danger">{errors.membrosEquipe}</Alert>}
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

export default MembrosEquipe;
