// import React from 'react';
import React, { useEffect, useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { elementoSetActive, elementoStartLoading } from '../../actions/elementos';
import { tipoStartLoading } from '../../actions';

import { ElementosTablaItem } from './ElementosTablaItem';
import { CardFiltro } from '../Widgets/Dinamico/CardFiltro';

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

    const datosTabla = {
      tabla: 'Elementos',
      campos: ['Especialidad', 'Tipo', 'Subsistema']
    }

    const [filtroVisible, setFiltroVisible] = useState(false);
    const [buscar, setBuscar] = useState('');
    const [desde, setDesde] = useState(0);
    const limite = 20;

    const handleFiltroVisible = () => {
      console.log('hoja');
      setFiltroVisible(!filtroVisible);
      console.log(filtroVisible);
    }

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
      <Card.Header>
        <Card.Title as="h5">Listado de elementos</Card.Title>
        { true ? 
        <span className="d-block m-t-5">
          ESPECIALIDAD: <code>(MECANICA, ELECTRICIDAD)</code> TIPO DE ELEMENTO <code>(BOMBA DE PRESIÓN, VÁLVULA)</code>
        </span> : <></> }
        
          <div className="input-group mt-2">
              <input 
                type="text" 
                className="form-control m-2" 
                name="buscar"
                autoComplete="off"
                placeholder="Buscar"
                value={ buscar }
                onChange={ handleInputChangeBuscar }
              />
            <div className="input-group-append p-2">
              <button 
                className="btn btn-outline-success"
                type="button"
                onClick={ handleNuevo }
              >
                Nuevo
              </button>
            </div>
            <div className="input-group-append p-2">
              {/* <IcoFiltro /> */}
              <Button onClick={ handleFiltroVisible }>Collapse Button</Button>
            </div>
          </div>
      </Card.Header>
      <CardFiltro visible={ filtroVisible } datos={ datosTabla } />
      <Card.Body>
        <Table responsive hover>
          <thead>
              <tr>
                  <th scope="col" />
                  <th scope="col">TAG</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">PID</th>
                  <th scope="col">Testpack</th>
                  <th scope="col">Subsistema</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Especialidad</th>
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
                      <ElementosTablaItem
                          key={ elementos.id }
                          { ...elementos }
                      />
                  ))
              }
          </tbody>
        </Table>
      </Card.Body>
    </React.Fragment>
  );
};

export default ElementosTabla;
