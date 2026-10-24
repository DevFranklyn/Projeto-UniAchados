import { MapPin, Calendar} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LostItem } from '../../types';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function ItemCard({ item }: { item: LostItem }) {
  const formattedDate = format(parseISO(item.dateFound), "dd 'de' MMM", { locale: ptBR });
  const isReturned = item.status === 'DEVOLVIDO';

  return (
    <Link to={`/aluno/objeto/${item.id}`} className={`group block rounded-xl shadow-sm border overflow-hidden transition-all ${isReturned ? 'bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 opacity-70 grayscale' : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 hover:shadow-md hover:-translate-y-1'}`}>
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-slate-900">
        <img src={item.imageUrl} alt={item.title} className={`w-full h-full object-cover ${!isReturned && 'group-hover:scale-105 transition-transform duration-300'}`} />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${isReturned ? 'bg-gray-500 text-white' : item.status === 'DISPONIVEL' ? 'bg-brand-success text-white' : 'bg-amber-500 text-white'}`}>
            {isReturned ? 'Já Retirado' : item.status === 'DISPONIVEL' ? 'Disponível' : item.status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-brand-navy dark:text-white text-lg mb-1 truncate">{item.title}</h3>
        <div className="space-y-2 mt-3">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2"><MapPin size={16} className="text-brand-blue" /><span className="truncate">{item.location}</span></div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2"><Calendar size={16} className="text-brand-blue" /><span>{formattedDate}</span></div>
        </div>
      </div>
    </Link>
  );
}