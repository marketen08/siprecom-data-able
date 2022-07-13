import Swal from "sweetalert2";
import { fecthConToken, fecthSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import { eventLogout } from "./events";



export const startLogin = ( email, password ) => {

    return async( dispatch ) => {

        const resp = await fecthSinToken( 'auth/login', { email, password }, 'POST' );
        const body = await resp.json();
        
        if ( body.token ){
            
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            
            dispatch( login({
                uid: body.usuario.uid,
                usuario: body.usuario.nombre,
                proyecto: body.usuario.proyecto
            }) )

        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

export const startRegister = ( email, password, nombre ) => {
    
    return async( dispatch ) => {

        const resp = await fecthSinToken( 'auth/new', { email, password, nombre }, 'POST' );
        const body = await resp.json();

        if ( body.ok ){
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.usuario.id,
                usuario: body.usuario.nombre
            }) )

        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
    
}

export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fecthConToken( 'auth/renew' );
        const body = await resp.json();

        
        if ( body.token ){
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                usuario: body.nombre,
                proyecto: body.proyecto,
            }) )

        } else {
            dispatch( checkingFinish() );
        }

    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });


const login = ( usuario ) => ({
    type: types.authLogin,
    payload: usuario
});

export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( eventLogout());
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout })