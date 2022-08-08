// import React from 'react';
import React, { useEffect, useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import {  pendienteSetActive, 
          pendienteStartLoading, 
          sistemaStartLoading, 
          subsistemaStartLoading, 
          elementoStartLoading, 
          usuariosStartLoading } from '../../actions';

import { PendientesTablaItem } from './PendientesTablaItem';
import { CardFiltro } from '../Widgets/Dinamico/CardFiltro';

import moment from 'moment';
moment.locale('es');

const PendientesTabla = () => {

    const dispatch = useDispatch();

    const { pendientes, activePendiente } = useSelector( state => state.pendiente );
    const { uid, proyecto } = useSelector( state => state.auth );

    const pendienteNuevo = { 
      nuevo: true,
      nombre: '', 
      categoria: '',
      elemento: {
        subsistema: {
          sistema: {
            proyecto: {
            }
          }
        }
      },
      detectadoPor: {
        _id: uid,
        nombre: ''
      },
      responsable: '',
      fechaInicio: moment().toISOString(),  
      fechaFinEstimado: moment().add({days: 1}).toISOString(),   
      fechaFin: '',
      finPor: '',
      tipoAccion: '', 
      observaciones: '', 
      proyecto: proyecto,
      ...activePendiente
    }

    const datosTabla = {
      tabla: 'Pendientes',
      campos: ['Especialidad', 'Tipo', 'Subsistema']
    }

    const [filtroVisible, setFiltroVisible] = useState(false);
    const [buscar, setBuscar] = useState('');
    const [desde, setDesde] = useState(0);
    const limite = 20;

    const handleFiltroVisible = () => {
      setFiltroVisible(!filtroVisible);
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
        dispatch( pendienteSetActive(pendienteNuevo));
    }

    useEffect(() => {
      // dispatch( sistemaStartLoading());
      // dispatch( subsistemaStartLoading() );
      // dispatch( elementoStartLoading() );
      // dispatch( usuariosStartLoading() );
      dispatch( pendienteStartLoading() );
    }, [ dispatch ])

    return (
    <React.Fragment>
      <Card.Header>
        <Card.Title as="h5">Listado de pendientes</Card.Title>
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
                  <th scope="col">Código</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">TAG</th>
                  <th scope="col">Detectado Por</th>
                  <th scope="col">Fecha de Inicio</th>
                  <th scope="col">Fecha de Fin Estimado</th>
              </tr>
          </thead>
          <tbody>
              {
                  pendientes.sort((o1, o2) => {
                    if ( o1.codigo < o2.codigo ){
                      return -1;
                    } else if ( o1.codigo > o2.codigo ) {
                      return 1;
                    } else {
                      return 0;
                    }
                  }).map( pendientes => (
                      <PendientesTablaItem
                          key={ pendientes.id }
                          { ...pendientes }
                      />
                  ))
              }
          </tbody>
        </Table>
      </Card.Body>
    </React.Fragment>
  );
};

export default PendientesTabla;
