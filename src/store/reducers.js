import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';

import { generoReducer } from "../reducers/generoReducer";

import { authReducer } from "../reducers/authReducer";
import { calendarReducer } from "../reducers/calendarReducer";
import { categoriaReducer } from "../reducers/categoriaReducer";
import { clienteReducer } from "../reducers/clienteReducer";
import { elementoReducer } from "../reducers/elementoReducer";
import { pendienteReducer } from "../reducers/pendienteReducer";
import { proyectoReducer } from "../reducers/proyectoReducer";
import { sistemaReducer } from "../reducers/sistemaReducer";
import { subsistemaReducer } from "../reducers/subsistemaReducer";
import { tareaReducer } from "../reducers/tareaReducer";
import { tipoReducer } from "../reducers/tipoReducer";
import { uiReducer } from "../reducers/uiReducer";

const reducers = combineReducers({
  form: formReducer,
  genero: generoReducer,

  auth: authReducer,
  calendar: calendarReducer,
  categoria: categoriaReducer,
  cliente: clienteReducer,
  elemento: elementoReducer,
  pendiente: pendienteReducer,
  proyecto: proyectoReducer,
  sistema: sistemaReducer,
  subsistema: subsistemaReducer,
  tarea: tareaReducer,
  tipo: tipoReducer,
  ui: uiReducer,
});

export default reducers;
