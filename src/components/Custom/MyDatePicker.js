import { ErrorMessage, useField } from 'formik';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export const MyDatePicker = ( { label, ...props } ) => {

    const [ field ] = useField(props)

    return (
        <Form.Group controlId={ props.id || props.name }>
            <Form.Label>{ label }</Form.Label>
            <DatePicker 
                className="form-control"
                { ...field } 
                { ...props } 
                dateFormat="dd/MM/yyyy"
            />
            <ErrorMessage name={ props.name } component="span" className='text-danger' />
        </Form.Group>
    )
}