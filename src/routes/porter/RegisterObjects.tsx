import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AppLayout } from '../../components/layout/AppLayout';
import { useItemsStore } from '../../store/itemsStore';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import type { Category } from '../../types';

const registerSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 letras'),
  description: z.string().min(5, 'A descrição deve ser mais detalhada'),
  category: z.enum(['ELETRONICOS', 'DOCUMENTOS', 'VESTUARIO', 'MATERIAIS', 'OUTROS']),
  location: z.string().min(3, 'Informe o local'),
  finderName: z.string().optional(),
  finderMatricula: z.string().optional(),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterObject() {
  const addItem = useItemsStore(state => state.addItem);
  const user = useAuthStore(state => state.user);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      category: 'ELETRONICOS'
    }
  });

  const onSubmit = (data: RegisterFormInputs) => {
    addItem({
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      category: data.category as Category,
      location: data.location,
      dateFound: new Date().toISOString(),
      imageUrl: `https://placehold.co/400x300/EFF6FF/1E40AF?text=${encodeURIComponent(data.title)}`,
      status: 'DISPONIVEL',
      porterId: user?.id || 'desconhecido',
      finderName: data.finderName,
      finderMatricula: data.finderMatricula,
    });

    toast.success('Objeto cadastrado com sucesso!');
    navigate('/porteiro');
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-brand-navy dark:text-white">Registrar Objeto Encontrado</h1>
          <p className="text-gray-500 dark:text-gray-400">Preencha as informações do item entregue na portaria.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 space-y-6">
          
          {/* Upload de foto simulado */}
          <div>
            <label className="block text-sm font-medium text-brand-navy dark:text-gray-300 mb-2">Foto do Objeto</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
              <Camera size={32} className="mb-2 text-brand-blue dark:text-blue-400" />
              <p className="text-sm font-medium text-brand-navy dark:text-gray-300">Adicionar Foto</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-brand-navy dark:text-gray-300 mb-1">Título do Objeto</label>
              <input 
                {...register('title')} 
                className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-blue bg-transparent dark:bg-slate-700 dark:text-white" 
                placeholder="Ex: Fone de ouvido JBL" 
              />
              {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-brand-navy dark:text-gray-300 mb-1">Descrição</label>
              <textarea 
                {...register('description')} 
                rows={3} 
                className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-blue bg-transparent dark:bg-slate-700 dark:text-white" 
                placeholder="Cor, marca, detalhes..." 
              />
              {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-navy dark:text-gray-300 mb-1">Categoria</label>
              <select 
                {...register('category')} 
                className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-blue bg-white dark:bg-slate-700 dark:text-white"
              >
                <option value="ELETRONICOS">Eletrônicos</option>
                <option value="DOCUMENTOS">Documentos</option>
                <option value="VESTUARIO">Vestuário</option>
                <option value="MATERIAIS">Materiais</option>
                <option value="OUTROS">Outros</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-navy dark:text-gray-300 mb-1">Local Encontrado</label>
              <input 
                {...register('location')} 
                className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-blue bg-transparent dark:bg-slate-700 dark:text-white" 
                placeholder="Ex: Bloco B - Sala 102" 
              />
              {errors.location && <span className="text-red-500 text-xs mt-1">{errors.location.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-navy dark:text-gray-300 mb-1">Quem entregou? (Opcional)</label>
              <input 
                {...register('finderName')} 
                className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-blue bg-transparent dark:bg-slate-700 dark:text-white" 
                placeholder="Nome do aluno/funcionário" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-navy dark:text-gray-300 mb-1">Matrícula de quem entregou (Opcional)</label>
              <input 
                {...register('finderMatricula')} 
                className="w-full px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-brand-blue bg-transparent dark:bg-slate-700 dark:text-white" 
                placeholder="Matrícula" 
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-4 border-t border-gray-100 dark:border-slate-700">
            <button 
              type="button" 
              onClick={() => navigate('/porteiro')} 
              className="px-6 py-2 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-brand-blue text-white font-medium rounded-lg hover:bg-blue-800 transition-colors shadow-md"
            >
              Salvar Registro
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}