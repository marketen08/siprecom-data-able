// import moment from 'moment';

export const prepareClientes = ( clientes = [] ) => {

    return clientes.map(
        (e) => ({
            ...e,
            // end: moment( e.end ).toDate(),
            // start: moment( e.start ).toDate()
        })
    );

}