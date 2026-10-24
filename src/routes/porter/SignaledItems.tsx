import { useState, useMemo } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { useItemsStore } from '../../store/itemsStore';
import { CheckCircle, Bell, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import type { LostItem, Category } from '../../types';

const CATEGORIES: (Category | 'TODOS')[] = ['TODOS', 'ELETRONICOS', 'DOCUMENTOS', 'VESTUARIO', 'MATERIAIS', 'OUTROS'];

export default function SignaledItems() {
  const items = useItemsStore(state => state.items);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'TODOS'>('TODOS');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LostItem | null>(null);
  const [name, setName] = useState('');
  const [matricula, setMatricula] = useState('');
  const [cpf, setCpf] = useState('');
  const [address, setAddress] = useState('');

  const claimedItems = useMemo(() => {
    return items.filter(i => {
      if (i.status !== 'SINALIZADO') return false;
      const matchesSearch = i.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'TODOS' || i.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  const handleDeliver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    useItemsStore.setState(state => ({
      items: state.items.map(i => i.id === selectedItem.id ? {
        ...i,
        status: 'DEVOLVIDO',
        receivedByName: name,
        receivedByMatricula: matricula,
        receivedByCPF: cpf,
        receivedByAddress: address,
        deliveredAt: new Date().toISOString()
      } : i)
    }));

    toast.success(`Entrega de "${selectedItem.title}" registrada!`);
    setIsModalOpen(false);
    setName(''); setMatricula(''); setCpf(''); setAddress('');
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h1 className="text-2xl font-bold text-brand-navy dark:text-white flex items-center gap-2">
            <Bell className="text-amber-500" /> Itens Sinalizados
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Aguardando validação presencial para entrega.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input type="text" placeholder="Buscar item sinalizado..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-brand-blue bg-white dark:bg-slate-800 text-gray-900 dark:text-white" />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Filter size={18} className="text-gray-400 mr-2 flex-shrink-0" />
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-brand-blue text-white' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600'}`}>
                {cat === 'TODOS' ? 'Todos' : cat.charAt(0) + cat.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {claimedItems.length > 0 ? (
          <div className="grid gap-4">
            {claimedItems.map(item => (
              <div key={item.id} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={item.imageUrl} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-bold text-brand-navy dark:text-white">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.location}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setSelectedItem(item); setIsModalOpen(true); }} className="bg-brand-success text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-green-600 shadow-md transition-colors">
                    <CheckCircle size={18} /> Registrar Entrega
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 text-gray-500">
            Nenhum item sinalizado encontrado.
          </div>
        )}
      </div>

      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-xl">
            <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-4">Registrar Entrega: {selectedItem.title}</h3>
            <form onSubmit={handleDeliver} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome de quem recebeu *</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" required /></div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Matrícula *</label><input type="text" value={matricula} onChange={e => setMatricula(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" required /></div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CPF</label><input type="text" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="000.000.000-00" className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" /></div>
              <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Endereço *</label><input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600 dark:text-white" required /></div>
              <div className="flex gap-3 pt-4"><button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg">Cancelar</button><button type="submit" className="flex-1 py-2 bg-brand-success text-white rounded-lg hover:bg-green-600">Confirmar</button></div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}