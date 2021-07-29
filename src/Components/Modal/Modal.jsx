import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { UserContext } from '../../Services/UserContext';

export default function MyVerticallyCenteredModal(props) {
  const { errorsHTTP, setErrorsHTTP, setModalShow, modalShow } = useContext(
    UserContext,
  );

  const handleResetClose = () => {
    setErrorsHTTP({
      ...errorsHTTP,
      codigo: '',
      titulo: '',
      texto: '',
      userText: '',
    });
    return setModalShow(false);
  };

  return (
    <Modal
      show={modalShow}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {errorsHTTP.codigo}
          {errorsHTTP.titulo}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorsHTTP.texto}
        {errorsHTTP.userText}
      </Modal.Body>
      <Modal.Footer>
        <Button className="button button-small" onClick={handleResetClose}>
          <p>Fechar</p>
          <i className="material-icons button-icon">close</i>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
