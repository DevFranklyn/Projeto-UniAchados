import { createBrowserRouter, Navigate } from 'react-router-dom';

// Placeholders temporários
const LoginPlaceholder = () => <div>Página de Login (Em construção)</div>;
const PrivacyPlaceholder = () => <div>Página de Privacidade/LGPD (Em construção)</div>;
const UserHomePlaceholder = () => <div>Listagem de Objetos (Em construção)</div>;
const PorterDashboardPlaceholder = () => <div>Painel do Porteiro (Em construção)</div>;
const AdminDashboardPlaceholder = () => <div>Painel do Administrador (Em construção)</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPlaceholder />,
  },
  {
    path: '/privacidade',
    element: <PrivacyPlaceholder />,
  },
  {
    // Rotas do Usuário Comum
    path: '/aluno',
    children: [
      { path: '', element: <UserHomePlaceholder /> },
      { path: 'objeto/:id', element: <div>Detalhes do Objeto (Em construção)</div> },
    ],
  },
  {
    // Rotas do Porteiro
    path: '/porteiro',
    children: [
      { path: '', element: <PorterDashboardPlaceholder /> },
      { path: 'cadastrar', element: <div>Cadastrar Objeto (Em construção)</div> },
    ],
  },
  {
    // Rotas do Admin
    path: '/admin',
    children: [
      { path: '', element: <AdminDashboardPlaceholder /> },
    ],
  },
  {
    // Rota de fallback (qualquer URL invalida volta pro login)
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);