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
    clientes: [],
    activeCliente: null
};

export const clienteReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
    
        case types.clienteSetActive:
            return {
                ...state,
                activeCliente: action.payload
            }
            
        case types.clienteAddNew:
            return {
                ...state,
                clientes: [
                    ...state.clientes,
                    action.payload
                ]
            }
        
        case types.clienteClearActive:
            return {
                ...state,
                activeCliente: null
            }

        case types.clienteUpdated:
            return {
                ...state,
                clientes: state.clientes.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.clienteDeleted:
            return {
                ...state,
                clientes: state.clientes.filter(
                    e => ( e.id !== state.activeCliente.id )
                ),
                activeCliente: null
            }

        case types.clienteLoaded:
            return {
                ...state,
                clientes: [ ...action.payload ]
            }

        case types.clienteLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}