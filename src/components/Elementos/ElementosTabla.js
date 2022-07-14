// import React from 'react';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';

// import moment from 'moment';
import { ElementoItem } from './ElementoItem';
import { useDispatch, useSelector } from 'react-redux';
import { elementoSetActive, elementoStartLoading } from '../../actions/elementos';
// import { ElementoDetalle } from './ElementoDetalle';
import { tipoStartLoading } from '../../actions';

const ElementosTabla = () => {

    const dispatch = useDispatch();

    const { elementos, activeElemento } = useSelector( state => state.elemento );
    const { uid, proyecto } = useSelector( state => state.auth );

    const elementoNuevo = { 
        nuevo: true,
        tag: '',
        nombre: '',
        pid: '',
        testpack: '',
        observaciones: '',
        tipo: {
          _id: '',
          nombre: '',
          especialidad: ''
        },
        subsistema: {
          _id: '',
          nombre: '',
          sistema: {
            _id: '',
            nombre: ''
          }
        },
        sistema: '',
        uid: uid,
        proyecto: proyecto,
        ...activeElemento
    }

    const [buscar, setBuscar] = useState('');
    const [desde, setDesde] = useState(0);
    const limite = 20;

    const handleInputChangeBuscar = ({ target }) => {
      setBuscar(target.value);
    }

    const handleSiguiente = () => {
      setDesde(desde + limite);
    }

    const handleAnterior = () => {
      setDesde(desde - limite)
    }

    const handleNuevo = () => {
        dispatch( elementoSetActive(elementoNuevo));
    }

    useEffect(() => {
        dispatch( elementoStartLoading( buscar, desde, limite ) );
        dispatch( tipoStartLoading( '', 0, 200 ) );
    }, [ dispatch, buscar, desde, limite ])

    return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5" className='pb-4'>Listado de elementos</Card.Title>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control" 
                      name="buscar"
                      autoComplete="off"
                      placeholder="Buscar"
                      value={ buscar }
                      onChange={ handleInputChangeBuscar } 
                    />
                    <select >
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <div className="input-group-append">
                      <button 
                        className="btn btn-outline-success"
                        type="button"
                        onClick={ handleNuevo }
                      >
                        Nuevo
                      </button>
                    </div>
                  </div>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                    <tr>
                        <th scope="col">TAG</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">PID</th>
                        <th scope="col">Testpack</th>
                        <th scope="col">Subsistema</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Especialidad</th>
                        <th scope="col" />
                    </tr>
                </thead>
                <tbody>
                    {
                        elementos.sort((o1, o2) => {
                          if ( o1.codigo < o2.codigo ){
                            return -1;
                          } else if ( o1.codigo > o2.codigo ) {
                            return 1;
                          } else {
                            return 0;
                          }
                        }).map( elementos => (
                            <ElementoItem
                                key={ elementos.id }
                                { ...elementos }
                            />
                        ))
                    }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Hover Table</Card.Title>
              <span className="d-block m-t-5">
                use props <code>hover</code> with <code>Table</code> component
              </span>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Striped Table</Card.Title>
              <span className="d-block m-t-5">
                use props <code>striped</code> with <code>Table</code> component
              </span>
            </Card.Header>
            <Card.Body>
              <Table striped responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default ElementosTabla;
