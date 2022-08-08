import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form as FormFormik} from 'formik';
import * as Yup from 'yup';
import { Card, Col, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faSave } from '@fortawesome/free-solid-svg-icons'

import { pendienteClearActive, 
         pendienteStartAddNew, 
         pendienteStartUpdated } from '../../actions/pendientes';

import { categoriaStartLoading, 
         elementoStartLoading, 
         sistemaStartLoading, 
         subsistemaStartLoading,
         usuariosStartLoading
       } from '../../actions';
import { MySelect, MyTextInput } from '../Custom';
import { MyDatePicker } from '../Custom/MyDatePicker';
import moment from 'moment';

export const PendientesForm = () => {

    const { activePendiente } = useSelector( state => state.pendiente );
    const { subsistemas } = useSelector( state => state.subsistema );
    const { sistemas } = useSelector( state => state.sistema );
    const { elementos } = useSelector( state => state.elemento );
    const { categorias } = useSelector( state => state.categoria );
    const { usuarios } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const { id, codigo, nombre, categoria, elemento, detectadoPor, responsable, fechaInicio, 
        fechaFinEstimado, fechaFin, finPor, tipoAccion, observaciones, proyecto, nuevo } = activePendiente;

    const getElementosSubsistema = ( value ) => {
        return  elementos.filter(({ subsistema }) => subsistema._id === value );
    }

    const getSubsistemasSistema = ( value ) => {
        return  subsistemas.filter(({ sistema }) => sistema._id === value );
    }

    const { subsistema } = elemento;
    const elementosSubsistema = getElementosSubsistema(subsistema._id);

    const { sistema } = subsistema;
    const subsistemasSistema = getSubsistemasSistema(sistema._id);

    const handleSubmitForm = ( values ) => {

        //console.log(values);
        if ( nuevo ) {
            //ACA ESTOY CREANDO
            dispatch( pendienteStartAddNew( values ) );
        } else {
            //ACA ESTOY ACTUALIZANDO
            dispatch( pendienteStartUpdated( values ) );
        }
            
        handleLimpiar();
    }

    const handleLimpiar = () => {
        dispatch( pendienteClearActive() );
    }
    
    useEffect(() => {
        dispatch( sistemaStartLoading());
        dispatch( subsistemaStartLoading() );
        dispatch( elementoStartLoading() );
        dispatch( categoriaStartLoading() );
        dispatch( usuariosStartLoading() );
    }, [ dispatch ])

    const fechaInicioE = new Date(fechaInicio);
    const fechaFinEstimadoE = new Date(fechaFinEstimado);
    // const [fechaFinEstimadoE, setFechaFinEstimadoE] = useState(new Date(fechaFinEstimado));
    
    // let fechaFinEstimadoL = new Date(fechaFinEstimado)

    // if (nuevo){
    //     // console.log(fechaFinEstimadoE);
    //     fechaFinEstimadoL = '';
    // }
    

    return (
        <>
            
        <Formik
            initialValues={{
                id, 
                codigo, 
                nombre, 
                categoria: categoria._id, 
                elemento: elemento._id, 
                detectadoPor: detectadoPor._id, 
                responsable: responsable._id, 
                fechaInicio: fechaInicioE, 
                fechaFinEstimado: fechaFinEstimadoE, 
                fechaFin: fechaFinEstimadoE, 
                //finPor: finPor._id, 
                tipoAccion, 
                observaciones, 
                subsistema: elemento.subsistema._id,
                sistema: elemento.subsistema.sistema._id,
                proyecto,
                elementosSubsistema,
                subsistemasSistema
                
            }}
            onSubmit={ ( values ) => {
                handleSubmitForm( values );
            }}
            validationSchema={ Yup.object({
                nombre: Yup.string()
                            .max(50, 'Debe tener 50 caracteres o menos')
                            .required('El nombre es requerido'),
                categoria: Yup.string()
                            .required('La categoría es requerida'),
                sistema: Yup.string()
                            .required('El sistema es requerido'),
                subsistema: Yup.string()
                            .required('El subsistema es requerido'),
                elemento: Yup.string()
                            .required('El TAG es requerido'),
                responsable: Yup.string()
                            .required('El responsable es requerido'),
                fechaInicio: Yup.date()
                            .required('La fecha de inicio es requerida')
                            .typeError('La fecha no es valida'),
                fechaFinEstimado: Yup.date()
                            .required('La fecha de fin estimado es requerida')
                            .min(Yup.ref('fechaInicio'), "La fecha de fin estimado debe ser mayor a la fecha de inicio")
                            .typeError('La fecha no es valida')
                            //.nullable()
                
            })}
            
        >
            {(formik) => {
                const {
                    values,
                    handleChange,
                    setFieldValue
                    // dirty, isSubmitting, handleSubmit, handleReset,
                    } = formik; 
            
                return (
                        <FormFormik autoComplete="off">
                            <Card.Header>
                                {
                                    ( activePendiente.nuevo ) ? 
                                    <>
                                        <Card.Title as="h5">Crear pendiente</Card.Title>
                                    </> 
                                    : 
                                    <>
                                        <Card.Title as="h5">Editar pendiente</Card.Title>
                                        <Card.Subtitle className='pt-3'>
                                            Código: { codigo }
                                        </Card.Subtitle>    
                                    </> 
                                }
                            </Card.Header>
                            
                            <Card.Body>
                                <Row>
                                    <Col sm={9}>
                                    
                                        <MyTextInput
                                            label="Nombre"
                                            name="nombre" 
                                            placeholder="Nombre del pendiente"
                                        />

                                        <MySelect 
                                            key="categoria"
                                            label="Categoría"
                                            name="categoria"
                                            onChange={ handleChange }
                                        >
                                            { (activePendiente.nuevo) ? 
                                                <option key={ '' } value={ '' } >Selecciona la Categoría del pendiente</option>
                                            : '' }
                                            {
                                                categorias?.map( ({ id, nombre }) => (
                                                    <option key={ id } value={ id }>{ nombre }</option>
                                                ))
                                            }
                                        </MySelect>

                                        <MySelect 
                                            key="sistema"
                                            label="Sistema"
                                            name="sistema"
                                            onChange={ e => {
                                                const { value } = e.target;
                                                const _subsistemasSistema = getSubsistemasSistema(value);
                                                setFieldValue("sistema", value);
                                                // setFieldValue("subsistema", _subsistemasSistema[0].id);
                                                setFieldValue("subsistemasSistema", _subsistemasSistema);
                                            }}
                                        >
                                            { (activePendiente.nuevo) ? 
                                                <option key={ '' } value={ '' } >Selecciona el sistema del pendiente</option>
                                            : '' }
                                            {
                                                sistemas?.map( ({ id, nombre }) => (
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
                                                const _elementosSubsistema = getElementosSubsistema(value);
                                                setFieldValue("subsistema", value);
                                                // setFieldValue("elemento", _elementosSubsistema[0].id);
                                                setFieldValue("elementosSubsistema", _elementosSubsistema);

                                            }}
                                        >
                                            <option key={ 0 } value={ '' } >Selecciona el subsistema del pendiente</option>
                                            {
                                                values.subsistemasSistema?.map( ({ id, nombre }) => (
                                                    <option key={ id } value={ id }>{ nombre }</option>
                                                ))
                                            }
                                        </MySelect>

                                        <MySelect 
                                            key="elemento"
                                            label="TAG"
                                            name="elemento"
                                            onChange={ handleChange }
                                        >
                                            <option key={ 0 } value={ '' } >Selecciona el elemento</option>
                                            {
                                                values.elementosSubsistema?.map( ({ id, tag }) => (
                                                    <option key={ id } value={ id }>{ tag }</option>
                                                ))
                                            }
                                        </MySelect>

                                        <MySelect 
                                            key="responsable"
                                            label="Responsable"
                                            name="responsable"
                                            onChange={ handleChange }
                                        >
                                            <option key={ 0 } value={ '' } >Selecciona el responsable</option>
                                            {
                                                usuarios?.map( ({ uid, nombre }) => (
                                                    <option key={ uid } value={ uid }>{ nombre }</option>
                                                ))
                                            }
                                        </MySelect>
                                    
                                        <MyDatePicker
                                            key="fechaInicio"
                                            label="Fecha de Inicio"
                                            name="fechaInicio"
                                            onChange={ e => {
                                                // console.log(e);
                                                setFieldValue("fechaInicio", e );
                                            }}
                                            selected={ values.fechaInicio }
                                        />

                                        <MyDatePicker
                                            key="fechaFinEstimado"
                                            label="Fecha de Fin Estimado"
                                            name="fechaFinEstimado"
                                            onChange={ e => {
                                                setFieldValue("fechaFinEstimado", e );
                                            }}
                                            selected={ values.fechaFinEstimado }
                                            minDate={ values.fechaInicio }
                                        />

                                        <MyTextInput
                                            label="Tipo de Acción"
                                            name="tipoAccion" 
                                            placeholder="Tipo de acción a aplicar"
                                        />

                                        <MyTextInput
                                            label="Observaciones"
                                            name="observaciones" 
                                            placeholder="Observaciones del pendiente"
                                        />

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
                            </Card.Body>
                        </FormFormik>
                    )
                }}
            </Formik>
                    
                
            
        </>
       
    )
}
    