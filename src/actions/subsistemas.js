import Swal from "sweetalert2";
import { fecthConToken } from "../helpers/fetch";
import { types } from "../types/types"

export const subsistemaStartAddNew = ( subsistema ) => {
    return async( dispatch, getState ) => {

        try {
            const resp = await fecthConToken('subsistemas', subsistema, 'POST');
            const body = await resp.json();
            
            if ( body.id ){
                // Agrego el id que se grabo en la bd al subsistema para agregarlo al store de redux
                subsistema.id = body.id;
                subsistema.sistema = {
                    _id: body.sistema._id,
                    codigo: body.sistema.codigo,
                    nombre: body.sistema.nombre
                }
                
                dispatch( subsistemaAddNew( subsistema ));
            }

        } catch (error) {
            console.log(error);
        }
    }
}


const subsistemaAddNew = ( subsistema ) => ({
    type: types.subsistemaAddNew,
    payload: subsistema
});

export const subsistemaSetActive = ( subsistema ) => ({
    type: types.subsistemaSetActive,
    payload: subsistema
});

export const subsistemaClearActive = () => ({
    type: types.subsistemaClearActive
});

export const subsistemaStartUpdated = ( subsistema ) => {
    return async (dispatch) => {
        
        try {
            
            const resp = await fecthConToken(`subsistemas/${ subsistema.id }`, subsistema, 'PUT');
            const body = await resp.json();

            if ( body.id ){
                const subsistemaStore = { 
                    ...subsistema,
                    sistema: {
                        _id: body.sistema._id,
                        codigo: body.sistema.codigo,
                        nombre: body.sistema.nombre,
                    }
                }
                dispatch( subsistemaUpdated( subsistemaStore ));
            } else {
                Swal.fire('Error', body.errors[0].msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};


const subsistemaUpdated = ( subsistema ) => ({
    type: types.subsistemaUpdated,
    payload: subsistema
});


export const subsistemaStartDeleted = ( subsistema ) => {
    return async (dispatch, getState ) => {

        const { id } = subsistema;

        try {
            
            const resp = await fecthConToken(`subsistemas/${ id }`, {}, 'DELETE');
            const body = await resp.json();

            if ( body.id ){
                dispatch( subsistemaDeleted( subsistema ));
            } else {
                Swal.fire('Error', body.msg, 'error' );
            }

        } catch (error) {
            console.log(error);
        }
    }
};

const subsistemaDeleted = ( subsistema ) => ({
    type: types.subsistemaDeleted,
    payload: subsistema
});

export const subsistemaStartLoading = ( buscar = '', desde = '', limite = '') => {
    return async (dispatch) => {

        try {
            
            const resp = await fecthConToken(`subsistemas?buscar=${ buscar }&desde=${desde}&limite=${limite}`);
            const body = await resp.json();

            const subsistemas = ( body.subsistemas );

            dispatch( subsistemaLoaded( subsistemas ));

        } catch (error) {
            console.log(error);
        }
    }
}

const subsistemaLoaded = ( subsistemas ) => ({
    type: types.subsistemaLoaded,
    payload: subsistemas
});

export const subsistemaLogout = () => ({
    type: types.subsistemaLogout
});