import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { UserLayout } from '../../components/layout/UserLayout';
import { ItemCard } from '../../components/ui/ItemCard';
import { useItemsStore } from '../../store/itemsStore';
import type { Category } from '../../types';

const CATEGORIES: (Category | 'TODOS')[] = ['TODOS', 'ELETRONICOS', 'DOCUMENTOS', 'VESTUARIO', 'MATERIAIS', 'OUTROS'];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'TODOS'>('TODOS');
  const items = useItemsStore(state => state.items);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Incluindo DEVOLVIDO para a Solução 1 (Histórico no catálogo)
      const isVisible = item.status === 'DISPONIVEL' || item.status === 'SINALIZADO' || item.status === 'DEVOLVIDO';
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'TODOS' || item.category === selectedCategory;
      return isVisible && matchesSearch && matchesCategory;
    });
  }, [items, searchTerm, selectedCategory]);

  return (
    <UserLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div><h2 className="text-2xl font-bold text-brand-navy dark:text-white">Objetos Encontrados</h2><p className="text-gray-500 dark:text-gray-400 mt-1">Consulte os itens que estão no setor.</p></div>
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search size={18} className="text-gray-400" /></div>
            <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-brand-blue shadow-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors" />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter size={18} className="text-gray-400 mr-2 flex-shrink-0" />
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-brand-blue text-white shadow-md' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:border-brand-blue'}`}>
              {cat === 'TODOS' ? 'Todos' : cat.charAt(0) + cat.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => <ItemCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
            <Search size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-brand-navy dark:text-white mb-1">Nenhum objeto encontrado</h3>
            <p className="text-gray-500 dark:text-gray-400">Tente outros termos.</p>
          </div>
        )}
      </div>
    </UserLayout>
  );
}