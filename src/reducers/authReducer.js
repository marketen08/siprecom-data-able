import { types } from "../types/types";

const initialState = {
    checking: true,
    usuarios: []
    // uid: null,
    // name: null
}

export const authReducer = (state = initialState, action ) => {

    switch ( action.type ) {
       
        case types.authLogin:
            return {
                ...state,
                checking: false,
                ...action.payload
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }
            
        case types.authLogout:
            return {
                checking: false
            }

        case types.authUsuariosLoaded:
            return {
                ...state,
                usuarios: [ ...action.payload ]
                
            }

        default:
            return state;
    }
}