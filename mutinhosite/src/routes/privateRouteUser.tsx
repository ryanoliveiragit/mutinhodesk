import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouterType {
  children: ReactNode;
}

export function PrivateRouteUser({ children }: PrivateRouterType) {
  const isAuth = localStorage.getItem('jwt');

  return isAuth ? <>{children}</> : <Navigate to="/" />;
}
