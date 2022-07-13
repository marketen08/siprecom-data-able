import Swal from "sweetalert2";
import { fecthConToken } from "../helpers/fetch";
import { types } from "../types/types"

export const sistemaStartAddNew = ( sistema ) => {
    return async( dispatch, getState ) => {

        const { uid, nombre } = getState().auth;

        try {
            const resp = await fecthConToken('sistemas', sistema, 'POST');
            const body = await resp.json();
            
            if ( body.id ){
                sistema.id = body.id;
                sistema.codigo = body.codigo;
                sistema.nombre = body.nombre;
                sistema.proyecto = {
                    _id: body.proyecto,
                    nombre: body.proyecto
                }
                sistema.usuario = {
                    _id: uid,
                    nombre: nombre
                }

                // console.log(sistema);
                dispatch( sistemaAddNew( sistema ));
            }

        } catch (error) {
            console.log(error);
        }



    }
}


const sistemaAddNew = ( sistema ) => ({
    type: types.sistemaAddNew,
    payload: sistema
});

export const sistemaSetActive = ( sistema ) => ({
    type: types.sistemaSetActive,
    payload: sistema
});

export const sistemaClearActive = () => ({
    type: types.sistemaClearActive
});

export const sistemaStartUpdated = ( sistema ) => {
    return async (dispatch) => {

        try {
            
            const resp = await fecthConToken(`sistemas/${ sistema.id }`, sistema, 'PUT');
            const body = await resp.json();

            console.log(sistema)
            if ( body.id ){
                dispatch( sistemaUpdated( sistema ));
            } else {
                Swal.fire('Error', body.errors[0].msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};


const sistemaUpdated = ( sistema ) => ({
    type: types.sistemaUpdated,
    payload: sistema
});


export const sistemaStartDeleted = ( sistema ) => {
    return async (dispatch, getState ) => {

        const { id } = sistema;

        try {
            
            const resp = await fecthConToken(`sistemas/${ id }`, {}, 'DELETE');
            const body = await resp.json();

            if ( body.id ){
                dispatch( sistemaDeleted( sistema ));
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};

const sistemaDeleted = ( sistema ) => ({
    type: types.sistemaDeleted,
    payload: sistema
});

export const sistemaStartLoading = ( buscar = '', desde = '', limite = '') => {
    return async (dispatch) => {

        try {
            
            const resp = await fecthConToken(`sistemas?buscar=${ buscar }&desde=${desde}&limite=${limite}`);
            const body = await resp.json();

            const sistemas = body;

            // console.log(sistemas)
            dispatch( sistemaLoaded( sistemas ));

        } catch (error) {
            console.log(error);
        }
    }
}

const sistemaLoaded = ( sistemas ) => ({
    type: types.sistemaLoaded,
    payload: sistemas
});

export const sistemaLogout = () => ({
    type: types.sistemaLogout
});