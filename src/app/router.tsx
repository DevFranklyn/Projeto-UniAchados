import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../routes/Login';
import RecoverPassword from '../routes/RecoverPassword';
import Home from '../routes/user/Home';
import ObjectDetails from '../routes/user/ObjectDetails';
import PorterDashboard from '../routes/porter/PorterDashboard'; 
import RegisterObject from '../routes/porter/RegisterObjects'; 
import SignaledItems from '../routes/porter/SignaledItems';
import DeliveredItems from '../routes/porter/DeliveredItems';
import ArchivedItems from '../routes/porter/ArchivedItems';
import ManagePorters from '../routes/admin/ManagePorters';
import Privacy from '../routes/Privacy';

export const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/recuperar-senha', element: <RecoverPassword /> },
  { path: '/privacidade', element: <Privacy /> },
  {
    path: '/aluno',
    children: [
      { path: '', element: <Home /> },
      { path: 'objeto/:id', element: <ObjectDetails /> },
    ],
  },
  {
    path: '/porteiro',
    children: [
      { path: '', element: <PorterDashboard /> },
      { path: 'sinalizados', element: <SignaledItems /> },
      { path: 'cadastrar', element: <RegisterObject /> },
      { path: 'entregues', element: <DeliveredItems /> },
      { path: 'arquivados', element: <ArchivedItems /> },
    ],
  },
  {
    path: '/admin',
    children: [
      { path: '', element: <ManagePorters /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);