import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import authToken from '../utils/authToken';

function Private({ Item, Login }) {
  const verificaRole = (role) => {
    if (role === 'administrator') {
      return <Navigate to="/admin/manage" replace />;
    }
    if (role === 'seller') {
      return <Navigate to="/seller/orders" replace />;
    }
    if (role === 'customer') {
      return <Navigate to="/customer/products" replace />;
    }
  };
  const { status, role } = authToken();
  // console.log(authToken());
  if (!Login) return status ? <Item /> : <Navigate to="/login" replace />;
  if (Login) return status ? verificaRole(role) : <Item />;
}

Private.propTypes = {
  children: PropTypes.node,
  Login: PropTypes.node,
}.isRequire;

export default Private;
