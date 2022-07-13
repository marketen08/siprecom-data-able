import { types } from "../types/types";

// {
//     id: new Date().getTime(),
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     otra: 'otra mensaje',
//     user: {
//         _id: '123',
//         name: 'Marcos'
//     }
// }



const initialState = {
    subsistemas: [],
    activeSubsistema: null
    
};

export const subsistemaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
    
        case types.subsistemaSetActive:
            return {
                ...state,
                activeSubsistema: action.payload
            }
            
        case types.subsistemaAddNew:
            return {
                ...state,
                subsistemas: [
                    ...state.subsistemas,
                    action.payload
                ]
            }
        
        case types.subsistemaClearActive:
            return {
                ...state,
                activeSubsistema: null
            }

        case types.subsistemaUpdated:
            return {
                ...state,
                subsistemas: state.subsistemas.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.subsistemaDeleted:
            return {
                ...state,
                subsistemas: state.subsistemas.filter(
                    e => ( e.id !== action.payload.id )
                ),
                activeSubsistema: null
            }

        case types.subsistemaLoaded:
            return {
                ...state,
                subsistemas: [ ...action.payload ]
                
            }

        case types.subsistemaLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}