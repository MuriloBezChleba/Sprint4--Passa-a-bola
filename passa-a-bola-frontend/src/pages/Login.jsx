import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiPost } from '../config/api';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

/**
 * Página de Login
 * Formulário de autenticação com validação
 * Eventos: onSubmit, onChange (REQUISITO OBRIGATÓRIO)
 */
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Manipula mudanças nos inputs (onChange)
   * REQUISITO: Criação de eventos
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Limpar erro ao digitar
    if (error) setError('');
  };

  /**
   * Manipula submissão do formulário (onSubmit)
   * REQUISITO: Criação de eventos
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validação básica
      if (!formData.email || !formData.password) {
        setError('Por favor, preencha todos os campos');
        setLoading(false);
        return;
      }

      // Fazer login via API
      const formDataEncoded = new URLSearchParams();
      formDataEncoded.append('username', formData.email);
      formDataEncoded.append('password', formData.password);

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataEncoded,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erro ao fazer login');
      }

      const data = await response.json();

      // Salvar token e usuário
      login(data.access_token, {
        email: formData.email,
        role: data.role,
        nome: data.nome || 'Usuária',
      });

      // Redirecionar para dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-dark-bg py-12 px-4">
      <div className="max-w-md w-full">
        {/* Card de Login */}
        <article className="bg-semi-dark-bg rounded-lg shadow-2xl p-8">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-pink to-primary-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSignInAlt className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Entrar</h1>
            <p className="text-gray-400">Acesse sua conta no Passa a Bola</p>
          </header>

          {/* Mensagem de Erro */}
          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Formulário (onSubmit) */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-400 mb-2">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full bg-dark-bg border border-gray-700 rounded-lg px-10 py-3 text-white focus:border-primary-pink focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-gray-400 mb-2">
                Senha
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-dark-bg border border-gray-700 rounded-lg px-10 py-3 text-white focus:border-primary-pink focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Botão Submit (onClick implícito) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-pink to-primary-purple text-white py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Link para Registro */}
          <footer className="mt-6 text-center">
            <p className="text-gray-400">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-primary-pink hover:text-primary-purple transition">
                Cadastre-se
              </Link>
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
};

export default Login;

