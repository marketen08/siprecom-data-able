import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

import LoginApp from './LoginApp';

const Signin1 = () => {

  

  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless text-center">
            <Card.Body>
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              
              <LoginApp />
              <p className="mb-2 text-muted">
                Olvidaste la contraseña?{' '}
                <NavLink to="/auth/reset-password-1" className="f-w-400">
                  Restablecer
                </NavLink>
              </p>
              <p className="mb-0 text-muted">
                No tenes una cuenta?{' '}
                <NavLink to="/auth/signup-1" className="f-w-400">
                  Registrate
                </NavLink>
              </p>
              
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin1;
