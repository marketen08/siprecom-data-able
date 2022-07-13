import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';

import { authReducer } from "../reducers/authReducer";
import { calendarReducer } from "../reducers/calendarReducer";
import { tipoReducer } from "../reducers/tipoReducer";
import { tareaReducer } from "../reducers/tareaReducer";
import { clienteReducer } from "../reducers/clienteReducer";
import { elementoReducer } from "../reducers/elementoReducer";
import { proyectoReducer } from "../reducers/proyectoReducer";
import { sistemaReducer } from "../reducers/sistemaReducer";
import { subsistemaReducer } from "../reducers/subsistemaReducer";
import { uiReducer } from "../reducers/uiReducer";
import { generoReducer } from "../reducers/generoReducer";

const reducers = combineReducers({
  form: formReducer,

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
});

export default reducers;
