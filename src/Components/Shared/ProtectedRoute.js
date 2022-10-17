import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';


function ProtectedRoute(props) {
  let verified = true;
  return verified ? <Outlet /> : <Navigate to={{ pathname: '/login' }} />
}

export default ProtectedRoute