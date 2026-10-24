import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut, Users, Moon, Sun, Archive, CheckSquare, Bell } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';

export function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { isDark, toggleTheme } = useThemeStore();

  const handleLogout = () => { logout(); navigate('/'); };

  const menuItems = user?.role === 'ADMIN' ? [
    { path: '/admin', label: 'Gerenciar Acessos', icon: <Users size={20} /> },
  ] : [
    { path: '/porteiro', label: 'Visão Geral', icon: <Bell size={20} /> },
    { path: '/porteiro/cadastrar', label: 'Novo Registro', icon: <PlusCircle size={20} /> },
    { path: '/porteiro/entregues', label: 'Itens Entregues', icon: <CheckSquare size={20} /> },
    { path: '/porteiro/arquivados', label: 'Itens Arquivados', icon: <Archive size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-brand-bg dark:bg-slate-900 transition-colors duration-300">
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 flex flex-col shadow-sm hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-gray-100 dark:border-slate-700">
          <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold text-xl">AP</div>
          <div>
            <h1 className="font-bold text-brand-navy dark:text-white leading-tight">{user?.role === 'ADMIN' ? 'Painel Admin' : 'Painel Porteiro'}</h1>
            <span className="text-xs text-gray-500 dark:text-gray-400">UNINASSAU</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-brand-blue-light dark:bg-slate-700 text-brand-blue dark:text-blue-400 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'}`}>
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 flex items-center px-8 shadow-sm justify-between">
          <h2 className="text-lg font-semibold text-brand-navy dark:text-white">Área Restrita</h2>
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 hidden sm:block">Olá, <strong className="text-brand-navy dark:text-white">{user?.name}</strong></span>
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={handleLogout} className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-2 text-sm font-medium">
              <LogOut size={18} /> Sair
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </main>
    </div>
  );
}