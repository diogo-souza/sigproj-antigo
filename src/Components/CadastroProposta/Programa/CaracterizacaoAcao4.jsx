import React, { useEffect, useRef, useState } from 'react';
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
import api from '../../../Services/sigproj/api';
import { CadastroProgramaContext } from '../../../Services/CadastroProgramaContext';
import { validateObjectiveFields } from '../../../Hooks/formsValidations';
import { saveProposta } from '../../../Services/proposta';
import { CadastroProjetoContext } from '../../../Services/CadastroProjetoContext';

const CaracterizacaoAcao4 = ({ from, step, setStep }) => {
  let values;
  let setValues;

  let handleObjetivoEspecifico;
  let errors;
  let setErrors;
  let contexto;
  let handleChanges;
  let objetivoEspecifico;

  const [proposta, setProposta] = useState({});
  if (from === 'programa') {
    contexto = CadastroProgramaContext;
  } else if (from === 'projeto') {
    contexto = CadastroProjetoContext;
  }
  if (contexto) {
    ({
      values,
      errors,
      setErrors,
      handleObjetivoEspecifico,
      objetivoEspecifico,
      handleChanges,
      setValues,
    } = React.useContext(contexto));
  }

  useEffect(() => {
    const fetchProposta = async () => {
      const result = await api.get(`/propostas/buscar/${values.uuid}`);
      setProposta(result.data);
    };
    fetchProposta();
  }, []);
  // console.log(proposta);
  const history = useHistory();
  const form = useRef();

  const atualizarProposta = async () => {
    const dates = values.objetivosEspecificos.map((objetivo) => {
      const date = new Date(objetivo.data_inicio);
      const realDate = new Date(
        date.getTime() + Math.abs(date.getTimezoneOffset() * 60000),
      );
      return realDate;
    });
    // console.log(proposta);
    let objetivosCadastrados;
    let idsObjetivosCadastrados;
    if (proposta[from].objetivos_especificos.length) {
      objetivosCadastrados = proposta[from].objetivos_especificos.map(
        (objetivo) => objetivo.objetivo_especifico,
      );
      idsObjetivosCadastrados = proposta[from].objetivos_especificos.map(
        (objetivo) => objetivo.id,
      );
    }
    const objetivosEspecificos = values.objetivosEspecificos.map((objetivo) => {
      let obj;
      let index = -1;
      if (objetivosCadastrados) {
        index = objetivosCadastrados.indexOf(objetivo.objetivo_especifico);
      }
      if (index !== -1) {
        obj = {
          objetivo_especifico: objetivo.objetivo_especifico,
          atividades: objetivo.atividades,
          desenvolvimento_atv: objetivo.desenvolvimento_atv,
          data_inicio: `${objetivo.data_inicio}-01`,
          data_fim: `${objetivo.data_fim}-01`,
          horas_semanais: objetivo.horas_semanais,
          id: idsObjetivosCadastrados[index],
        };
      } else {
        obj = {
          objetivo_especifico: objetivo.objetivo_especifico,
          atividades: objetivo.atividades,
          desenvolvimento_atv: objetivo.desenvolvimento_atv,
          data_inicio: `${objetivo.data_inicio}-01`,
          data_fim: `${objetivo.data_fim}-01`,
          horas_semanais: objetivo.horas_semanais,
        };
      }
      return obj;
    });
    // console.log(objetivosEspecificos);
    const sorted = dates.sort((a, b) => a.getTime() - b.getTime());

    try {
      const response1 = await api.put(`propostas/${from}/${values.uuid}`, {
        objetivos_especificos: objetivosEspecificos,
      });
      const response2 = await api.put(`propostas/${values.uuid}`, {
        periodo_inicio: dates[0],
        periodo_fim: dates[dates.length - 1],
      });
      // console.log(response1);
      // console.log(response2);
      const monthNames = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Augosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ];
      setValues({
        ...values,
        periodoExecucao: `${
          monthNames[dates[0].getMonth()]
        } de ${dates[0].getFullYear()} a ${
          monthNames[dates[dates.length - 1].getMonth()]
        } de ${dates[dates.length - 1].getFullYear()}`,
      });
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
      const containError = Object.values(errors).some(
        (error) => error !== null && error !== '',
      );
      if (!containError && form.current.checkValidity() === true) {
        atualizarProposta();
      }
    } else {
      setErrors({});
      handleChanges(e);
      setStep(step - 1);
    }
  };
  const handleReturn = () => {
    history.push('/dashboard');
  };

  const handleBlur = (e) => {
    let error = validateObjectiveFields(e);
    setErrors({
      ...errors,
      ...error,
    });
    saveProposta('proposta-1212', values);
  };

  const renderObjetivosEspecificos = (objEspecifico, index) => (
    <>
      <h5>
        Objetivo Específico {index + 1}:{' '}
        <b>{objEspecifico.objetivo_especifico}</b>
      </h5>
      <Form.Row>
        <FormGroup as={Col} controlId="atividades">
          <FormLabel>Atividade a Desenvolver</FormLabel>
          <FormControl
            name={index}
            onChange={handleObjetivoEspecifico}
            value={objEspecifico.atividades}
            required
            as="textarea"
            onBlur={handleBlur}
          />
          {errors[`atividades${index}`] && (
            <p className="error">
              Insira as atividades referente ao objetivo específico {index + 1}
            </p>
          )}
        </FormGroup>
      </Form.Row>
      <Form.Row>
        <FormGroup as={Col} controlId="desenvolvimento_atv">
          <FormLabel>Descrição do Desenvolvimento</FormLabel>
          <FormControl
            name={index}
            value={objEspecifico.desenvolvimento_atv}
            onChange={handleObjetivoEspecifico}
            required
            as="textarea"
            onBlur={handleBlur}
          />
          {errors[`desenvolvimento_atv${index}`] && (
            <p className="error">
              Insira uma descrição da atividade referente ao objetivo específico{' '}
              {index + 1}
            </p>
          )}
        </FormGroup>
      </Form.Row>
      <Form.Row>
        <FormGroup as={Col} md="3" controlId="data_inicio">
          <FormLabel>Data Inicial do Desenvolvimento</FormLabel>
          <FormControl
            name={index}
            value={objEspecifico.data_inicio}
            onChange={handleObjetivoEspecifico}
            placeholder="Janeiro, Feveiro, Março..."
            required
            type="month"
            onBlur={handleBlur}
          />
          {errors[`data_inicio${index}`] && (
            <p className="error">Insira uma data válida</p>
          )}
        </FormGroup>
        {objEspecifico.data_inicio !== '' ? (
          <FormGroup as={Col} md="3" controlId="data_fim">
            <FormLabel>Data Final do Desenvolvimento</FormLabel>
            <FormControl
              name={index}
              value={objEspecifico.data_fim}
              onChange={handleObjetivoEspecifico}
              placeholder="Janeiro, Feveiro, Março..."
              required
              type="month"
              min={objEspecifico.data_inicio}
              onBlur={handleBlur}
            />
            {errors[`data_fim${index}`] && (
              <p className="error">Insira uma data válida</p>
            )}
          </FormGroup>
        ) : (
          <></>
        )}

        <FormGroup as={Col} md="3" controlId="horas_semanais">
          <FormLabel>Carga Horária Semanal</FormLabel>
          <FormControl
            name={index}
            value={objEspecifico.horas_semanais}
            onChange={handleObjetivoEspecifico}
            required
            placeholder="30, 60..."
            type="number"
            min="0"
            onBlur={handleBlur}
          />
          {errors[`horas_semanais${index}`] && (
            <p className="error">Insira uma carga horária maior que 0</p>
          )}
        </FormGroup>
      </Form.Row>
      <hr />
    </>
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
            <h3>3.3 Caracterização da Ação</h3>
            <h6>
              Dados Aplicáveis ao Registro de Programas de Extensão sem
              Movimentação Financeira
            </h6>
            <hr />
            <Form noValidate ref={form}>
              {values.objetivosEspecificos &&
                values.objetivosEspecificos.map(renderObjetivosEspecificos)}
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

export default CaracterizacaoAcao4;
