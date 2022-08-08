import { ErrorMessage, useField } from 'formik';
import { Form } from 'react-bootstrap';

// interface Props {
//     label: string;
//     name: string;
//     type?: 'text' | 'email' | 'password';
//     placeholder?: string;
//     [x: string]: any;
// }


export const MyTextInput = ( { label, ...props } ) => {

    const [ field ] = useField(props)

    return (
        <Form.Group controlId={ props.id || props.name }>
            <Form.Label >{ label }</Form.Label>
            <Form.Control className="form-control" { ...field } { ...props } />
            {/* <Form.Text className="text-muted" >Texto de observaciones { label }</Form.Text> */}
            <ErrorMessage name={ props.name } component="span" className='text-danger' />
        </Form.Group>
    )
}