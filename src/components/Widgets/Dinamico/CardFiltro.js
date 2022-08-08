import React from 'react'
import { Collapse, Row, Col, Card } from 'react-bootstrap'
import SelectReact from 'react-select'

export const CardFiltro = ( { visible, datos } ) => {
    
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
        <Collapse in={ visible }>
            <Card.Header>
                <Row id="basic-collapse" className='row-cols-1 row-cols-md-3 g-4'>
                    <Col>
                        <p className='mb-2'>
                            Especialidad
                        </p> 
                        <SelectReact 
                            placeholder='Especialidad' 
                            styles={ getStyle }
                        />
                    </Col>
                    <Col>
                        <p className='mb-2'>
                            Especialidad
                        </p> 
                        <SelectReact 
                            placeholder='Especialidad' 
                            styles={ getStyle }
                        />
                    </Col>
                    
                </Row>
            </Card.Header>
        </Collapse>
    )
}
