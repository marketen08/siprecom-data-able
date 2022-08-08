import Swal from "sweetalert2";
import { fecthConToken } from "../helpers/fetch";
import { types } from "../types/types"

export const pendienteStartAddNew = ( pendiente ) => {
    return async( dispatch, getState ) => {

        try {
            const resp = await fecthConToken('pendientes', pendiente, 'POST');
            const body = await resp.json();
            
            if ( body.id ){
                // Agrego el id que se grabo en la bd al pendiente para agregarlo al store de redux
                pendiente = body;

                dispatch( pendienteAddNew( pendiente ));
            }

        } catch (error) {
            console.log(error);
        }
    }
}


const pendienteAddNew = ( pendiente ) => ({
    type: types.pendienteAddNew,
    payload: pendiente
});

export const pendienteSetActive = ( pendiente ) => ({
    type: types.pendienteSetActive,
    payload: pendiente
});

export const pendienteClearActive = () => ({
    type: types.pendienteClearActive
});

export const pendienteStartUpdated = ( pendiente ) => {
    return async (dispatch) => {
        
        try {
            
            console.log(pendiente);

            const resp = await fecthConToken(`pendientes/${ pendiente.id }`, pendiente, 'PUT');
            const body = await resp.json();

            if ( body.id ){
                const pendienteStore = body;
                dispatch( pendienteUpdated( pendienteStore ));
            } else {
                Swal.fire('Error', body.errors[0].msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};


const pendienteUpdated = ( pendiente ) => ({
    type: types.pendienteUpdated,
    payload: pendiente
});


export const pendienteStartDeleted = ( pendiente ) => {
    return async (dispatch, getState ) => {

        const { id } = pendiente;

        try {
            
            const resp = await fecthConToken(`pendientes/${ id }`, {}, 'DELETE');
            const body = await resp.json();

            if ( body.id ){
                dispatch( pendienteDeleted( pendiente ));
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};

const pendienteDeleted = ( pendiente ) => ({
    type: types.pendienteDeleted,
    payload: pendiente
});

export const pendienteStartLoading = ( buscar = '', desde = '', limite = '') => {
    return async (dispatch) => {

        try {
            
            const resp = await fecthConToken(`pendientes?buscar=${ buscar }&desde=${desde}&limite=${limite}`);
            const body = await resp.json();

            const pendientes = ( body.pendientes );

            dispatch( pendienteLoaded( pendientes ));

        } catch (error) {
            console.log(error);
        }
    }
}

const pendienteLoaded = ( pendientes ) => ({
    type: types.pendienteLoaded,
    payload: pendientes
});

export const pendienteLogout = () => ({
    type: types.pendienteLogout
});