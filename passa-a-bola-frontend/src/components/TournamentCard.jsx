import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrophy, FaCalendar, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

/**
 * Componente de Card de Torneio
 * Exibe informações sobre torneios de futebol feminino
 * 
 * @param {object} tournament - Dados do torneio
 */
const TournamentCard = ({ tournament }) => {
  // Formatar data
  const formatDate = (dateString) => {
    if (!dateString) return 'Data a definir';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <article className="bg-semi-dark-bg rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
      {/* Header com ícone */}
      <div className="bg-gradient-to-r from-primary-purple to-primary-pink p-6 text-center">
        <FaTrophy className="text-white text-5xl mx-auto mb-2" />
        <h3 className="text-white font-bold text-xl">{tournament.nome || tournament.titulo}</h3>
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        {tournament.descricao && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {tournament.descricao}
          </p>
        )}

        {/* Informações */}
        <div className="space-y-2 mb-4">
          {tournament.data_inicio && (
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <FaCalendar className="text-primary-pink" />
              <span>{formatDate(tournament.data_inicio)}</span>
            </div>
          )}
          
          {tournament.local && (
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <FaMapMarkerAlt className="text-primary-green" />
              <span className="line-clamp-1">{tournament.local}</span>
            </div>
          )}

          {tournament.equipes_registradas !== undefined && (
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <FaUsers className="text-primary-purple" />
              <span>{tournament.equipes_registradas} equipes inscritas</span>
            </div>
          )}
        </div>

        {/* Status */}
        <div className="mb-4">
          {tournament.status === 'Em andamento' && (
            <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Em Andamento
            </span>
          )}
          {tournament.status === 'Inscricoes abertas' && (
            <span className="inline-block bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Inscrições Abertas
            </span>
          )}
          {tournament.status === 'Finalizado' && (
            <span className="inline-block bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Finalizado
            </span>
          )}
        </div>

        {/* Botão Ver Detalhes */}
        <Link
          to={`/tournaments/${tournament.id}`}
          className="block w-full bg-gradient-to-r from-primary-purple to-primary-pink text-white text-center py-2 rounded-lg hover:opacity-90 transition"
        >
          Ver Chaveamento
        </Link>
      </div>
    </article>
  );
};

export default TournamentCard;

