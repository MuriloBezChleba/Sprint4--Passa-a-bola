import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

/**
 * Componente Modal Reutilizável (REQUISITO OBRIGATÓRIO)
 * Modal com overlay escuro e opção de fechar
 * 
 * @param {boolean} isOpen - Controla se o modal está aberto
 * @param {function} onClose - Função chamada ao fechar o modal
 * @param {string} title - Título do modal
 * @param {ReactNode} children - Conteúdo do modal
 */
const Modal = ({ isOpen, onClose, title, children }) => {
  // Prevenir scroll do body quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fechar modal ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay escuro (REQUISITO OBRIGATÓRIO) */}
      <div className="absolute inset-0 bg-black bg-opacity-75"></div>
      
      {/* Conteúdo do Modal */}
      <div
        className="relative bg-semi-dark-bg rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition text-2xl"
            aria-label="Fechar modal"
          >
            <FaTimes />
          </button>
        </header>
        
        {/* Conteúdo */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

