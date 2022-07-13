import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { elementoSetActive, elementoStartDeleted } from '../../actions/elementos';
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

                    <td className="text-right">
                        <div className="dropdown pointer">
                            <div className="" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-ellipsis"></i>
                            </div>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><button className="dropdown-item" onClick={ handleSeleccionar }>Ver</button></li>
                                <li><button className="dropdown-item" onClick={ handleEliminar }>Eliminar</button></li>
                            </ul>
                        </div>
                    </td>
              </tr>
                
            }
        </>
    )
}
