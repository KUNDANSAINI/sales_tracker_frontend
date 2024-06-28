import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }) => {
  const loginName = localStorage.getItem('loginName');

  if(loginName==="admin@gmail.com"){
    return Component
  }else{
  return  <Navigate to="/" />;
  }
};

export default PrivateRoute;
