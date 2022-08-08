import { ErrorMessage, useField } from 'formik';
import { Form } from 'react-bootstrap';
import { Autocomplete, TextField } from '@mui/material';

export const MyAutocomplete = ( { label, ...props } ) => {

    const [ field ] = useField(props)

    // const skill = ['html', 'css', 'javascript'];

    // console.log( field )
    // console.log( props )

    return (
        <Form.Group >
            <Form.Label >{ label }</Form.Label>
            {/* <Form.Control className="form-control"  /> */}
            <Autocomplete
                { ...field } { ...props }
                renderInput={(params) => {
                    console.log(params)
                    return <TextField className="form-control" { ...params } label={ label } />
                }}
            />
            <ErrorMessage name={ props.name } component="span" className='text-danger' />
        </Form.Group>
    )
}