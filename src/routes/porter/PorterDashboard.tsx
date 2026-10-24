import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { useItemsStore } from '../../store/itemsStore';
import { Package, Clock, CheckCircle2, Bell } from 'lucide-react';
import { toast } from 'sonner';

export default function PorterDashboard() {
  const items = useItemsStore(state => state.items);
  
  const [isAvailable, setIsAvailable] = useState(true);

  const claimedItems = items.filter(i => i.status === 'SINALIZADO');
  const availableItems = items.filter(i => i.status === 'DISPONIVEL');
  const deliveredItems = items.filter(i => i.status === 'DEVOLVIDO');

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
    if (!isAvailable) {
      toast.success('Você está disponível para atendimento.');
    } else {
      toast.info('Você pausou o atendimento.');
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header e Disponibilidade */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div>
            <h1 className="text-2xl font-bold text-brand-navy dark:text-white">Visão Geral</h1>
            <p className="text-gray-500 dark:text-gray-400">Acompanhe o fluxo de Achados e Perdidos em tempo real.</p>
          </div>
          <button 
            onClick={toggleAvailability}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all shadow-sm border ${
              isAvailable 
                ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' 
                : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:border-slate-600'
            }`}
          >
            <span className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
            {isAvailable ? 'Disponível para Atendimento' : 'Atendimento Pausado'}
          </button>
        </div>

        {/* Cards de Resumo (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* KPI: Na Portaria */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4">
            <div className="bg-brand-blue-light dark:bg-slate-700 p-4 rounded-xl text-brand-blue dark:text-blue-400">
              <Package size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Na Portaria</p>
              <h3 className="text-2xl font-bold text-brand-navy dark:text-white">{availableItems.length}</h3>
            </div>
          </div>

          {/* KPI: Sinalizados (Com Botão de Ação) */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-amber-200 dark:border-amber-900/50 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-xl text-amber-500">
                <Clock size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Sinalizados</p>
                <h3 className="text-2xl font-bold text-brand-navy dark:text-white">{claimedItems.length}</h3>
              </div>
            </div>
            <Link 
              to="/porteiro/sinalizados" 
              className="w-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 font-medium py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-amber-200 dark:hover:bg-amber-900 transition-colors"
            >
              <Bell size={18} /> Ver Sinalizações
            </Link>
          </div>

          {/* KPI: Devolvidos */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4">
            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl text-brand-success">
              <CheckCircle2 size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Entregues</p>
              <h3 className="text-2xl font-bold text-brand-navy dark:text-white">{deliveredItems.length}</h3>
            </div>
          </div>
        </div>

        {/* Objetos Disponíveis (Apenas visualização) */}
        <section>
          <h2 className="text-xl font-bold text-brand-navy dark:text-white mb-4">Objetos na Portaria</h2>
          {availableItems.length > 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-gray-50 dark:bg-slate-900 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-slate-700">
                  <tr>
                    <th className="px-6 py-4 font-medium">Objeto</th>
                    <th className="px-6 py-4 font-medium">Local</th>
                    <th className="px-6 py-4 font-medium">Categoria</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {availableItems.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img src={item.imageUrl} alt={item.title} className="w-10 h-10 rounded-md object-cover" />
                        <span className="font-medium text-brand-navy dark:text-white">{item.title}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{item.location}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 capitalize">{item.category.toLowerCase()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
              <Package size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-2" />
              <p className="text-gray-500 dark:text-gray-400">Nenhum objeto disponível na portaria.</p>
            </div>
          )}
        </section>

      </div>
    </AppLayout>
  );
}