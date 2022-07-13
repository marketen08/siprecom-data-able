// import moment from 'moment';

export const prepareSistemas = ( sistemas = [] ) => {

    return sistemas.sistemas.map(
        (e) => ({
            ...e,
            // end: moment( e.end ).toDate(),
            // start: moment( e.start ).toDate()
        })
    );

}