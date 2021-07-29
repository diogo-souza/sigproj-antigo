import React, { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const PageNotFound = () => {
  const mystyle = {
    width: '80px',
    height: '80px',
  };

  return (
    <div className="page-not-found">
      <Container>
        <div className="box-all">
          <Row className="justify-content-md-center">
            <SentimentVeryDissatisfiedIcon style={mystyle}/>
            <h1>404 - Página não encontrada</h1>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default PageNotFound;
