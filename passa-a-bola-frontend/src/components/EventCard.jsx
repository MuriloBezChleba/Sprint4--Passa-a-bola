import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

/**
 * Componente de Card de Evento
 * Exibe informações sobre eventos, peneiras e festivais
 * 
 * @param {object} event - Dados do evento
 */
const EventCard = ({ event }) => {
  // Formatar data para exibição
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  // Cores baseadas no tipo de evento
  const getTypeColor = (tipo) => {
    const colors = {
      'Peneira': 'bg-primary-pink',
      'Torneio': 'bg-primary-purple',
      'Festival': 'bg-primary-green',
      'Clínica': 'bg-yellow-500',
    };
    return colors[tipo] || 'bg-gray-500';
  };

  return (
    <article className="bg-semi-dark-bg rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
      {/* Badge de Tipo */}
      <div className={`${getTypeColor(event.tipo)} text-white text-xs font-bold px-3 py-1 inline-block`}>
        {event.tipo}
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <h3 className="text-white font-bold text-xl mb-2">{event.titulo}</h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {event.descricao}
        </p>

        {/* Informações */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <FaCalendar className="text-primary-pink" />
            <span>{formatDate(event.data)}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <FaClock className="text-primary-purple" />
            <span>{event.horario}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <FaMapMarkerAlt className="text-primary-green" />
            <span className="line-clamp-1">{event.local}</span>
          </div>

          {event.vagas && (
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <FaUsers className="text-yellow-500" />
              <span>
                {event.vagas_disponiveis} vagas disponíveis de {event.vagas}
              </span>
            </div>
          )}
        </div>

        {/* Status de Inscrições */}
        {event.inscricoes_abertas ? (
          <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            Inscrições Abertas
          </span>
        ) : (
          <span className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            Inscrições Encerradas
          </span>
        )}

        {/* Botão Ver Detalhes */}
        <Link
          to={`/events/${event.id}`}
          className="block w-full bg-gradient-to-r from-primary-pink to-primary-purple text-white text-center py-2 rounded-lg hover:opacity-90 transition"
        >
          Ver Detalhes
        </Link>
      </div>
    </article>
  );
};

export default EventCard;

