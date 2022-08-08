// import React from 'react';
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import PendientesTabla from './PendientesTabla';
import { PendientesForm } from './PendientesForm';

const PendientesScreen = () => {

    const { activePendiente } = useSelector( state => state.pendiente );

    return (
      <React.Fragment>
        <Row>
          <Col>
            <Card>
            { !activePendiente ? 
              <>
                <PendientesTabla />
              </>
              : <>
                <PendientesForm />
              </> }
            </Card>
            
          </Col>
        </Row>
      </React.Fragment>
    );
};

export default PendientesScreen;
