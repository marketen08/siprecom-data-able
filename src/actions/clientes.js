import Swal from "sweetalert2";
import { fecthConToken } from "../helpers/fetch";
import { prepareClientes } from "../helpers/prepareClientes";
import { types } from "../types/types"

export const clienteStartAddNew = ( cliente ) => {
    return async( dispatch, getState ) => {

        const { uid, nombre } = getState().auth;

        try {
            const resp = await fecthConToken('clientes', cliente, 'POST');
            const body = await resp.json();
            
            if ( body.ok ){
                cliente.id = body.cliente.id;
                cliente.user = {
                    _id: uid,
                    nombre: nombre
                }

                console.log(cliente);
                dispatch( clienteAddNew( cliente ));
            }

        } catch (error) {
            console.log(error);
        }



    }
}


const clienteAddNew = ( cliente ) => ({
    type: types.clienteAddNew,
    payload: cliente
});

export const clienteSetActive = ( cliente ) => ({
    type: types.clienteSetActive,
    payload: cliente
});

export const clienteClearActive = () => ({
    type: types.clienteClearActive
});

export const clienteStartUpdated = ( cliente ) => {
    return async (dispatch) => {

        try {
            
            const resp = await fecthConToken(`clientes/${ cliente.id }`, cliente, 'PUT');
            const body = await resp.json();

            if ( body.ok ){
                dispatch( clienteUpdated( cliente ));
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};


const clienteUpdated = ( cliente ) => ({
    type: types.clienteUpdated,
    payload: cliente
});


export const clienteStartDeleted = ( ) => {
    return async (dispatch, getState ) => {

        const { id } = getState().cliente.activeCliente;

        try {
            
            const resp = await fecthConToken(`clientes/${ id }`, {}, 'DELETE');
            const body = await resp.json();

            if ( body.ok ){
                dispatch( clienteDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};

const clienteDeleted = ( ) => ({
    type: types.clienteDeleted
});

export const clienteStartLoading = () => {
    return async (dispatch) => {

        try {
            
            const resp = await fecthConToken('clientes');
            const body = await resp.json();

            const clientes = prepareClientes( body.clientes );

            dispatch( clienteLoaded( clientes ));

        } catch (error) {
            console.log(error);
        }
    }
}

const clienteLoaded = (clientes) => ({
    type: types.clienteLoaded,
    payload: clientes
});

export const clienteLogout = () => ({
    type: types.clienteLogout
});