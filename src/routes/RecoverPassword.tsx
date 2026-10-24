import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUsersStore } from '../store/UserStore';
import { ShieldCheck, ArrowLeft, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function RecoverPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialEmail = location.state?.email || '';

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState(initialEmail);
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const updatePassword = useUsersStore(state => state.updatePassword);
  const registerStudentByEmail = useUsersStore(state => state.registerStudentByEmail);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.endsWith('@uninassau.edu.br')) {
      toast.error('Use o e-mail institucional @uninassau.edu.br');
      return;
    }
    toast.success('Token enviado para o seu e-mail! (Use 123456)');
    setStep(2);
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token !== '123456') {
      toast.error('Token inválido.');
      return;
    }
    setStep(3);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    const updated = updatePassword(email, newPassword);
    if (!updated) {
      const newUser = registerStudentByEmail(email);
      if (newUser) {
        useUsersStore.setState(state => ({
          users: state.users.map(u => u.email === email ? { ...u, password: newPassword } : u)
        }));
      }
    }

    toast.success('Senha configurada com sucesso! Faça login.');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-brand-bg dark:bg-slate-900 transition-colors duration-300">
      <div className="hidden lg:flex w-1/2 bg-brand-navy flex-col justify-center items-center p-12 text-white">
        <ShieldCheck size={80} className="text-brand-success mb-6" />
        <h1 className="text-4xl font-bold mb-4">Achados & Perdidos</h1>
        <p className="text-gray-300 text-center max-w-md">Recupere seu acesso de forma segura.</p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <button type="button" onClick={() => navigate('/')} className="text-gray-500 hover:text-brand-navy dark:hover:text-white flex items-center gap-1 text-sm mb-4"><ArrowLeft size={16} /> Voltar para o Login</button>
                <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-2">Primeiro Acesso / Recuperação</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Informe seu e-mail institucional para receber o código.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy dark:text-gray-300 mb-1">E-mail Institucional</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail size={18} className="text-gray-400" /></div>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu.nome@uninassau.edu.br" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-brand-blue dark:text-white" required />
                </div>
              </div>
              <button type="submit" className="w-full bg-brand-blue text-white font-semibold py-3 rounded-lg hover:bg-blue-800">Enviar Código</button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleTokenSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-2">Código de Segurança</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Digite o token enviado para {email}.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy dark:text-gray-300 mb-1">Token</label>
                <input type="text" maxLength={6} value={token} onChange={(e) => setToken(e.target.value)} placeholder="000000" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-transparent text-center text-2xl tracking-widest font-mono dark:text-white" required />
              </div>
              <button type="submit" className="w-full bg-brand-blue text-white font-semibold py-3 rounded-lg hover:bg-blue-800">Validar Código</button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-2">Crie sua Senha</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Defina uma senha segura para acessar o sistema.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy dark:text-gray-300 mb-1">Nova Senha</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock size={18} className="text-gray-400" /></div>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Mínimo 6 caracteres" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-brand-blue dark:text-white" required />
                </div>
              </div>
              <button type="submit" className="w-full bg-brand-success text-white font-semibold py-3 rounded-lg hover:bg-green-600">Salvar e Ir para o Login</button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}