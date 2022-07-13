import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import Card from '../../components/Card/MainCard';

import { useDispatch, useSelector } from 'react-redux';
import { startLogin } from '../../actions/auth';

const SamplePage = () => {

  const dispatch = useDispatch();
  const { uid } = useSelector( state => state.auth );

  const Email = 'marketen@gmail.com';
  const Password = '123456';

  const handleLogin = () => {
    console.log('Hola');
    dispatch( startLogin( Email, Password ) );
    console.log(uid);
  }

 
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title="Hello Card" isOption>
            <Button
              onClick={ handleLogin }
              className="btn btn-success"
            >
              Ingresar
            </Button>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SamplePage;
