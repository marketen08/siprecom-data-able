import { types } from "../types/types";

const initialState = {
    elementos: [],
    activeElemento: null
};

export const elementoReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
    
        case types.elementoSetActive:
            return {
                ...state,
                activeElemento: action.payload
            }
            
        case types.elementoAddNew:
            return {
                ...state,
                elementos: [
                    ...state.elementos,
                    action.payload
                ]
            }
        
        case types.elementoClearActive:
            return {
                ...state,
                activeElemento: null
            }

        case types.elementoUpdated:
            return {
                ...state,
                elementos: state.elementos.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.elementoDeleted:
            return {
                ...state,
                elementos: state.elementos.filter(
                    e => ( e.id !== action.payload.id )
                ),
                activeElemento: null
            }

        case types.elementoLoaded:
            return {
                ...state,
                elementos: [ ...action.payload ]
                
            }

        case types.elementoLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}