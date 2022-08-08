import React from 'react'
import { useDispatch } from 'react-redux';
import { elementoSetActive, elementoStartDeleted } from '../../actions/elementos';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export const ElementosTablaItem = ( elemento ) => {

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
                    <td>
                        <span className='pointer' onClick={ handleEliminar }>
                            <FontAwesomeIcon icon={ faTrash } />
                        </span>
                    </td>
                    <th>
                        <span className='pointer text-center' onClick={ handleSeleccionar }>
                            { tag }
                        </span>
                    </th>
                    <td>
                        <span >
                            { nombre }
                        </span>
                    </td>
                    <td>
                        <span>
                            { pid }
                        </span>
                    </td>
                    <td>
                        <span>
                            { testpack }
                        </span>
                    </td>
                    <td>
                        <span>
                            { subsistema.codigo }
                        </span>
                    </td>
                    <td>
                        <span>
                            { tipo.nombre }
                        </span>
                    </td>
                    <td>
                        <span>
                            { tipo.especialidad }
                        </span>
                    </td>
                    {/* <td>
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
                    </td> */}
              </tr>
                
            }
        </>
    )
}
