import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouterType {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouterType) {
  const isAuth = localStorage.getItem('auth'); // Verifica se o usuário está autenticado
  const accessLevel = localStorage.getItem('accessLevel'); // Obtém o nível de acesso do usuário

  if (isAuth) {
    if (accessLevel === 'admin') {
      return <>{children}</>; // Renderiza o conteúdo para admin
    } else {
      // Bloqueia o acesso de usuários comuns a rotas de admin
      return <Navigate to="/user/chamados" replace />;
    }
  } else {
    return <Navigate to="/" />;
  }
}
