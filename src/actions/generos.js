import Swal from "sweetalert2";
import { fecthConTokenNet } from "../helpers/fetch";
import { types } from "../types/types"

export const generoStartAddNew = ( genero ) => {
    return async( dispatch, getState ) => {

        const { uid, nombre } = getState().auth;

        try {
            const resp = await fecthConTokenNet('generos', genero, 'POST');
            const body = await resp.json();
            
            if ( body.id ){
                genero.id = body.id;
                genero.codigo = body.codigo;
                genero.nombre = body.nombre;
                genero.proyecto = {
                    _id: body.proyecto,
                    nombre: body.proyecto
                }
                genero.usuario = {
                    _id: uid,
                    nombre: nombre
                }

                // console.log(genero);
                dispatch( generoAddNew( genero ));
            }

        } catch (error) {
            console.log(error);
        }



    }
}


const generoAddNew = ( genero ) => ({
    type: types.generoAddNew,
    payload: genero
});

export const generoSetActive = ( genero ) => ({
    type: types.generoSetActive,
    payload: genero
});

export const generoClearActive = () => ({
    type: types.generoClearActive
});

export const generoStartUpdated = ( genero ) => {
    return async (dispatch) => {

        try {
            
            const resp = await fecthConTokenNet(`generos/${ genero.id }`, genero, 'PUT');
            const body = await resp.json();

            //console.log(genero)
            if ( body.id ){
                dispatch( generoUpdated( genero ));
            } else {
                Swal.fire('Error', body.errors[0].msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};


const generoUpdated = ( genero ) => ({
    type: types.generoUpdated,
    payload: genero
});


export const generoStartDeleted = ( genero ) => {
    return async (dispatch, getState ) => {

        const { id } = genero;

        try {
            
            const resp = await fecthConTokenNet(`generos/${ id }`, {}, 'DELETE');
            const body = await resp.json();

            if ( body.id ){
                dispatch( generoDeleted( genero ));
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};

const generoDeleted = ( genero ) => ({
    type: types.generoDeleted,
    payload: genero
});

export const generoStartLoading = ( buscar = '', desde = '', limite = '') => {
    return async (dispatch) => {
        try {
            
            //const resp = await fecthConTokenNet(`generos?buscar=${ buscar }&desde=${desde}&limite=${limite}`);
            const resp = await fecthConTokenNet('generos');
            const body = await resp.json();
            
            //console.log(body);
            
            const generos = body;

            // console.log(generos)
            dispatch( generoLoaded( generos ));

        } catch (error) {
            console.log(error);
        }
    }
}

const generoLoaded = ( generos ) => ({
    type: types.generoLoaded,
    payload: generos
});

export const generoLogout = () => ({
    type: types.generoLogout
});