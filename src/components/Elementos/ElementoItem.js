import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { elementoSetActive, elementoStartDeleted } from '../../actions/elementos';
import { Dropdown, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
moment.locale('es');

// const formatoFecha = 'DD/MM/yyyy'

export const ElementoItem = ( elemento ) => {

    const dispatch = useDispatch();
    
    const { id, tag, nombre, pid, testpack, tipo, subsistema } = elemento;
    
    const handleSeleccionar = () => {
        dispatch( elementoSetActive( elemento ));
    }

    const handleEliminar = () => {
        dispatch( elementoStartDeleted( elemento ));
    }

    return (
        <>
            {
                <tr key={ id }>
                    <th scope="row">
                        <span className="pointer text-center" onClick={ handleSeleccionar }>
                            { tag }
                        </span>
                    </th>
                    <td>
                        <span className="">
                            <i className="bg-warning" />
                            { nombre }
                        </span>
                    </td>
                    <td>
                        <span className="">
                            <i className="bg-warning" />
                            { pid }
                        </span>
                    </td>
                    <td>
                        <span className="">
                            <i className="bg-warning" />
                            { testpack }
                        </span>
                    </td>
                    <td>
                        <span className="">
                            <i className="bg-warning" />
                            { subsistema.codigo }
                        </span>
                    </td>
                    <td>
                        <span className="">
                            <i className="bg-warning" />
                            { tipo.nombre }
                        </span>
                    </td>
                    <td>
                        <span className="">
                            <i className="bg-warning" />
                            { tipo.especialidad }
                        </span>
                    </td>


                    <td>
                    <ListGroup as="ul" bsPrefix=" " className="navbar-nav mr-auto">
                        <ListGroup.Item as="li" bsPrefix=" " >
                            <Dropdown alignRight={true}>
                                <Dropdown.Toggle variant={'button'} id="dropdown-basic">
                                    Cambiar por tacho de basura y clic en cualquier lugar de la row
                                </Dropdown.Toggle>
                                <ul>
                                <Dropdown.Menu>
                                    <li>
                                    <Link to="#" className="dropdown-item" onClick={ handleSeleccionar } >
                                        Ver
                                    </Link>
                                    </li>
                                    <li>
                                    <Link to="#" className="dropdown-item" onClick={ handleEliminar } >
                                        Eliminar
                                    </Link>
                                    </li>
                                </Dropdown.Menu>
                                </ul>
                            </Dropdown>
                            </ListGroup.Item>
                    </ListGroup>
                    </td>
              </tr>
                
            }
        </>
    )
}
