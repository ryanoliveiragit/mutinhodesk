import { Routes, Route } from 'react-router-dom';
import { Chamados } from '../pages/chamados';
import { AdminChamados } from '../pages/chamadosAdmin';
import { DetalhesChamadoPage } from '../pages/detalhesChamados';
import { LoginPage } from '../pages/login';
import { MeusChamadosPage } from '../pages/meusChamados/meusChamados';
import { PrivateRoute } from './privateRoute';
import { PrivateRouteUser } from './privateRouteUser';


export function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/admin/chamados" element={<PrivateRoute><AdminChamados /></PrivateRoute>} />
      <Route path="/user/chamados" element={<PrivateRouteUser><Chamados /></PrivateRouteUser>} />
      <Route path="/user/meusChamados" element={<PrivateRouteUser><MeusChamadosPage /></PrivateRouteUser>} />
      <Route path="/chamado/:idchamados" element={<PrivateRoute><DetalhesChamadoPage /></PrivateRoute>}/>
    </Routes>
  );
}
