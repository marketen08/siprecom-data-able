import Swal from "sweetalert2";
import { fecthConToken } from "../helpers/fetch";
import { prepareProyectos } from "../helpers/prepareProyectos";
import { types } from "../types/types"

export const proyectoStartAddNew = ( proyecto ) => {
    return async( dispatch, getState ) => {

        const { uid, nombre } = getState().auth;

        try {
            const resp = await fecthConToken('proyectos', proyecto, 'POST');
            const body = await resp.json();
            
            if ( body.ok ){
                proyecto.id = body.proyecto.id;
                proyecto.user = {
                    _id: uid,
                    nombre: nombre
                }

                console.log(proyecto);
                dispatch( proyectoAddNew( proyecto ));
            }

        } catch (error) {
            console.log(error);
        }



    }
}


const proyectoAddNew = ( proyecto ) => ({
    type: types.proyectoAddNew,
    payload: proyecto
});

export const proyectoSetActive = ( proyecto ) => ({
    type: types.proyectoSetActive,
    payload: proyecto
});

export const proyectoClearActive = () => ({
    type: types.proyectoClearActive
});

export const proyectoStartUpdated = ( proyecto ) => {
    return async (dispatch) => {

        try {
            
            const resp = await fecthConToken(`proyectos/${ proyecto.id }`, proyecto, 'PUT');
            const body = await resp.json();

            if ( body.ok ){
                dispatch( proyectoUpdated( proyecto ));
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};


const proyectoUpdated = ( proyecto ) => ({
    type: types.proyectoUpdated,
    payload: proyecto
});


export const proyectoStartDeleted = ( ) => {
    return async (dispatch, getState ) => {

        const { id } = getState().proyecto.activeProyecto;

        try {
            
            const resp = await fecthConToken(`proyectos/${ id }`, {}, 'DELETE');
            const body = await resp.json();

            if ( body.ok ){
                dispatch( proyectoDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};

const proyectoDeleted = ( ) => ({
    type: types.proyectoDeleted
});

export const proyectoStartLoading = () => {
    return async (dispatch) => {

        try {
            
            const resp = await fecthConToken('proyectos');
            const body = await resp.json();

            const proyectos = prepareProyectos( body.proyectos );

            dispatch( proyectoLoaded( proyectos ));

        } catch (error) {
            console.log(error);
        }
    }
}

const proyectoLoaded = (proyectos) => ({
    type: types.proyectoLoaded,
    payload: proyectos
});

export const proyectoLogout = () => ({
    type: types.proyectoLogout
});