import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';


function ProtectedRoute(props) {
  let verified = false;
  return verified ? <Outlet /> : <Navigate to={{ pathname: '/login' }} />
}

export default ProtectedRoute