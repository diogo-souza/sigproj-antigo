import React, { useRef, useState } from 'react';
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
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CadastroEventoContext } from '../../Services/CadastroEventoContext';
import { TooltipsTexts } from '../../Utils/TooltipsTexts';
import { validateEmpty } from '../../Hooks/formsValidations';
import { saveProposta } from '../../Services/proposta';
import api from '../../Services/sigproj/api';
import { CadastroProjetoContext } from '../../Services/CadastroProjetoContext';

const InserirEventoCurso = ({ from, step, setStep }) => {
  const history = useHistory();
  const [evento, setEvento] = useState('');
  const [curso, setCurso] = useState('');

  const {
    values,
    setValues,
    handleChanges,
    errors,
    setErrors,
    handlePropostaBasica,
    addEvento,
    addCurso,
    removeCurso,
    removeEvento,
  } = React.useContext(CadastroProjetoContext);
  // console.log(values);
  const adicionarEventoCurso = async (e) => {
    // console.log(e.target.id);
    if (
      (evento !== '' && e.target.id === 'add-evento') ||
      (curso !== '' && e.target.id === 'add-curso')
    ) {
      try {
        let res;
        if (evento !== '' && e.target.id === 'add-evento') {
          res = await api.get(`propostas/buscar?titulo=${evento}`);
        } else {
          res = await api.get(`propostas/buscar?titulo=${curso}`);
        }
        // console.log(res);
        if (res.data.content.length > 0) {
          if (
            !values.eventosVinculados.includes({
              uuid: res.data.content[0].uuid,
              titulo: res.data.content[0].titulo,
            }) &&
            !values.cursosVinculados.includes({
              uuid: res.data.content[0].uuid,
              titulo: res.data.content[0].titulo,
            })
          ) {
            if (
              e.target.id === 'add-evento' &&
              res.data.content[0].modalidade === 'Evento'
            ) {
              const ev = await api.get(
                `propostas/buscar/${res.data.content[0].uuid}`,
              );
              if (ev.data.evento.projeto === null) {
                try {
                  const resPut = await api.put(
                    `propostas/projeto/${values.uuid}`,
                    {
                      eventos_vincular: [res.data.content[0].uuid],
                    },
                  );
                  // console.log(resPut);
                  addEvento(
                    res.data.content[0].uuid,
                    res.data.content[0].titulo,
                  );
                } catch (error) {
                  // console.log(error);
                }
              } else {
                alert('Evento já vinculado a uma proposta.');
              }
            } else if (
              e.target.id === 'add-curso' &&
              res.data.content[0].modalidade === 'Curso'
            ) {
              const cur = await api.get(
                `propostas/buscar/${res.data.content[0].uuid}`,
              );
              // console.log(cur);
              if (cur.data.curso.projeto === null) {
                try {
                  const resPut = await api.put(
                    `propostas/projeto/${values.uuid}`,
                    {
                      cursos_vincular: [res.data.content[0].uuid],
                    },
                  );
                  // console.log(resPut);
                  addCurso(
                    res.data.content[0].uuid,
                    res.data.content[0].titulo,
                  );
                } catch (error) {
                  // console.log(error);
                }
              } else {
                alert('Curso já vinculado a uma proposta.');
              }
            }
          } else {
            alert('Proposta já adicionada.');
          }
        } else {
          alert('Proposta não encontrada. Verifique o título.');
        }
        // // console.log(res);
      } catch (error) {
        alert('Não foi possível realizar a busca da proposta.');
        // console.log(error);
      }
    } else {
      alert('Insira o título da proposta desejada.');
    }
  };

  const removerEvento = async (e) => {
    const { id } = e.target;
    const { uuid } = values.eventosVinculados[id];
    // console.log(uuid);
    try {
      const resPut = await api.put(`propostas/projeto/${values.uuid}`, {
        eventos_desvincular: [uuid],
      });
      // console.log(resPut);
      removeEvento(id);
    } catch (e) {
      // console.log(e);
      alert(`Não foi possível remover o evento.`);
    }
  };

  const removerCurso = async (e) => {
    const { id } = e.target;
    const { uuid } = values.cursosVinculados[id];
    try {
      const resPut = await api.put(`propostas/projeto/${values.uuid}`, {
        cursos_desvincular: [uuid],
      });
      // console.log(resPut);
      removeCurso(id);
    } catch (e) {
      // console.log(e);
      alert(`Não foi possível remover o evento.`);
    }
  };

  const renderEventosVinculados = (evento, index) => (
    // console.log(evento);
    <tr key={evento.uuid}>
      <td>{evento.titulo}</td>
      <td>
        {' '}
        <button
          type="button"
          onClick={removerEvento}
          className="button-nostyle"
          id={index}
        >
          Remover
        </button>
      </td>
    </tr>
  );
  const renderCursosVinculados = (curso, index) => (
    <tr key={curso.uuid}>
      <td>{curso.titulo}</td>
      <td>
        <button
          type="button"
          onClick={removerCurso}
          className="button-nostyle"
          id={index}
        >
          Remover
        </button>
      </td>
    </tr>
  );

  const handleClick = (e) => {
    const { id } = e.target;
    if (id === 'next') {
      const containError = Object.values(errors).some(
        (error) => error !== null && error !== '',
      );
      if (!containError) {
        setStep(step + 1);
      }
    } else {
      setErrors({});
      setStep(step - 1);
    }
  };

  const handleChange = (e) => {
    handleChanges(e);
    handlePropostaBasica(e);
  };

  const handleBlur = (e) => {
    let error = validateEmpty(e);
    setErrors({
      ...errors,
      ...error,
    });
    saveProposta('proposta-1212', values);
  };

  const handleReturn = () => {
    history.push('/dashboard');
  };

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
            <h3>3.1 Caracterização da Ação</h3>
            <h6>
              Dados Aplicáveis ao Registro de Programas de Extensão sem
              Movimentação Financeira
            </h6>
            <hr />
            <Form>
              <Form.Row>
                <FormGroup as={Col} controlId="evento">
                  <FormLabel>Evento Relacionado ao Projeto</FormLabel>
                  <FormControl
                    required
                    value={evento}
                    onChange={(e) => setEvento(e.target.value)}
                    type="text"
                    placeholder="Insira o título do evento"
                  />
                </FormGroup>
              </Form.Row>

              <Button id="add-evento" onClick={adicionarEventoCurso}>
                Adicionar Evento
              </Button>

              <Table className="table" responsive striped hover size="sm">
                <thead>
                  <tr>
                    <th>Evento</th>
                    <th>Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {values.eventosVinculados &&
                    values.eventosVinculados.map(renderEventosVinculados)}
                </tbody>
              </Table>

              <hr />
              <Form.Row>
                <FormGroup as={Col} controlId="curso">
                  <FormLabel>Curso Relacionado ao Projeto</FormLabel>
                  <FormControl
                    required
                    value={curso}
                    onChange={(e) => setCurso(e.target.value)}
                    type="text"
                    placeholder="Insira o título do curso"
                  />
                </FormGroup>
              </Form.Row>

              <Button id="add-curso" onClick={adicionarEventoCurso}>
                Adicionar Curso
              </Button>

              <Table className="table" responsive striped hover size="sm">
                <thead>
                  <tr>
                    <th>Curso</th>
                    <th>Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {values.cursosVinculados &&
                    values.cursosVinculados.map(renderCursosVinculados)}
                </tbody>
              </Table>
            </Form>
            <hr />
            <Row className="justify-content-md-center">
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
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InserirEventoCurso;
