import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-navy mb-8 transition-colors font-medium"
        >
          <ArrowLeft size={20} /> Voltar
        </button>

        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
          <ShieldCheck size={36} className="text-brand-blue" />
          <h1 className="text-3xl font-bold text-brand-navy">Privacidade e Termos de Uso</h1>
        </div>

        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-brand-navy mb-3">1. Proteção de Dados (LGPD)</h2>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), informamos que os dados coletados nesta plataforma (matrícula, nome e registros de objetos) são utilizados exclusivamente para a finalidade de gestão do setor de Achados e Perdidos da UNINASSAU.
            </p>
            <p className="mt-2">
              O acesso aos dados pessoais de quem encontrou um objeto é restrito aos perfis de <strong>Administrador</strong> e <strong>Porteiro</strong>. O Usuário Comum não tem acesso a essas informações, garantindo a privacidade de todos os envolvidos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-navy mb-3">2. Termos de Uso</h2>
            <p>
              Esta plataforma é uma ferramenta de apoio. A confirmação de propriedade e a entrega física dos objetos ocorrem exclusivamente de forma presencial no setor de portaria da instituição.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>A plataforma não realiza entrega em domicílio.</li>
              <li>Não é permitida a comercialização de objetos.</li>
              <li>O objeto ficará arquivado internamente após 6 meses sem ser reivindicado, saindo da listagem pública.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-navy mb-3">3. Segurança</h2>
            <p>
              A autenticação no sistema é realizada via matrícula institucional e token de segurança. Suas informações de login são pessoais e intransferíveis.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}