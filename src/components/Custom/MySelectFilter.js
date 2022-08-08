import { ErrorMessage, useField } from 'formik';
import { Form } from 'react-bootstrap';
import SelectReact from 'react-select'

export const MySelectFilter = ( { label, ...props } ) => {

    const [ field ] = useField(props)

    const getStyle = {
        control: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
        }),
        option: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
        })

        
    };

    return (
        <Form.Group controlId={ props.id || props.name }>
            <Form.Label >{ label }</Form.Label>
            {/* <select className="form-control"  { ...field } { ...props } /> */}
            <SelectReact
                className="form-control"
                { ...field } { ...props }
                styles={ getStyle }
            />
            <ErrorMessage name={ props.name } component="span" />
        </Form.Group>
    )
}
