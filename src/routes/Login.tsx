import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useUsersStore } from '../store/UserStore';
import { ShieldCheck, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const users = useUsersStore((state) => state.users);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = users.find(u => u.email === email);
    
    if (!user) {
      toast.error('E-mail não encontrado. Faça o Primeiro Acesso.');
      return;
    }

    if (!user.password) {
      toast.info('Primeiro acesso detectado. Você precisa criar uma senha.');
      navigate('/recuperar-senha', { state: { email } });
      return;
    }

    if (user.password !== password) {
      toast.error('Senha incorreta.');
      return;
    }

    login(user);
    toast.success(`Bem-vindo, ${user.name}!`);
    if (user.role === 'ADMIN') navigate('/admin');
    if (user.role === 'PORTEIRO') navigate('/porteiro');
    if (user.role === 'USUARIO') navigate('/aluno');
  };

  return (
    <div className="min-h-screen flex bg-brand-bg dark:bg-slate-900 transition-colors duration-300">
      <div className="hidden lg:flex w-1/2 bg-brand-navy flex-col justify-center items-center p-12 text-white">
        <ShieldCheck size={80} className="text-brand-success mb-6" />
        <h1 className="text-4xl font-bold mb-4">Achados & Perdidos</h1>
        <p className="text-gray-300 text-center max-w-md">A plataforma oficial da UNINASSAU.</p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-2">Acesse sua conta</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Use seu e-mail institucional.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-navy dark:text-gray-300 mb-1">E-mail Institucional</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail size={18} className="text-gray-400" /></div>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu.nome@uninassau.edu.br" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-brand-blue dark:text-white" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-navy dark:text-gray-300 mb-1">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock size={18} className="text-gray-400" /></div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Sua senha" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-brand-blue dark:text-white" required />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <Link to="/recuperar-senha" className="text-brand-blue hover:underline font-medium">Primeiro Acesso ou Esqueci a Senha</Link>
            </div>

            <button type="submit" className="w-full bg-brand-blue text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition-colors">Entrar no Sistema</button>
          </form>
        </div>
      </div>
    </div>
  );
}