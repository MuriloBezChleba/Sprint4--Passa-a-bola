import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import NavCard from '../components/NavCard';
import { FaUsers, FaCalendar, FaTrophy, FaSearch, FaSitemap, FaMapMarkedAlt } from 'react-icons/fa';
import { apiGet } from '../config/api';
import { useAuth } from '../context/AuthContext';

// Importar dados JSON locais (REQUISITO OBRIGATÓRIO)
import jogadorasLocal from '../data/jogadoras.json';
import eventosLocal from '../data/eventos.json';

/**
 * Página de Dashboard Dinâmico (REQUISITO OBRIGATÓRIO)
 * Exibe estatísticas em tempo real e cards de navegação
 * Usa CSS Grid responsivo (REQUISITO OBRIGATÓRIO)
 */
const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalJogadoras: 0,
    totalEventos: 0,
    totalTorneios: 0,
  });
  const [loading, setLoading] = useState(true);

  /**
   * Carrega estatísticas da API ou dos dados JSON locais
   * Requisito: Consumir API e JSON local
   */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Tentar buscar da API primeiro
        try {
          const jogadoras = await apiGet('/api/players');
          const eventos = await apiGet('/api/events');
          const torneios = await apiGet('/api/tournaments');
          
          setStats({
            totalJogadoras: jogadoras.length,
            totalEventos: eventos.length,
            totalTorneios: torneios.length,
          });
        } catch (apiError) {
          // Se API falhar, usar dados JSON locais (REQUISITO OBRIGATÓRIO)
          console.log('API indisponível, usando dados locais');
          setStats({
            totalJogadoras: jogadorasLocal.length,
            totalEventos: eventosLocal.length,
            totalTorneios: 12, // Valor fixo para exemplo
          });
        }
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Carregando...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Bem-vinda, <span className="text-primary-pink">{user?.nome || 'Usuária'}</span>! ⚽
          </h1>
          <p className="text-gray-400">
            Confira as estatísticas da plataforma e navegue pelas funcionalidades
          </p>
        </header>

        {/* StatCards - CSS GRID (REQUISITO OBRIGATÓRIO) */}
        <section className="mb-12" aria-label="Estatísticas da plataforma">
          <h2 className="text-2xl font-bold text-white mb-6">Estatísticas em Tempo Real</h2>
          
          {/* CSS Grid com 3 colunas responsivas (OBRIGATÓRIO) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Jogadoras Cadastradas"
              value={stats.totalJogadoras}
              icon={<FaUsers />}
              color="primary-pink"
            />
            <StatCard
              title="Eventos Agendados"
              value={stats.totalEventos}
              icon={<FaCalendar />}
              color="primary-purple"
            />
            <StatCard
              title="Torneios Ativos"
              value={stats.totalTorneios}
              icon={<FaTrophy />}
              color="primary-green"
            />
          </div>
        </section>

        {/* NavCards - Acesso Rápido */}
        <section aria-label="Navegação rápida">
          <h2 className="text-2xl font-bold text-white mb-6">Acesso Rápido</h2>
          
          {/* CSS Grid com 2 colunas em tablets e 3 em desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NavCard
              title="Procurar Jogadoras"
              description="Busque talentos por posição, nacionalidade e outras características"
              to="/players"
              icon={<FaSearch />}
              color="primary-pink"
            />
            <NavCard
              title="Chaveamento de Torneios"
              description="Visualize os torneios em andamento e seus chaveamentos"
              to="/tournaments"
              icon={<FaSitemap />}
              color="primary-purple"
            />
            <NavCard
              title="Mapa de Eventos"
              description="Encontre peneiras, festivais e eventos perto de você"
              to="/events"
              icon={<FaMapMarkedAlt />}
              color="primary-green"
            />
          </div>
        </section>

        {/* Ações Rápidas (se for jogadora) */}
        {user?.role === 'jogadora_amadora' || user?.role === 'jogadora_profissional' ? (
          <section className="mt-12 bg-gradient-to-r from-primary-pink to-primary-purple rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pronta para o próximo desafio?
            </h2>
            <p className="text-gray-200 mb-6">
              Veja as peneiras disponíveis e se inscreva para mostrar seu talento!
            </p>
            <a
              href="/events"
              className="inline-block bg-white text-primary-pink px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Ver Peneiras Disponíveis
            </a>
          </section>
        ) : null}

        {/* Ações Rápidas (se for olheiro) */}
        {user?.role === 'olheiro' ? (
          <section className="mt-12 bg-gradient-to-r from-primary-purple to-primary-pink rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Encontre seu próximo talento
            </h2>
            <p className="text-gray-200 mb-6">
              Use nossa busca avançada para descobrir jogadoras promissoras
            </p>
            <a
              href="/players"
              className="inline-block bg-white text-primary-purple px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Buscar Jogadoras
            </a>
          </section>
        ) : null}
      </div>
    </main>
  );
};

export default Dashboard;

