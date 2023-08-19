import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/login';


export function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}