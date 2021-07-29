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
  Popover,
  OverlayTrigger,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CadastroCursoContext } from '../../Services/CadastroCursoContext';
import { CadastroEventoContext } from '../../Services/CadastroEventoContext';
import { CadastroProgramaContext } from '../../Services/CadastroProgramaContext';
import { CadastroProjetoContext } from '../../Services/CadastroProjetoContext';
import { TooltipsTexts } from '../../Utils/TooltipsTexts';

const DocumentosObrigatorios = ({ step, setStep, from }) => {
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
  const declaracaoChefia = useRef(null);

  const popover = (id) => (
    <Popover id="popover-positioned-right">
      <Popover.Title as="h3">Dica:</Popover.Title>
      {TooltipsTexts.filter((element) => element.id === id).map((tooltip) => (
        <Popover.Content>{tooltip.text}</Popover.Content>
      ))}
    </Popover>
  );

  const handleClick = (e) => {
    const { id } = e.currentTarget;
    if (id === 'next') {
      setStep(step + 1);
    } else {
      setStep(step - 1);
    }
  };

  const handleReturn = () => {
    history.push('/dashboard');
  };

  return (
    <div className="documentos-obrigatorios">
      <button type="button" className="return" onClick={handleReturn}>
        <i className="material-icons md-24">keyboard_backspace</i>
        <p>Voltar ao menu</p>
      </button>
      <hr />
      <Container>
        <Row className="justify-content-md-center">
          <Col className="box" lg="7">
            <h3>X. Documentação Obrigatória</h3>
            <hr />
            <Form>
              <Form.Row>
                <FormGroup as={Col} controlId="titulo-acao">
                  <FormLabel ref={declaracaoChefia}>
                    Declaração de ciência da chefia imediata ou órgão colegiado
                    do local de lotação
                    <OverlayTrigger
                      placement="right"
                      overlay={popover('documentoChefia')}
                      container={declaracaoChefia.current}
                    >
                      <i className="material-icons">help_outline</i>
                    </OverlayTrigger>
                  </FormLabel>
                  <Form.File
                    id="custom-file-translate-html"
                    label="Arquivo PDF"
                    data-browse="Anexar"
                    custom
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    (declaração ou ad referendum assinada com cargo e SIAPE)
                    contendo o nome da ação, o nome do proponente, CH total da
                    ação, período de início e fim da ação e edital ao qual está
                    sendo submetido, visto que é condição indispensável à
                    aprovação de quaisquer propostas.
                  </Form.Text>
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

export default DocumentosObrigatorios;
