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
    generos: [],
    activeGenero: null,
    total: 0
};

export const generoReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
    
        case types.generoSetActive:
            return {
                ...state,
                activeGenero: action.payload
            }
            
        case types.generoAddNew:
            return {
                ...state,
                generos: [
                    ...state.generos,
                    action.payload
                ]
            }
        
        case types.generoClearActive:
            return {
                ...state,
                activeGenero: null
            }

        case types.generoUpdated:
            return {
                ...state,
                generos: state.generos.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.generoDeleted:
            return {
                ...state,
                generos: state.generos.filter(
                    e => ( e.id !== action.payload.id )
                ),
                activeGenero: null
            }

        case types.generoLoaded:
            return {
                ...state,
                generos: [ ...action.payload ]
                // total: action.payload.total
            }

        case types.generoLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}