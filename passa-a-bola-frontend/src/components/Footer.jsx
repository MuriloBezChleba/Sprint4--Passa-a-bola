import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

/**
 * Componente de rodapé da aplicação
 * Exibe informações dos desenvolvedores e links sociais
 * HTML semântico usando <footer>
 */
const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-primary-pink mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre o Projeto */}
          <section className="space-y-3">
            <h3 className="text-primary-pink font-bold text-lg">Passa a Bola</h3>
            <p className="text-gray-400 text-sm">
              Plataforma completa para conectar jogadoras de futebol feminino, 
              olheiros, clubes e fãs, promovendo visibilidade e oportunidades.
            </p>
          </section>

          {/* Links Rápidos */}
          <section className="space-y-3">
            <h3 className="text-primary-pink font-bold text-lg">Links Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <a href="/dashboard" className="text-gray-400 hover:text-primary-pink transition text-sm">
                Dashboard
              </a>
              <a href="/players" className="text-gray-400 hover:text-primary-pink transition text-sm">
                Buscar Jogadoras
              </a>
              <a href="/events" className="text-gray-400 hover:text-primary-pink transition text-sm">
                Eventos e Peneiras
              </a>
              <a href="/tournaments" className="text-gray-400 hover:text-primary-pink transition text-sm">
                Torneios
              </a>
            </nav>
          </section>

          {/* Desenvolvedores */}
          <section className="space-y-3">
            <h3 className="text-primary-pink font-bold text-lg">Desenvolvido por</h3>
            <div className="text-gray-400 text-sm space-y-1">
              <p><strong>Calçada LTDA</strong></p>
              <p>Caio M. Lins - RM 559805</p>
              <p>Murilo B. Gonzalez - RM 566199</p>
              <p>Bernardo G. Lozório - RM 564943</p>
            </div>
            
            {/* Redes Sociais */}
            <div className="flex space-x-4 pt-2">
              <a
                href="https://github.com/MuriloBezChleba/Sprint4--Passa-a-bola"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-pink transition text-xl"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-pink transition text-xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-pink transition text-xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-pink transition text-xl"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
            </div>
          </section>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Passa a Bola. Desenvolvido com 💚 por Calçada LTDA | FIAP - Sprint 4
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

