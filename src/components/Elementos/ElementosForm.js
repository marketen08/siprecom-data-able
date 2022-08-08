import { useEffect } from 'react';
import { Formik, Form as FormFormik} from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import { elementoClearActive, 
        elementoStartAddNew, 
        elementoStartUpdated } from '../../actions/elementos';

import { MySelect, MyTextInput } from '../Custom';
import * as Yup from 'yup';

import { subsistemaStartLoading,
         tipoStartLoading } from '../../actions';
import { Card, Col, Row } from 'react-bootstrap';
// import { MySelect } from '../custom/MySelect';
// import { MyTextInput } from '../custom/MyTextInput';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faSave } from '@fortawesome/free-solid-svg-icons'

export const ElementosForm = () => {

    const { activeElemento } = useSelector( state => state.elemento );
    const { subsistemas } = useSelector( state => state.subsistema );
    const { tipos } = useSelector( state => state.tipo );

    const dispatch = useDispatch();

    const { tag, nombre, pid, testpack, tipo, subsistema, proyecto, usuario, id } = activeElemento;
    
    const getTiposEspecialidad = ( value ) => {
        return  tipos.filter(({ especialidad }) => especialidad === value );
    }

    const getSistema = ( value ) => {
        return  subsistemas.filter(({ id }) => id === value );
    }

    const { especialidad } = tipo;
    const tiposEspecialidad = getTiposEspecialidad(especialidad);

    const handleSubmitForm = ( values ) => {

        if ( activeElemento.nuevo ) {
            //ACA ESTOY CREANDO
            // console.log(values);
            dispatch( elementoStartAddNew( values ) );
            // dispatch( elementoStartLoading() );
        } else {
            //ACA ESTOY ACTUALIZANDO
            dispatch( elementoStartUpdated( values ) );
        }
            
        handleLimpiar();
    }

    const handleLimpiar = () => {
        dispatch( elementoClearActive() );
    }
    
    useEffect(() => {
        dispatch( subsistemaStartLoading( '', 0, 200 ) );
        dispatch( tipoStartLoading( '', 0, 200 ) );
    }, [ dispatch ])

    let hash = {};
    // A partir del listado de Tipos - Especialidades, saco las especialidades duplicadas para armar un listado de especialidades
    const especialidades = tipos.filter(({ especialidad }) => {
        const exists = !hash[especialidad];
        hash[especialidad] = true;
        return exists;
    });
    

    return (
        <>
            <Card.Header>
                <Card.Title as="h5">{( activeElemento.nuevo ) ? 'Crear elemento' : 'Editar elemento' }</Card.Title>
            </Card.Header>
            <Card.Body>
                <Formik
                    initialValues={{
                        tag: tag,
                        nombre: nombre,
                        pid: pid,
                        testpack: testpack,
                        tipo: tipo._id,
                        subsistema: subsistema._id,
                        sistema: subsistema.sistema._id,
                        proyecto: proyecto,
                        usuario: usuario,
                        especialidad: tipo.especialidad,
                        tiposEspecialidad: tiposEspecialidad,
                        id: id
                    }}
                    onSubmit={ ( values ) => {
                        // console.log( values )
                        handleSubmitForm( values );
                    }}
                    validationSchema={ Yup.object({
                        tag: Yup.string()
                                    .max(50, 'Debe de tener 50 caracteres o menos')
                                    .required('Requerido'),
                        nombre: Yup.string()
                                    .max(50, 'Debe de tener 50 caracteres o menos')
                                    .required('Requerido')
                    })}
                    
                >

                    {(formik) => {
                        const {
                            values,
                            // dirty,
                            // isSubmitting,
                            handleChange,
                            // handleSubmit,
                            // handleReset,
                            setFieldValue
                            } = formik; 
                    
                        return (
                            <FormFormik>
                                <Row>
                                    <Col sm={9}>
                                    
                                    <MyTextInput
                                        label="TAG"
                                        name="tag" 
                                        placeholder="TAG del elemento"
                                    />

                                    <MyTextInput
                                        label="Nombre"
                                        name="nombre" 
                                        placeholder="Nombre del elemento"
                                    />

                                    <MyTextInput
                                        label="PID"
                                        name="pid" 
                                        placeholder="Nombre del PID"
                                    />        

                                    <MyTextInput
                                        label="Testpack"
                                        name="testpack" 
                                        placeholder="Nombre del testpack"
                                    />

                                    <MySelect 
                                        key="especialidad"
                                        label="Especialidad"
                                        name="especialidad"
                                        onChange={ e => {
                                            const { value } = e.target;
                                            const _tiposEspecialidad = getTiposEspecialidad(value);
                                            setFieldValue("especialidad", value);
                                            setFieldValue("tipo", _tiposEspecialidad[0].id);
                                            setFieldValue("tiposEspecialidad", _tiposEspecialidad);
                                        }}
                                    >
                                        { (activeElemento.nuevo) ? 
                                            <option key={ '' } value={ '' } >Selecciona la especialidad del elemento</option>
                                        : '' }
                                        {
                                            especialidades?.map( ({ id, especialidad }) => (
                                                <option key={ especialidad } value={ especialidad }>{ especialidad }</option>
                                            ))
                                        }
                                    </MySelect>

                                    <MySelect 
                                        key="tipo"
                                        label="Tipo"
                                        name="tipo"
                                        onChange={ handleChange }
                                    >
                                        { (activeElemento.nuevo) ? 
                                            <option key={ 0 } value={ '' } >Selecciona el tipo de elemento</option>
                                        : '' }
                                        {
                                            values.tiposEspecialidad?.map( ({ id, nombre }) => (
                                                <option key={ id } value={ id }>{ nombre }</option>
                                            ))
                                        }
                                    </MySelect>

                                    <MySelect
                                        key="subsistema"
                                        label="Subsistema"
                                        name="subsistema"
                                        onChange={ e => {
                                            const { value } = e.target;
                                            setFieldValue("subsistema", value);
                                            const subsistema = getSistema(value);
                                            setFieldValue("sistema", subsistema[0].sistema._id );
                                            // console.log(subsistema);
                                            // console.log(subsistema[0].sistema._id);
                                            // const _tiposEspecialidad = getTiposEspecialidad(value);
                                            // setFieldValue("especialidad", value);
                                            // setFieldValue("tipo", _tiposEspecialidad[0].id);
                                            // setFieldValue("tiposEspecialidad", _tiposEspecialidad);
                                        }}
                                    >
                                        { (activeElemento.nuevo) ? 
                                            <option key={ 0 } value={ '' } >Selecciona el subsistema</option>
                                        : '' }
                                        {
                                            subsistemas?.map( ({ id, codigo, nombre }) => (
                                                <option key={ id } value={ id }>{ codigo } - { nombre }</option>
                                            ))
                                        }
                                    </MySelect>


                                    
                                    </Col>
                                    <Col sm={3}>
                                    <button
                                        type="submit"
                                        className="btn btn-outline-success btn-block"
                                    >
                                        <FontAwesomeIcon icon={faSave} />
                                        <span> Guardar</span>
                                    </button>
                                    <button 
                                        type="button"
                                        className="btn btn-outline-danger btn-block" 
                                        onClick={ handleLimpiar }
                                    >
                                        <FontAwesomeIcon icon={faBan} />
                                        <span> Cancelar</span>
                                    </button>
                                    
                                    </Col>
                                </Row>
                            </FormFormik>
                        )
                    }}
                </Formik>
                    
                
            </Card.Body>
        </>
       
    )
}
    