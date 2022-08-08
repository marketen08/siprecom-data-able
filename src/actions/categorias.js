import Swal from "sweetalert2";
import { fecthConToken } from "../helpers/fetch";
import { types } from "../types/types"

export const categoriaStartAddNew = ( categoria ) => {
    return async( dispatch, getState ) => {

        const { uid, nombre } = getState().auth;

        try {
            const resp = await fecthConToken('categorias', categoria, 'POST');
            const body = await resp.json();
            
            if ( body.ok ){
                categoria.id = body.categoria.id;
                categoria.user = {
                    _id: uid,
                    nombre: nombre
                }

                dispatch( categoriaAddNew( categoria ));
            }

        } catch (error) {
            console.log(error);
        }



    }
}


const categoriaAddNew = ( categoria ) => ({
    type: types.categoriaAddNew,
    payload: categoria
});

export const categoriaSetActive = ( categoria ) => ({
    type: types.categoriaSetActive,
    payload: categoria
});

export const categoriaClearActive = () => ({
    type: types.categoriaClearActive
});

export const categoriaStartUpdated = ( categoria ) => {
    return async (dispatch) => {

        try {
            
            const resp = await fecthConToken(`categorias/${ categoria.id }`, categoria, 'PUT');
            const body = await resp.json();

            if ( body.ok ){
                dispatch( categoriaUpdated( categoria ));
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};


const categoriaUpdated = ( categoria ) => ({
    type: types.categoriaUpdated,
    payload: categoria
});


export const categoriaStartDeleted = ( ) => {
    return async (dispatch, getState ) => {

        const { id } = getState().categoria.activeTipo;

        try {
            
            const resp = await fecthConToken(`categorias/${ id }`, {}, 'DELETE');
            const body = await resp.json();

            if ( body.ok ){
                dispatch( categoriaDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};

const categoriaDeleted = ( ) => ({
    type: types.categoriaDeleted
});

export const categoriaStartLoading = () => {
    return async (dispatch) => {

        try {
            
            const resp = await fecthConToken('categorias');
            const body = await resp.json();

            const categorias = body.categorias;

            dispatch( categoriaLoaded( categorias ));

        } catch (error) {
            console.log(error);
        }
    }
}

const categoriaLoaded = (categorias) => ({
    type: types.categoriaLoaded,
    payload: categorias
});

export const categoriaLogout = () => ({
    type: types.categoriaLogout
});