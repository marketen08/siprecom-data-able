import PropTypes from 'prop-types';
import { Navigate } from 'react-router';

export const PrivateRoute = ({
    children,
    isAuthenticated,
}) => {

    return isAuthenticated
    ? children
    : <Navigate to='/login' />
    
}


PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}