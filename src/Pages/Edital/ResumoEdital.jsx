import React, { useContext } from 'react';
import { useHistory } from 'react-router';

import { Form, Container, Badge } from 'react-bootstrap';
import InputText from '../../Components/Forms/InputText';

const ResumoEdital = () => {
  const history = useHistory();
  const editalUuid = JSON.parse(localStorage.getItem('editalResumo'));
  let campoAberto = true;

  const situacaoEdital = (status) => {
    if (editalUuid.ativo === true) {
      return <Badge variant="success">Ativo</Badge>;
    }
    return <Badge variant="warning">Fechada</Badge>;
  };

  const handleReturn = () => {
    history.go(-1);
  };

  return (
    <div className="consulta">
      <Container>
        <header className="header-resultado">
          <button type="button" className="return" onClick={handleReturn}>
            <i className="material-icons md-24">keyboard_backspace</i>
            <p>Voltar</p>
          </button>
          <h1>Resumo do Edital</h1>
          {situacaoEdital(editalUuid.estado)}
        </header>
        <hr />
        <div className="resumo box-all">
          <div className="boxForm">
            <Form>
              <InputText
                label="Titulo"
                value={editalUuid.titulo}
                disabled={campoAberto}
              />
              <InputText
                label="Chamada"
                value={editalUuid.chamada}
                disabled={campoAberto}
              />
              <InputText
                label="Corpo"
                value={editalUuid.corpo}
                disabled={campoAberto}
              />
              <InputText
                label="Data Final"
                value={editalUuid.data_fim}
                disabled={campoAberto}
              />
              <InputText
                label="Data Inicio"
                value={editalUuid.data_inicio}
                disabled={campoAberto}
              />
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default ResumoEdital;
