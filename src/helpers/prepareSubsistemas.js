import moment from 'moment';

export const prepareSistemas = ( sistemas = [] ) => {

    return sistemas.map(
        (e) => ({
            ...e,
            inicio: moment( e.inicio ).toDate(),
            fin: moment( e.fin ).toDate()
        })
    );

}