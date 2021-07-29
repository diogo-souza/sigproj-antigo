/* eslint-disable no-param-reassign */
import React, { useRef, useState } from 'react';
import DOMPurify from 'dompurify';

import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap';
import { useHistory } from 'react-router';
import api from '../Services/sigproj/api';


const VisualizarEdital = (props) => {
  const history = useHistory();
  const createMarkup = (html) => ({
    __html: DOMPurify.sanitize(html),
  });
  const [edital, setEdital] = useState(null);

  const handleClick = () => {
    history.push('/dashboard')
  }
  async function getEdital() {
    const edital = await api.get(`/editais/${props.match.params.id}`);
    setEdital(edital.data);
  }

  getEdital();
  return (
    <div className="cadastro-edital">
      <Container>
        <div className="caracterizacao-acao">
          <button type="button" className="return" onClick={handleClick}>
            <i className="material-icons md-24">keyboard_backspace</i>
            <p>Voltar ao menu</p>
          </button>
          <hr />
        </div>
        <Row>
          <Col>
            {edital && (
              <div dangerouslySetInnerHTML={createMarkup(edital.corpo)} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VisualizarEdital;
