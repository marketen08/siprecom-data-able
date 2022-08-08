import React from 'react'
import { useDispatch } from 'react-redux';

import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { pendienteSetActive, pendienteStartDeleted } from '../../actions/pendientes';

moment.locale('es');
const formatoFecha = 'DD/MM/yyyy'

export const PendientesTablaItem = ( pendiente ) => {

    const dispatch = useDispatch();
    
    const { id, codigo, nombre, elemento, categoria, detectadoPor, fechaInicio, fechaFinEstimado } = pendiente;
    
    const handleSeleccionar = () => {
        dispatch( pendienteSetActive( pendiente ));
    }

    const handleEliminar = () => {
        dispatch( pendienteStartDeleted( pendiente ));
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
                            { codigo }
                        </span>
                    </th>
                    <td>
                        <span >
                            { nombre }
                        </span>
                    </td>
                    <td>
                        <span>
                            { categoria.nombre }
                        </span>
                    </td>
                    <td>
                        <span>
                            { elemento.tag }
                        </span>
                    </td>
                    <td>
                        <span>
                            { detectadoPor.nombre }
                        </span>
                    </td>
                    <td>
                        <span>
                            { moment(fechaInicio).format( formatoFecha ) }
                        </span>
                    </td>
                    <td>
                        <span>
                            { moment(fechaFinEstimado).format( formatoFecha ) }
                        </span>
                    </td>
              </tr>
                
            }
        </>
    )
}
