import { types } from "../types/types";

const initialState = {
    categorias: [],
    activeCategoria: null
};

export const categoriaReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
    
        case types.categoriaSetActive:
            return {
                ...state,
                activeCategoria: action.payload
            }
            
        case types.categoriaAddNew:
            return {
                ...state,
                categorias: [
                    ...state.categorias,
                    action.payload
                ]
            }
        
        case types.categoriaClearActive:
            return {
                ...state,
                activeCategoria: null
            }

        case types.categoriaUpdated:
            return {
                ...state,
                categorias: state.categorias.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }

        case types.categoriaDeleted:
            return {
                ...state,
                categorias: state.categorias.filter(
                    e => ( e.id !== state.activeCategoria.id )
                ),
                activeCategoria: null
            }

        case types.categoriaLoaded:
            return {
                ...state,
                categorias: [ ...action.payload ]
            }

        case types.categoriaLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }
}