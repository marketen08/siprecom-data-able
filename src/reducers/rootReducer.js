import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendarReducer";
import { tipoReducer } from "./tipoReducer";
import { tareaReducer } from "./tareaReducer";
import { clienteReducer } from "./clienteReducer";
import { elementoReducer } from "./elementoReducer";
import { proyectoReducer } from "./proyectoReducer";
import { sistemaReducer } from "./sistemaReducer";
import { subsistemaReducer } from "./subsistemaReducer";
import { uiReducer } from "./uiReducer";
import { generoReducer } from "./generoReducer";


export const rootReducer = combineReducers({
    auth: authReducer,
    calendar: calendarReducer,
    cliente: clienteReducer,
    elemento: elementoReducer,
    genero: generoReducer,
    proyecto: proyectoReducer,
    sistema: sistemaReducer,
    subsistema: subsistemaReducer,
    tarea: tareaReducer,
    tipo: tipoReducer,
    ui: uiReducer,
})