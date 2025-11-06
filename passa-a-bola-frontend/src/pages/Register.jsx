import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiPost } from '../config/api';
import { FaUser, FaEnvelope, FaLock, FaUserTag } from 'react-icons/fa';

/**
 * Página de Registro
 * Formulário de cadastro com validação
 * Eventos: onSubmit, onChange, onClick (REQUISITO OBRIGATÓRIO)
 */
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    role: 'jogadora_amadora',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Manipula mudanças nos inputs (onChange - REQUISITO)
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  /**
   * Validação do formulário
   * @returns {boolean} - Retorna true se válido
   */
  const validateForm = () => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setError('Por favor, preencha todos os campos');
      return false;
    }

    if (formData.senha.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres');
      return false;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email inválido');
      return false;
    }

    return true;
  };

  /**
   * Manipula submissão do formulário (onSubmit - REQUISITO)
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Fazer registro via API
      await apiPost('/auth/register', {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        role: formData.role,
      });

      // Redirecionar para login
      navigate('/login', {
        state: { message: 'Cadastro realizado com sucesso! Faça login para continuar.' },
      });
    } catch (err) {
      setError(err.message || 'Erro ao fazer cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-dark-bg py-12 px-4">
      <div className="max-w-md w-full">
        {/* Card de Registro */}
        <article className="bg-semi-dark-bg rounded-lg shadow-2xl p-8">
          {/* Header */}
          <header className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-pink to-primary-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUser className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Cadastrar</h1>
            <p className="text-gray-400">Crie sua conta no Passa a Bola</p>
          </header>

          {/* Mensagem de Erro */}
          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
              <label htmlFor="nome" className="block text-gray-400 mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  className="w-full bg-dark-bg border border-gray-700 rounded-lg px-10 py-3 text-white focus:border-primary-pink focus:outline-none"
                  required
                />
              </div>
            </div>

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

            {/* Role (Select - onChange) */}
            <div>
              <label htmlFor="role" className="block text-gray-400 mb-2">
                Tipo de Usuário
              </label>
              <div className="relative">
                <FaUserTag className="absolute left-3 top-3 text-gray-500" />
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-dark-bg border border-gray-700 rounded-lg px-10 py-3 text-white focus:border-primary-pink focus:outline-none appearance-none"
                >
                  <option value="jogadora_amadora">Jogadora Amadora</option>
                  <option value="jogadora_profissional">Jogadora Profissional</option>
                  <option value="olheiro">Olheiro / Scout</option>
                  <option value="torcedor">Torcedor / Fã</option>
                </select>
              </div>
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="senha" className="block text-gray-400 mb-2">
                Senha
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full bg-dark-bg border border-gray-700 rounded-lg px-10 py-3 text-white focus:border-primary-pink focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Confirmar Senha */}
            <div>
              <label htmlFor="confirmarSenha" className="block text-gray-400 mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  placeholder="Repita sua senha"
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
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          {/* Link para Login */}
          <footer className="mt-6 text-center">
            <p className="text-gray-400">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary-pink hover:text-primary-purple transition">
                Entrar
              </Link>
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
};

export default Register;

