import { useField } from 'formik';
import { Form } from 'react-bootstrap';

export const MyLabel = ( { label, ...props } ) => {

    const [ field ] = useField(props)

    console.log(field.value);

    return (
        <Form.Group controlId={ props.id || props.name }>
            <Form.Label >{ label }</Form.Label>
            <Form.Label className='font-weight-bold pl-2' >{ field.value }</Form.Label>
        </Form.Group>
    )
}