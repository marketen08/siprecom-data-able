import Swal from "sweetalert2";
import { fecthConToken } from "../helpers/fetch";
import { types } from "../types/types"

export const elementoStartAddNew = ( elemento ) => {
    return async( dispatch, getState ) => {

        try {
            const resp = await fecthConToken('elementos', elemento, 'POST');
            const body = await resp.json();
            
            if ( body.id ){
                // Agrego el id que se grabo en la bd al elemento para agregarlo al store de redux
                elemento.id = body.id;
                elemento.tipo = {
                    _id: body.tipo._id,
                    nombre: body.tipo.nombre,
                    especialidad: body.tipo.especialidad
                };
                elemento.subsistema = {
                    _id: body.subsistema._id,
                    codigo: body.subsistema.codigo,
                    nombre: body.subsistema.nombre,
                    sistema: {
                        _id: body.sistema._id,
                        codigo: body.sistema.codigo,
                        nombre: body.sistema.nombre
                    }
                };
                elemento.sistema = {
                    _id: body.sistema._id,
                    codigo: body.sistema.codigo,
                    nombre: body.sistema.nombre
                }
                
                dispatch( elementoAddNew( elemento ));
            }

        } catch (error) {
            console.log(error);
        }
    }
}


const elementoAddNew = ( elemento ) => ({
    type: types.elementoAddNew,
    payload: elemento
});

export const elementoSetActive = ( elemento ) => ({
    type: types.elementoSetActive,
    payload: elemento
});

export const elementoClearActive = () => ({
    type: types.elementoClearActive
});

export const elementoStartUpdated = ( elemento ) => {
    return async (dispatch) => {
        
        try {
            
            const resp = await fecthConToken(`elementos/${ elemento.id }`, elemento, 'PUT');
            const body = await resp.json();

            if ( body.id ){
                const elementoStore = { 
                    ...elemento,
                    tipo: {
                        _id: body.tipo._id,
                        nombre: body.tipo.nombre,
                        especialidad: body.tipo.especialidad,
                    },
                    subsistema: {
                        _id: body.subsistema._id,
                        codigo: body.subsistema.codigo,
                        nombre: body.subsistema.nombre,
                        sistema: {
                            _id: body.sistema._id,
                            codigo: body.sistema.codigo,
                            nombre: body.sistema.nombre,
                        }
                    }
                }
                dispatch( elementoUpdated( elementoStore ));
            } else {
                Swal.fire('Error', body.errors[0].msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};


const elementoUpdated = ( elemento ) => ({
    type: types.elementoUpdated,
    payload: elemento
});


export const elementoStartDeleted = ( elemento ) => {
    return async (dispatch, getState ) => {

        const { id } = elemento;

        try {
            
            const resp = await fecthConToken(`elementos/${ id }`, {}, 'DELETE');
            const body = await resp.json();

            if ( body.id ){
                dispatch( elementoDeleted( elemento ));
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};

const elementoDeleted = ( elemento ) => ({
    type: types.elementoDeleted,
    payload: elemento
});

export const elementoStartLoading = ( buscar = '', desde = '', limite = '') => {
    return async (dispatch) => {

        try {
            
            const resp = await fecthConToken(`elementos?buscar=${ buscar }&desde=${desde}&limite=${limite}`);
            const body = await resp.json();

            const elementos = ( body.elementos );

            dispatch( elementoLoaded( elementos ));

        } catch (error) {
            console.log(error);
        }
    }
}

const elementoLoaded = ( elementos ) => ({
    type: types.elementoLoaded,
    payload: elementos
});

export const elementoLogout = () => ({
    type: types.elementoLogout
});