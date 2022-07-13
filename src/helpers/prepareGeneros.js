// import moment from 'moment';

export const prepareGeneros = ( generos = [] ) => {

    return generos.generos.map(
        (e) => ({
            ...e,
            // end: moment( e.end ).toDate(),
            // start: moment( e.start ).toDate()
        })
    );

}