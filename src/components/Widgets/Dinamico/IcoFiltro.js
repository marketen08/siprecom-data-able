import React from 'react';
import { ListGroup, Dropdown, Row, Col, Button } from 'react-bootstrap';

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

    const classNameMenu = 'dropdown-item bg-transparent text-dark'


  return (
    <>
        <Dropdown>
            <Dropdown.Toggle as={ Button } className="btn btn-outline-secondary"  to="#" id="dropdown-basic">
                <i className="icon feather icon-filter" />
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight className="profile-notification">
            <ListGroup >
                <span className={classNameMenu}>
                    <Row>
                        <Col>
                            Especialidad
                        </Col>
                        <Col>
                            <SelectReact 
                                placeholder='Especialidad' 
                                styles={ getStyle }
                            />
                        </Col>
                    </Row>
                </span>
                <span className={classNameMenu}>
                    <Row>
                        <Col>
                            Tipo de elemento
                        </Col>
                        <Col>
                            <SelectReact 
                                placeholder='Tipo de elemento' 
                                styles={ getStyle }
                            />
                        </Col>
                    </Row>
                </span>
                <span className={classNameMenu}>
                    <Row>
                        <Col>
                            Subsistema
                        </Col>
                        <Col>
                            <SelectReact placeholder='Subsistema' />
                        </Col>
                    </Row>
                </span>
            </ListGroup>
            </Dropdown.Menu>
        </Dropdown>
    </>
  );
};

export default IcoFiltro;
