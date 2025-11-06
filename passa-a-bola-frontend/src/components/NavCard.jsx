import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente de Card de Navegação
 * Card clicável que redireciona para outras páginas
 * Usado no Dashboard para links rápidos
 * 
 * @param {string} title - Título do card
 * @param {string} description - Descrição breve
 * @param {string} to - Rota de destino
 * @param {ReactNode} icon - Ícone React Icon
 * @param {string} color - Cor do tema
 */
const NavCard = ({ title, description, to, icon, color = 'primary-pink' }) => {
  return (
    <Link to={to}>
      <article className="bg-semi-dark-bg rounded-lg p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 hover:border-2 hover:border-primary-pink cursor-pointer">
        <div className="flex items-start space-x-4">
          <div className={`text-3xl text-${color} p-3 bg-dark-bg rounded-lg`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NavCard;

