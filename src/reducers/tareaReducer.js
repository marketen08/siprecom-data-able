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
    tareas: [],
    activeTarea: null
};

export const tareaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
    
        case types.tareaSetActive:
            return {
                ...state,
                activeTarea: action.payload
            }
            
        case types.tareaAddNew:
            return {
                ...state,
                tareas: [
                    ...state.tareas,
                    action.payload
                ]
            }
        
        case types.tareaClearActive:
            return {
                ...state,
                activeTarea: null
            }

        case types.tareaUpdated:
            return {
                ...state,
                tareas: state.tareas.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.tareaDeleted:
            return {
                ...state,
                tareas: state.tareas.filter(
                    e => ( e.id !== state.activeTarea.id )
                ),
                activeTarea: null
            }

        case types.tareaLoaded:
            return {
                ...state,
                tareas: [ ...action.payload ]
            }

        case types.tareaLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}