import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { FaFilter, FaSearch } from 'react-icons/fa';

// Importar dados JSON locais (REQUISITO OBRIGATÓRIO)
import eventosLocal from '../data/eventos.json';

/**
 * Página de Eventos e Peneiras
 * Consome dados do JSON local (REQUISITO OBRIGATÓRIO)
 */
const Events = () => {
  const [eventos, setEventos] = useState([]);
  const [eventosFiltrados, setEventosFiltrados] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroBusca, setFiltroBusca] = useState('');
  const [loading, setLoading] = useState(true);

  /**
   * Carrega eventos do JSON local (REQUISITO OBRIGATÓRIO)
   */
  useEffect(() => {
    try {
      setEventos(eventosLocal);
      setEventosFiltrados(eventosLocal);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      setLoading(false);
    }
  }, []);

  /**
   * Aplica filtros (onClick - REQUISITO)
   */
  const aplicarFiltros = () => {
    let resultado = [...eventos];

    if (filtroBusca) {
      resultado = resultado.filter((e) =>
        e.titulo.toLowerCase().includes(filtroBusca.toLowerCase()) ||
        e.local.toLowerCase().includes(filtroBusca.toLowerCase())
      );
    }

    if (filtroTipo) {
      resultado = resultado.filter((e) => e.tipo === filtroTipo);
    }

    setEventosFiltrados(resultado);
  };

  /**
   * Limpar filtros
   */
  const limparFiltros = () => {
    setFiltroBusca('');
    setFiltroTipo('');
    setEventosFiltrados(eventos);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Carregando eventos...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Eventos e <span className="text-primary-pink">Peneiras</span>
          </h1>
          <p className="text-gray-400">
            Encontre peneiras, torneios e eventos de futebol feminino perto de você
          </p>
        </header>

        {/* Filtros */}
        <section className="bg-semi-dark-bg rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <FaFilter className="text-primary-pink text-xl" />
            <h2 className="text-xl font-bold text-white">Filtros</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Busca */}
            <div>
              <label htmlFor="busca" className="block text-gray-400 text-sm mb-2">
                Buscar Evento
              </label>
              <input
                type="text"
                id="busca"
                value={filtroBusca}
                onChange={(e) => setFiltroBusca(e.target.value)}
                placeholder="Nome do evento ou local"
                className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary-pink focus:outline-none"
              />
            </div>

            {/* Tipo */}
            <div>
              <label htmlFor="tipo" className="block text-gray-400 text-sm mb-2">
                Tipo de Evento
              </label>
              <select
                id="tipo"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary-pink focus:outline-none"
              >
                <option value="">Todos os tipos</option>
                <option value="Peneira">Peneira</option>
                <option value="Torneio">Torneio</option>
                <option value="Festival">Festival</option>
                <option value="Clínica">Clínica</option>
              </select>
            </div>
          </div>

          {/* Botões */}
          <div className="flex space-x-4">
            <button
              onClick={aplicarFiltros}
              className="bg-gradient-to-r from-primary-pink to-primary-purple text-white px-6 py-2 rounded-lg hover:opacity-90 transition flex items-center space-x-2"
            >
              <FaSearch />
              <span>Buscar</span>
            </button>
            <button
              onClick={limparFiltros}
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Limpar Filtros
            </button>
          </div>
        </section>

        {/* Resultados */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">
            {eventosFiltrados.length} evento(s) encontrado(s)
          </h2>

          {eventosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventosFiltrados.map((evento) => (
                <EventCard key={evento.id} event={evento} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                Nenhum evento encontrado.
              </p>
              <button
                onClick={limparFiltros}
                className="mt-4 text-primary-pink hover:text-primary-purple transition"
              >
                Ver todos os eventos
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Events;

