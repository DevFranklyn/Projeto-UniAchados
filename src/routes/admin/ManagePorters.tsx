import { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { useUsersStore } from '../../store/UserStore';
import { UserPlus, ShieldCheck, Trash2, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import type { UserRole } from '../../types';

export default function ManagePorters() {
  const users = useUsersStore(state => state.users);
  const addUser = useUsersStore(state => state.addUser);
  const removeUser = useUsersStore(state => state.removeUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('PORTEIRO');

  const staffMembers = users.filter(u => u.role !== 'USUARIO');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newEmail.endsWith('@uninassau.edu.br')) {
      toast.error('Preencha o nome e um e-mail @uninassau.edu.br válido.');
      return;
    }

    addUser({ 
      id: crypto.randomUUID(), 
      name: newName, 
      email: newEmail, 
      role: newRole 
    });
    
    toast.success(`Acesso de ${newRole} criado! O funcionário deve usar a opção "Primeiro Acesso" no login.`);
    setIsModalOpen(false); 
    setNewName(''); 
    setNewEmail('');
  };

  const handleRemove = (id: string, name: string) => {
    if (window.confirm(`Revogar acesso de ${name}?`)) {
      removeUser(id); toast.info(`Acesso de ${name} revogado.`);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div>
            <h1 className="text-2xl font-bold text-brand-navy dark:text-white">Gerenciamento de Acessos</h1>
            <p className="text-gray-500 dark:text-gray-400">Administradores e Porteiros.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-brand-blue hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-md">
            <UserPlus size={20} /> Novo Acesso
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-slate-900 text-gray-500 dark:text-gray-400 text-sm border-b dark:border-slate-700">
              <tr><th className="px-6 py-4 font-medium">Nome</th><th className="px-6 py-4 font-medium">E-mail Institucional</th><th className="px-6 py-4 font-medium">Perfil</th><th className="px-6 py-4 font-medium text-right">Ações</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {staffMembers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4 flex items-center gap-3 font-medium text-brand-navy dark:text-white">
                    <div className="w-8 h-8 rounded-full bg-brand-blue-light dark:bg-slate-700 text-brand-blue dark:text-blue-400 flex items-center justify-center font-bold">{user.name.charAt(0)}</div>
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-mono text-sm">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-brand-navy/5 text-brand-navy dark:bg-slate-700 dark:text-gray-300'}`}>
                      {user.role === 'ADMIN' ? <ShieldAlert size={14} /> : <ShieldCheck size={14} />} {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleRemove(user.id, user.name)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-4">Cadastrar Novo Acesso</h3>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-navy dark:text-gray-300 mb-1">Nome Completo</label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-transparent dark:text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy dark:text-gray-300 mb-1">E-mail Institucional</label>
                <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="nome@uninassau.edu.br" className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-transparent dark:text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-navy dark:text-gray-300 mb-1">Cargo</label>
                <select value={newRole} onChange={(e) => setNewRole(e.target.value as UserRole)} className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white">
                  <option value="PORTEIRO">Porteiro</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg">Cancelar</button>
                <button type="submit" className="flex-1 py-2 bg-brand-blue text-white font-medium rounded-lg hover:bg-blue-800">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}