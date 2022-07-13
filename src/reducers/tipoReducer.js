import { types } from "../types/types";

const initialState = {
    tipos: [],
    activeTipo: null
};

export const tipoReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
    
        case types.tipoSetActive:
            return {
                ...state,
                activeTipo: action.payload
            }
            
        case types.tipoAddNew:
            return {
                ...state,
                tipos: [
                    ...state.tipos,
                    action.payload
                ]
            }
        
        case types.tipoClearActive:
            return {
                ...state,
                activeTipo: null
            }

        case types.tipoUpdated:
            return {
                ...state,
                tipos: state.tipos.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.tipoDeleted:
            return {
                ...state,
                tipos: state.tipos.filter(
                    e => ( e.id !== state.activeTipo.id )
                ),
                activeTipo: null
            }

        case types.tipoLoaded:
            return {
                ...state,
                tipos: [ ...action.payload ]
            }

        case types.tipoLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}