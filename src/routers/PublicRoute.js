import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router';

export const PublicRoute = ({
    children,
    isAuthenticated,
}) => {

    return isAuthenticated
    ? <Navigate to='/' />
    : children
}


PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}