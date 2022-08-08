import { types } from "../types/types";

const initialState = {
    pendientes: [],
    activePendiente: null
};

export const pendienteReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
    
        case types.pendienteSetActive:
            return {
                ...state,
                activePendiente: action.payload
            }
            
        case types.pendienteAddNew:
            return {
                ...state,
                pendientes: [
                    ...state.pendientes,
                    action.payload
                ]
            }
        
        case types.pendienteClearActive:
            return {
                ...state,
                activePendiente: null
            }

        case types.pendienteUpdated:
            return {
                ...state,
                pendientes: state.pendientes.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.pendienteDeleted:
            return {
                ...state,
                pendientes: state.pendientes.filter(
                    e => ( e.id !== action.payload.id )
                ),
                activePendiente: null
            }

        case types.pendienteLoaded:
            return {
                ...state,
                pendientes: [ ...action.payload ]
                
            }

        case types.pendienteLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}