import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaBars, FaTimes, FaSignOutAlt, FaEdit } from 'react-icons/fa';

/**
 * Componente de barra de navegação
 * Exibe menu responsivo com links baseados no role do usuário
 * Inclui dropdown de perfil (requisito: drop-down obrigatório)
 */
const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /**
   * Função para lidar com logout
   * Remove token e redireciona para home
   */
  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  /**
   * Toggle do menu mobile (hamburguer)
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Toggle do dropdown de perfil
   */
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-dark-bg border-b border-primary-pink sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-pink to-primary-purple rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">⚽</span>
            </div>
            <span className="text-white font-bold text-xl">Passa a Bola</span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-gray-300 hover:text-primary-pink transition">
              Dashboard
            </Link>
            <Link to="/players" className="text-gray-300 hover:text-primary-pink transition">
              Jogadoras
            </Link>
            <Link to="/events" className="text-gray-300 hover:text-primary-pink transition">
              Eventos
            </Link>
            <Link to="/tournaments" className="text-gray-300 hover:text-primary-pink transition">
              Torneios
            </Link>
            <Link to="/feed" className="text-gray-300 hover:text-primary-pink transition">
              Feed
            </Link>
            <Link to="/noticias" className="text-gray-300 hover:text-primary-pink transition">
              Notícias
            </Link>

            {/* Dropdown de Perfil (OBRIGATÓRIO) */}
            {isAuthenticated() ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 text-white hover:text-primary-pink transition"
                  aria-label="Menu de usuário"
                >
                  <FaUser className="text-xl" />
                  <span className="hidden lg:block">{user?.nome || 'Usuário'}</span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-semi-dark-bg rounded-lg shadow-lg py-2 animate-fadeIn">
                    <Link
                      to="/perfil"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-dark-bg hover:text-primary-pink transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaUser />
                      <span>Ver Meu Perfil</span>
                    </Link>
                    <Link
                      to="/perfil/editar"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-dark-bg hover:text-primary-pink transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaEdit />
                      <span>Editar Perfil</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:bg-dark-bg hover:text-red-500 transition"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-primary-pink transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-primary-pink to-primary-purple px-4 py-2 rounded-lg text-white hover:opacity-90 transition"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>

          {/* Botão Menu Mobile (Hamburguer) */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white text-2xl"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fadeIn">
            <Link
              to="/dashboard"
              className="block py-2 text-gray-300 hover:text-primary-pink transition"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/players"
              className="block py-2 text-gray-300 hover:text-primary-pink transition"
              onClick={toggleMenu}
            >
              Jogadoras
            </Link>
            <Link
              to="/events"
              className="block py-2 text-gray-300 hover:text-primary-pink transition"
              onClick={toggleMenu}
            >
              Eventos
            </Link>
            <Link
              to="/tournaments"
              className="block py-2 text-gray-300 hover:text-primary-pink transition"
              onClick={toggleMenu}
            >
              Torneios
            </Link>
            <Link
              to="/feed"
              className="block py-2 text-gray-300 hover:text-primary-pink transition"
              onClick={toggleMenu}
            >
              Feed
            </Link>
            <Link
              to="/noticias"
              className="block py-2 text-gray-300 hover:text-primary-pink transition"
              onClick={toggleMenu}
            >
              Notícias
            </Link>

            {isAuthenticated() ? (
              <>
                <Link
                  to="/perfil"
                  className="block py-2 text-gray-300 hover:text-primary-pink transition"
                  onClick={toggleMenu}
                >
                  Meu Perfil
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left py-2 text-red-500 hover:text-red-400 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-gray-300 hover:text-primary-pink transition"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-primary-pink hover:text-primary-purple transition"
                  onClick={toggleMenu}
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

