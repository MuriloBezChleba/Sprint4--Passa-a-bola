import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaFutbol, FaUser } from 'react-icons/fa';

/**
 * Componente de Card de Jogadora
 * Exibe informações resumidas de uma jogadora
 * 
 * @param {object} player - Dados da jogadora
 */
const PlayerCard = ({ player }) => {
  return (
    <article className="bg-semi-dark-bg rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
      {/* Imagem */}
      <div className="relative h-48 bg-gradient-to-r from-primary-pink to-primary-purple">
        {player.foto ? (
          <img
            src={player.foto}
            alt={`Foto de ${player.nome}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaUser className="text-white text-6xl opacity-50" />
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <h3 className="text-white font-bold text-xl mb-2">{player.nome}</h3>
        
        <div className="flex items-center space-x-4 text-gray-400 text-sm mb-3">
          <div className="flex items-center space-x-1">
            <FaFutbol className="text-primary-pink" />
            <span>{player.posicao}</span>
          </div>
          {player.nacionalidade && (
            <div className="flex items-center space-x-1">
              <FaMapMarkerAlt className="text-primary-green" />
              <span>{player.nacionalidade}</span>
            </div>
          )}
        </div>

        {player.clube_atual && (
          <p className="text-gray-400 text-sm mb-3">
            <strong className="text-white">Clube:</strong> {player.clube_atual}
          </p>
        )}

        {player.bio && (
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {player.bio}
          </p>
        )}

        {/* Estatísticas */}
        {player.gols_carreira !== undefined && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-pink">{player.gols_carreira}</p>
              <p className="text-xs text-gray-500">Gols</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-purple">{player.assistencias}</p>
              <p className="text-xs text-gray-500">Assists</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-green">{player.partidas_jogadas}</p>
              <p className="text-xs text-gray-500">Jogos</p>
            </div>
          </div>
        )}

        {/* Botão Ver Perfil */}
        <Link
          to={`/players/${player.id}`}
          className="block w-full bg-gradient-to-r from-primary-pink to-primary-purple text-white text-center py-2 rounded-lg hover:opacity-90 transition"
        >
          Ver Perfil Completo
        </Link>
      </div>
    </article>
  );
};

export default PlayerCard;

