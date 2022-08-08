import { ErrorMessage, useField } from 'formik';
import { Form } from 'react-bootstrap';

// interface Props {
//     label: string;
//     name: string;
//     placeholder?: string;
//     [x: string]: any;
// }


export const MySelect = ( { label, ...props } ) => {

    const [ field ] = useField(props)

    return (
        <Form.Group controlId={ props.id || props.name }  >
            <Form.Label >{ label }</Form.Label>
            <select className="form-control form-control-sm"  { ...field } { ...props } />
            <ErrorMessage name={ props.name } component="span" className='text-danger' />
        </Form.Group>
    )
}
