import { useState, useMemo } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { useItemsStore } from '../../store/itemsStore';
import { Archive, Search, Filter } from 'lucide-react';
import type { Category } from '../../types';

const CATEGORIES: (Category | 'TODOS')[] = ['TODOS', 'ELETRONICOS', 'DOCUMENTOS', 'VESTUARIO', 'MATERIAIS', 'OUTROS'];

export default function ArchivedItems() {
  const items = useItemsStore(state => state.items);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'TODOS'>('TODOS');

  const archivedItems = useMemo(() => {
    return items.filter(i => {
      if (i.status !== 'ARQUIVADO') return false;
      const matchesSearch = i.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'TODOS' || i.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <h1 className="text-2xl font-bold text-brand-navy dark:text-white flex items-center gap-2"><Archive className="text-gray-500" /> Itens Arquivados</h1>
          <p className="text-gray-500 dark:text-gray-400">Objetos fora do catálogo público (não reclamados ou descartados).</p>
        </div>

        {/* Barra de Pesquisa e Filtros */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input type="text" placeholder="Buscar item arquivado..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-brand-blue bg-white dark:bg-slate-800 text-gray-900 dark:text-white" />
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

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-gray-50 dark:bg-slate-900 text-gray-500 border-b dark:border-slate-700">
              <tr><th className="px-6 py-4">Objeto</th><th className="px-6 py-4">Local</th><th className="px-6 py-4">Categoria</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {archivedItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4 flex items-center gap-3"><img src={item.imageUrl} alt={item.title} className="w-10 h-10 rounded-md object-cover opacity-50 grayscale" /><span className="font-medium dark:text-gray-300">{item.title}</span></td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.location}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400 capitalize">{item.category.toLowerCase()}</td>
                </tr>
              ))}
              {archivedItems.length === 0 && <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">Nenhum item encontrado.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}