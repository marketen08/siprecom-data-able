// import React from 'react';
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import ElementosTabla from './ElementosTabla';
import { ElementosForm } from './ElementosForm';

const ElementosScreen = () => {

    const { activeElemento } = useSelector( state => state.elemento );

    return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
          { !activeElemento ? 
            <>
              <ElementosTabla />
            </>
            : <>
              <ElementosForm />
            </> }
          </Card>
          
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ElementosScreen;
