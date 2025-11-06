import React from 'react';

/**
 * Componente de Card de Estatística
 * Exibe uma métrica numérica com ícone e descrição
 * Usado no Dashboard dinâmico (requisito obrigatório)
 * 
 * @param {string} title - Título da estatística
 * @param {number} value - Valor numérico
 * @param {ReactNode} icon - Ícone React Icon
 * @param {string} color - Cor do gradiente (primary-pink, primary-purple, primary-green)
 */
const StatCard = ({ title, value, icon, color = 'primary-pink' }) => {
  const gradientColors = {
    'primary-pink': 'from-primary-pink to-pink-600',
    'primary-purple': 'from-primary-purple to-purple-600',
    'primary-green': 'from-primary-green to-green-600',
  };

  return (
    <article className="bg-semi-dark-bg rounded-lg p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm uppercase tracking-wider">{title}</p>
          <p className="text-4xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className={`text-5xl bg-gradient-to-r ${gradientColors[color]} p-4 rounded-full text-white`}>
          {icon}
        </div>
      </div>
    </article>
  );
};

export default StatCard;

