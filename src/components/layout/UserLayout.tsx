import type { ReactNode } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { LogOut, ShieldCheck, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function UserLayout({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { isDark, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-slate-900 flex flex-col transition-colors duration-300">
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck size={28} className="text-brand-blue" />
            <h1 className="text-xl font-bold text-brand-navy dark:text-white">Achados & Perdidos</h1>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">Olá, <strong className="text-brand-navy dark:text-white">{user?.name}</strong></span>
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={handleLogout} className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-2 text-sm font-medium">
              <LogOut size={18} /> Sair
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}