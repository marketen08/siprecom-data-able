// import moment from 'moment';

export const prepareTipos = ( tipos = [] ) => {

    return tipos.map(
        (e) => ({
            ...e,
            // end: moment( e.end ).toDate(),
            // start: moment( e.start ).toDate()
        })
    );

}