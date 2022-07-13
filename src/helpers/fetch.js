const baseUrl = process.env.REACT_APP_API_URL;
const baseUrlNet = process.env.REACT_APP_API_URL_NET;

const fecthSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;

    if ( method === 'GET' ){
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}

const fecthConToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';

    if ( method === 'GET' ){
        return fetch( url, {
            method,
            headers: {
                'x-token': token
            }
        } );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        });
    }
}

const fecthSinTokenNet = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrlNet }/${ endpoint }`;

    if ( method === 'GET' ){
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}

const fecthConTokenNet = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrlNet }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';

    if ( method === 'GET' ){
        return fetch( url, {
            method,
            headers: {
                'x-token': token
            }
        } );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        });
    }
}


export {
    fecthSinToken,
    fecthConToken,
    fecthSinTokenNet,
    fecthConTokenNet,
}