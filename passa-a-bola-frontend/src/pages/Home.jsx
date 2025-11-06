import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaMapMarkedAlt, FaNewspaper, FaHeart, FaTrophy, FaEye } from 'react-icons/fa';

/**
 * Página Landing Page (Home)
 * Hero section com CTA e cards de funcionalidades
 * HTML semântico com <main>, <section>, <article>
 */
const Home = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[600px] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1920&q=80)',
        }}
      >
        <div className="max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Passa a Bola
            <br />
            <span className="text-primary-pink">Conectando Talentos</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            A plataforma completa para conectar jogadoras de futebol feminino, olheiros, clubes e fãs. 
            Mostre seu talento, descubra oportunidades e fortaleça o futebol feminino!
          </p>
          <Link
            to="/register"
            className="inline-block bg-gradient-to-r from-primary-pink to-primary-purple px-8 py-4 rounded-lg text-white text-lg font-bold hover:opacity-90 transition transform hover:scale-105"
          >
            Comece a Jogar Agora ⚽
          </Link>
        </div>
      </section>

      {/* Seção "Para Quem?" */}
      <section className="py-16 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-4">
            Para Quem é o <span className="text-primary-pink">Passa a Bola?</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Nossa plataforma foi desenvolvida para todos que fazem parte do ecossistema do futebol feminino
          </p>

          {/* Grid de Cards - CSS GRID (REQUISITO OBRIGATÓRIO) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Atletas */}
            <article className="bg-semi-dark-bg rounded-lg p-8 text-center hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-6xl text-primary-pink mb-4 flex justify-center">
                <FaUsers />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Atletas</h3>
              <p className="text-gray-400 mb-6">
                Crie seu perfil, mostre suas habilidades, compartilhe vídeos e seja descoberta por olheiros e clubes.
              </p>
              <ul className="text-left text-gray-400 space-y-2">
                <li>✓ Perfil profissional completo</li>
                <li>✓ Galeria de fotos e vídeos</li>
                <li>✓ Estatísticas detalhadas</li>
                <li>✓ Inscrição em peneiras</li>
              </ul>
            </article>

            {/* Card 2: Olheiros & Clubes */}
            <article className="bg-semi-dark-bg rounded-lg p-8 text-center hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-6xl text-primary-purple mb-4 flex justify-center">
                <FaEye />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Olheiros & Clubes</h3>
              <p className="text-gray-400 mb-6">
                Descubra novos talentos, organize peneiras, acompanhe jogadoras promissoras e construa seu time dos sonhos.
              </p>
              <ul className="text-left text-gray-400 space-y-2">
                <li>✓ Busca avançada de jogadoras</li>
                <li>✓ Filtros por posição e habilidade</li>
                <li>✓ Organização de peneiras</li>
                <li>✓ Sistema de avaliações</li>
              </ul>
            </article>

            {/* Card 3: Fãs & Comunidade */}
            <article className="bg-semi-dark-bg rounded-lg p-8 text-center hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-6xl text-primary-green mb-4 flex justify-center">
                <FaHeart />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Fãs & Comunidade</h3>
              <p className="text-gray-400 mb-6">
                Acompanhe suas jogadoras favoritas, participe de eventos, apoie projetos sociais e fortaleça o movimento.
              </p>
              <ul className="text-left text-gray-400 space-y-2">
                <li>✓ Feed social interativo</li>
                <li>✓ Notícias atualizadas</li>
                <li>✓ Eventos e festivais</li>
                <li>✓ Projetos sociais</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Seção de Funcionalidades */}
      <section className="py-16 bg-semi-dark-bg">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Funcionalidades <span className="text-primary-pink">Principais</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Funcionalidade 1 */}
            <article className="bg-dark-bg rounded-lg p-6 hover:shadow-xl transition">
              <FaMapMarkedAlt className="text-5xl text-primary-pink mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Mapa Interativo</h3>
              <p className="text-gray-400">
                Encontre peneiras, torneios e eventos perto de você com nosso mapa interativo.
              </p>
            </article>

            {/* Funcionalidade 2 */}
            <article className="bg-dark-bg rounded-lg p-6 hover:shadow-xl transition">
              <FaNewspaper className="text-5xl text-primary-purple mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Notícias</h3>
              <p className="text-gray-400">
                Fique por dentro das últimas notícias do futebol feminino nacional e internacional.
              </p>
            </article>

            {/* Funcionalidade 3 */}
            <article className="bg-dark-bg rounded-lg p-6 hover:shadow-xl transition">
              <FaTrophy className="text-5xl text-primary-green mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Torneios</h3>
              <p className="text-gray-400">
                Participe de torneios, acompanhe chaveamentos e celebre as conquistas.
              </p>
            </article>
          </div>

          {/* CTA Final */}
          <div className="text-center mt-12">
            <Link
              to="/register"
              className="inline-block bg-gradient-to-r from-primary-pink to-primary-purple px-8 py-4 rounded-lg text-white text-lg font-bold hover:opacity-90 transition"
            >
              Cadastre-se Gratuitamente
            </Link>
          </div>
        </div>
      </section>

      {/* Seção de Estatísticas */}
      <section className="py-16 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-primary-pink mb-2">500+</p>
              <p className="text-gray-400">Jogadoras Cadastradas</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary-purple mb-2">150+</p>
              <p className="text-gray-400">Eventos Realizados</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary-green mb-2">50+</p>
              <p className="text-gray-400">Clubes Parceiros</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

