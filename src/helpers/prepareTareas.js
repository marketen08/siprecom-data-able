import moment from 'moment';

export const prepareTareas = ( tareas = [] ) => {

    return tareas.map(
        (e) => ({
            ...e,
            end: moment( e.end ).toDate(),
            start: moment( e.start ).toDate()
        })
    );

}