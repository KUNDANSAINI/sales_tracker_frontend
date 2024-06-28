import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const loginName = localStorage.getItem('loginName');

  return loginName ? Component : <Navigate to={'/'}/>
};

export default PrivateRoute;