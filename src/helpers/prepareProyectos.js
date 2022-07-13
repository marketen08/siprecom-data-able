// import moment from 'moment';

export const prepareProyectos = ( proyectos = [] ) => {

    return proyectos.map(
        (e) => ({
            ...e,
            // end: moment( e.end ).toDate(),
            // start: moment( e.start ).toDate()
        })
    );

}