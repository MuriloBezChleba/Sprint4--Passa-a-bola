import React, { useState, useEffect } from 'react';
import PlayerCard from '../components/PlayerCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

// Importar dados JSON locais (REQUISITO OBRIGATÓRIO)
import jogadorasLocal from '../data/jogadoras.json';

/**
 * Página de Busca de Jogadoras
 * Consome dados do JSON local (REQUISITO OBRIGATÓRIO)
 * Filtros com onChange, busca com onClick
 */
const Players = () => {
  const [jogadoras, setJogadoras] = useState([]);
  const [jogadorasFiltradas, setJogadorasFiltradas] = useState([]);
  const [filtros, setFiltros] = useState({
    busca: '',
    posicao: '',
    nacionalidade: '',
    status: '',
  });
  const [loading, setLoading] = useState(true);

  /**
   * Carrega jogadoras do JSON local (REQUISITO OBRIGATÓRIO)
   */
  useEffect(() => {
    try {
      // Usar dados do JSON local
      setJogadoras(jogadorasLocal);
      setJogadorasFiltradas(jogadorasLocal);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar jogadoras:', error);
      setLoading(false);
    }
  }, []);

  /**
   * Manipula mudanças nos filtros (onChange - REQUISITO)
   */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value,
    });
  };

  /**
   * Aplica filtros (onClick - REQUISITO)
   * Revisão do DOM: renderização condicional com filter()
   */
  const aplicarFiltros = () => {
    let resultado = [...jogadoras];

    // Filtro de busca por nome
    if (filtros.busca) {
      resultado = resultado.filter((j) =>
        j.nome.toLowerCase().includes(filtros.busca.toLowerCase())
      );
    }

    // Filtro de posição
    if (filtros.posicao) {
      resultado = resultado.filter((j) =>
        j.posicao.toLowerCase().includes(filtros.posicao.toLowerCase())
      );
    }

    // Filtro de nacionalidade
    if (filtros.nacionalidade) {
      resultado = resultado.filter((j) =>
        j.nacionalidade.toLowerCase().includes(filtros.nacionalidade.toLowerCase())
      );
    }

    // Filtro de status
    if (filtros.status) {
      resultado = resultado.filter((j) => j.status === filtros.status);
    }

    setJogadorasFiltradas(resultado);
  };

  /**
   * Limpar filtros (onClick - REQUISITO)
   */
  const limparFiltros = () => {
    setFiltros({
      busca: '',
      posicao: '',
      nacionalidade: '',
      status: '',
    });
    setJogadorasFiltradas(jogadoras);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Carregando jogadoras...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Buscar <span className="text-primary-pink">Jogadoras</span>
          </h1>
          <p className="text-gray-400">
            Encontre talentos do futebol feminino usando nossos filtros avançados
          </p>
        </header>

        {/* Filtros */}
        <section className="bg-semi-dark-bg rounded-lg p-6 mb-8" aria-label="Filtros de busca">
          <div className="flex items-center space-x-2 mb-4">
            <FaFilter className="text-primary-pink text-xl" />
            <h2 className="text-xl font-bold text-white">Filtros</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Busca por nome */}
            <div>
              <label htmlFor="busca" className="block text-gray-400 text-sm mb-2">
                Nome da Jogadora
              </label>
              <input
                type="text"
                id="busca"
                name="busca"
                value={filtros.busca}
                onChange={handleFilterChange}
                placeholder="Ex: Marta"
                className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary-pink focus:outline-none"
              />
            </div>

            {/* Filtro de posição (Select com onChange) */}
            <div>
              <label htmlFor="posicao" className="block text-gray-400 text-sm mb-2">
                Posição
              </label>
              <select
                id="posicao"
                name="posicao"
                value={filtros.posicao}
                onChange={handleFilterChange}
                className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary-pink focus:outline-none"
              >
                <option value="">Todas as posições</option>
                <option value="Goleira">Goleira</option>
                <option value="Zagueira">Zagueira</option>
                <option value="Lateral">Lateral Esquerda</option>
                <option value="Lateral">Lateral Direita</option>
                <option value="Meio-campista">Meio-campista</option>
                <option value="Atacante">Atacante</option>
              </select>
            </div>

            {/* Filtro de nacionalidade */}
            <div>
              <label htmlFor="nacionalidade" className="block text-gray-400 text-sm mb-2">
                Nacionalidade
              </label>
              <input
                type="text"
                id="nacionalidade"
                name="nacionalidade"
                value={filtros.nacionalidade}
                onChange={handleFilterChange}
                placeholder="Ex: Brasil"
                className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary-pink focus:outline-none"
              />
            </div>

            {/* Filtro de status */}
            <div>
              <label htmlFor="status" className="block text-gray-400 text-sm mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={filtros.status}
                onChange={handleFilterChange}
                className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary-pink focus:outline-none"
              >
                <option value="">Todos os status</option>
                <option value="Ativo">Ativo</option>
                <option value="Aposentada">Aposentada</option>
              </select>
            </div>
          </div>

          {/* Botões de Ação (onClick - REQUISITO) */}
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
        <section aria-label="Resultados da busca">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {jogadorasFiltradas.length} jogadora(s) encontrada(s)
            </h2>
          </div>

          {/* Grid de Jogadoras (REQUISITO: CSS Grid) */}
          {jogadorasFiltradas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jogadorasFiltradas.map((jogadora) => (
                <PlayerCard key={jogadora.id} player={jogadora} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                Nenhuma jogadora encontrada com os filtros selecionados.
              </p>
              <button
                onClick={limparFiltros}
                className="mt-4 text-primary-pink hover:text-primary-purple transition"
              >
                Limpar filtros e ver todas
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Players;

