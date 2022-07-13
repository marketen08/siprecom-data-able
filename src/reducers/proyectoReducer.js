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
    proyectos: [],
    activeProyecto: null
};

export const proyectoReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
    
        case types.proyectoSetActive:
            return {
                ...state,
                activeProyecto: action.payload
            }
            
        case types.proyectoAddNew:
            return {
                ...state,
                proyectos: [
                    ...state.proyectos,
                    action.payload
                ]
            }
        
        case types.proyectoClearActive:
            return {
                ...state,
                activeProyecto: null
            }

        case types.proyectoUpdated:
            return {
                ...state,
                proyectos: state.proyectos.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.proyectoDeleted:
            return {
                ...state,
                proyectos: state.proyectos.filter(
                    e => ( e.id !== state.activeProyecto.id )
                ),
                activeProyecto: null
            }

        case types.proyectoLoaded:
            return {
                ...state,
                proyectos: [ ...action.payload ]
            }

        case types.proyectoLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}