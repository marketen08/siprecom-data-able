import React from 'react';
import { ListGroup, Dropdown, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import SelectReact from 'react-select'

const IcoFiltro = () => {
    
  const getStyle = {
    control: (provided, state) => ({
        ...provided,
        cursor: 'pointer',
    }),
    option: (provided, state) => ({
        ...provided,
        cursor: 'pointer',
    })

};

  return (
    <>
        <Dropdown>
            <Dropdown.Toggle as={ Button } className="btn btn-outline-secondary"  to="#" id="dropdown-basic">
                <i className="icon feather icon-filter" />
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight className="profile-notification">
            <ListGroup as="ul" variant="flush" className="pro-body">
                <Link to="#" className="dropdown-item">
                    <Row>
                        <Col className='p-2'>
                            Especialidad
                        </Col>
                        <Col>
                            <SelectReact 
                                placeholder='Especialidad' 
                                styles={ getStyle }
                            />
                        </Col>
                    </Row>
                </Link>
                <Link to="#" className="dropdown-item">
                    <Row>
                        <Col className='p-2'>
                            Tipo de elemento
                        </Col>
                        <Col>
                            <SelectReact placeholder='Tipo de elemento' />
                        </Col>
                    </Row>
                </Link>
                <Link to="#" className="dropdown-item">
                    <Row>
                        <Col className='p-2'>
                            Subsistema
                        </Col>
                        <Col>
                            <SelectReact placeholder='Subsistema' />
                        </Col>
                    </Row>
                </Link>
            </ListGroup>
            </Dropdown.Menu>
        </Dropdown>
    </>
  );
};

export default IcoFiltro;
