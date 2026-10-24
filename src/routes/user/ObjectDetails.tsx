import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import { UserLayout } from '../../components/layout/UserLayout';
import { useItemsStore } from '../../store/itemsStore';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';

export default function ObjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  
  const items = useItemsStore(state => state.items);
  const updateItemStatus = useItemsStore(state => state.updateItemStatus);

  const item = items.find(i => i.id === id);

  if (!item) {
    return <UserLayout><div className="text-center py-20"><h2 className="text-2xl font-bold dark:text-white mb-4">Objeto não encontrado</h2><button onClick={() => navigate('/aluno')} className="text-brand-blue hover:underline">Voltar</button></div></UserLayout>;
  }

  const formattedDate = format(parseISO(item.dateFound), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });

  const handleClaim = () => {
    updateItemStatus(item.id, 'SINALIZADO');
    setIsClaimModalOpen(false);
    toast.success('Propriedade sinalizada!');
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/aluno')} className="flex items-center gap-2 text-gray-500 hover:text-brand-navy dark:hover:text-white mb-6 font-medium"><ArrowLeft size={20} /> Voltar</button>
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-64 md:h-full bg-gray-100"><img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" /></div>
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-brand-navy dark:text-white">{item.title}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.status === 'DISPONIVEL' ? 'bg-brand-success text-white' : item.status === 'DEVOLVIDO' ? 'bg-gray-500 text-white' : 'bg-amber-500 text-white'}`}>{item.status}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{item.description}</p>
                <div className="space-y-4 bg-brand-blue-light/50 dark:bg-slate-900/50 p-4 rounded-xl border border-blue-50 dark:border-slate-700">
                  <div className="flex items-center gap-3 text-brand-navy dark:text-white"><MapPin className="text-brand-blue" size={20} /><div><p className="text-xs text-gray-500 uppercase font-semibold">Local</p><p className="font-medium">{item.location}</p></div></div>
                  <div className="flex items-center gap-3 text-brand-navy dark:text-white"><Calendar className="text-brand-blue" size={20} /><div><p className="text-xs text-gray-500 uppercase font-semibold">Data</p><p className="font-medium">{formattedDate}</p></div></div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700">
                {item.status === 'DEVOLVIDO' ? (
                  <div className="flex items-center gap-3 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 p-4 rounded-xl border border-gray-200 dark:border-slate-600">
                    <AlertCircle size={24} className="text-gray-500" />
                    <div><p className="font-semibold">Objeto já retirado</p><p className="text-sm mt-1">Por privacidade (LGPD), não exibimos quem retirou. Se acredita que houve um erro, fale com a portaria presencialmente.</p></div>
                  </div>
                ) : item.status === 'SINALIZADO' ? (
                  <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 p-4 rounded-xl border border-amber-100 dark:border-amber-800/50">
                    <AlertCircle size={24} /><div><p className="font-semibold">Objeto sinalizado</p><p className="text-sm">Dirija-se à portaria.</p></div>
                  </div>
                ) : (
                  <button onClick={() => setIsClaimModalOpen(true)} className="w-full bg-brand-blue text-white font-semibold py-4 rounded-xl hover:bg-blue-800 flex items-center justify-center gap-2 text-lg shadow-md"><CheckCircle2 size={22} /> Este objeto é meu!</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isClaimModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-2">Sinalizar Propriedade</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">O Porteiro será notificado. Vá à portaria com documento.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsClaimModalOpen(false)} className="flex-1 py-3 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl">Cancelar</button>
              <button onClick={handleClaim} className="flex-1 py-3 bg-brand-success text-white font-medium rounded-xl hover:bg-green-600 shadow-md">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
}