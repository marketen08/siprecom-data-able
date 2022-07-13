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
    sistemas: [],
    activeSistema: null,
    total: 0
};

export const sistemaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
    
        case types.sistemaSetActive:
            return {
                ...state,
                activeSistema: action.payload
            }
            
        case types.sistemaAddNew:
            return {
                ...state,
                sistemas: [
                    ...state.sistemas,
                    action.payload
                ]
            }
        
        case types.sistemaClearActive:
            return {
                ...state,
                activeSistema: null
            }

        case types.sistemaUpdated:
            return {
                ...state,
                sistemas: state.sistemas.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.sistemaDeleted:
            return {
                ...state,
                sistemas: state.sistemas.filter(
                    e => ( e.id !== action.payload.id )
                ),
                activeSistema: null
            }

        case types.sistemaLoaded:
            return {
                ...state,
                sistemas: [ ...action.payload.sistemas ],
                total: action.payload.total
            }

        case types.sistemaLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}