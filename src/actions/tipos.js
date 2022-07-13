import Swal from "sweetalert2";
import { fecthConToken } from "../helpers/fetch";
import { prepareTipos } from "../helpers/prepareTipos";
import { types } from "../types/types"

export const tipoStartAddNew = ( tipo ) => {
    return async( dispatch, getState ) => {

        const { uid, nombre } = getState().auth;

        try {
            const resp = await fecthConToken('tipos', tipo, 'POST');
            const body = await resp.json();
            
            if ( body.ok ){
                tipo.id = body.tipo.id;
                tipo.user = {
                    _id: uid,
                    nombre: nombre
                }

                console.log(tipo);
                dispatch( tipoAddNew( tipo ));
            }

        } catch (error) {
            console.log(error);
        }



    }
}


const tipoAddNew = ( tipo ) => ({
    type: types.tipoAddNew,
    payload: tipo
});

export const tipoSetActive = ( tipo ) => ({
    type: types.tipoSetActive,
    payload: tipo
});

export const tipoClearActive = () => ({
    type: types.tipoClearActive
});

export const tipoStartUpdated = ( tipo ) => {
    return async (dispatch) => {

        try {
            
            const resp = await fecthConToken(`tipos/${ tipo.id }`, tipo, 'PUT');
            const body = await resp.json();

            if ( body.ok ){
                dispatch( tipoUpdated( tipo ));
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};


const tipoUpdated = ( tipo ) => ({
    type: types.tipoUpdated,
    payload: tipo
});


export const tipoStartDeleted = ( ) => {
    return async (dispatch, getState ) => {

        const { id } = getState().tipo.activeTipo;

        try {
            
            const resp = await fecthConToken(`tipos/${ id }`, {}, 'DELETE');
            const body = await resp.json();

            if ( body.ok ){
                dispatch( tipoDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};

const tipoDeleted = ( ) => ({
    type: types.tipoDeleted
});

export const tipoStartLoading = () => {
    return async (dispatch) => {

        try {
            
            const resp = await fecthConToken('tipos');
            const body = await resp.json();

            const tipos = prepareTipos( body.tipos );

            dispatch( tipoLoaded( tipos ));

        } catch (error) {
            console.log(error);
        }
    }
}

const tipoLoaded = (tipos) => ({
    type: types.tipoLoaded,
    payload: tipos
});

export const tipoLogout = () => ({
    type: types.tipoLogout
});