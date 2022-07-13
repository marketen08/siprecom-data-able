import Swal from "sweetalert2";
import { fecthConToken } from "../helpers/fetch";
import { prepareTareas } from "../helpers/prepareTareas";
import { types } from "../types/types"

export const tareaStartAddNew = ( tarea ) => {
    return async( dispatch, getState ) => {

        const { uid, nombre } = getState().auth;

        try {
            const resp = await fecthConToken('tareas', tarea, 'POST');
            const body = await resp.json();
            
            if ( body.ok ){
                tarea.id = body.tarea.id;
                tarea.user = {
                    _id: uid,
                    nombre: nombre
                }

                console.log(tarea);
                dispatch( tareaAddNew( tarea ));
            }

        } catch (error) {
            console.log(error);
        }



    }
}


const tareaAddNew = ( tarea ) => ({
    type: types.tareaAddNew,
    payload: tarea
});

export const tareaSetActive = ( tarea ) => ({
    type: types.tareaSetActive,
    payload: tarea
});

export const tareaClearActive = () => ({
    type: types.tareaClearActive
});

export const tareaStartUpdated = ( tarea ) => {
    return async (dispatch) => {

        try {
            
            const resp = await fecthConToken(`tareas/${ tarea.id }`, tarea, 'PUT');
            const body = await resp.json();

            if ( body.ok ){
                dispatch( tareaUpdated( tarea ));
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};


const tareaUpdated = ( tarea ) => ({
    type: types.tareaUpdated,
    payload: tarea
});


export const tareaStartDeleted = ( ) => {
    return async (dispatch, getState ) => {

        const { id } = getState().tarea.activeTarea;

        try {
            
            const resp = await fecthConToken(`tareas/${ id }`, {}, 'DELETE');
            const body = await resp.json();

            if ( body.ok ){
                dispatch( tareaDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};

const tareaDeleted = ( ) => ({
    type: types.tareaDeleted
});

export const tareaStartLoading = () => {
    return async (dispatch) => {

        try {
            
            const resp = await fecthConToken('tareas');
            const body = await resp.json();

            const tareas = prepareTareas( body.tareas );

            dispatch( tareaLoaded( tareas ));

        } catch (error) {
            console.log(error);
        }
    }
}

const tareaLoaded = (tareas) => ({
    type: types.tareaLoaded,
    payload: tareas
});

export const tareaLogout = () => ({
    type: types.tareaLogout
});