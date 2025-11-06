import React, { useState } from 'react';
import Modal from '../components/Modal';
import { FaHeart, FaComment, FaPlus, FaImage } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

/**
 * Página de Feed Social
 * Inclui MODAL DE CRIAÇÃO DE POST (REQUISITO OBRIGATÓRIO)
 * Demonstra manipulação do DOM e eventos (onClick, onChange, onSubmit)
 */
const Feed = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      autor: 'Marta Vieira da Silva',
      foto_autor: 'https://via.placeholder.com/50',
      conteudo: 'Muito feliz com o treino de hoje! Bora continuar trabalhando forte! 💪⚽',
      imagem: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600',
      likes: 234,
      comentarios: 45,
      data: '2025-11-05T10:30:00',
    },
    {
      id: 2,
      autor: 'Debinha',
      foto_autor: 'https://via.placeholder.com/50',
      conteudo: 'Peneira aberta em São Paulo! Não percam essa oportunidade! 🌟',
      imagem: null,
      likes: 189,
      comentarios: 32,
      data: '2025-11-05T09:15:00',
    },
  ]);

  // Estado do formulário (REQUISITO: Manipulação do DOM)
  const [novoPost, setNovoPost] = useState({
    conteudo: '',
    imagem: null,
  });

  /**
   * Abre o modal (onClick - REQUISITO)
   */
  const abrirModal = () => {
    setIsModalOpen(true);
  };

  /**
   * Fecha o modal (onClick - REQUISITO)
   */
  const fecharModal = () => {
    setIsModalOpen(false);
    setNovoPost({ conteudo: '', imagem: null });
  };

  /**
   * Manipula mudanças no textarea (onChange - REQUISITO)
   */
  const handleConteudoChange = (e) => {
    setNovoPost({
      ...novoPost,
      conteudo: e.target.value,
    });
  };

  /**
   * Manipula upload de imagem (onChange - REQUISITO)
   */
  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNovoPost({
          ...novoPost,
          imagem: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Publica novo post (onSubmit - REQUISITO)
   * Demonstra manipulação do DOM adicionando novo elemento à lista
   */
  const publicarPost = (e) => {
    e.preventDefault();

    if (!novoPost.conteudo.trim()) {
      alert('Por favor, escreva algo antes de publicar!');
      return;
    }

    const post = {
      id: posts.length + 1,
      autor: user?.nome || 'Usuária',
      foto_autor: 'https://via.placeholder.com/50',
      conteudo: novoPost.conteudo,
      imagem: novoPost.imagem,
      likes: 0,
      comentarios: 0,
      data: new Date().toISOString(),
    };

    // Adicionar post ao início da lista (Manipulação do DOM)
    setPosts([post, ...posts]);
    fecharModal();
  };

  /**
   * Dar like em um post (onClick - REQUISITO)
   * Demonstra manipulação do DOM atualizando estado
   */
  const darLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  /**
   * Formatar data para exibição
   */
  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <main className="min-h-screen bg-dark-bg py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Feed <span className="text-primary-pink">Social</span>
          </h1>
          <p className="text-gray-400">
            Compartilhe suas conquistas e interaja com a comunidade
          </p>
        </header>

        {/* Botão Criar Post (ABRE MODAL - REQUISITO OBRIGATÓRIO) */}
        <button
          onClick={abrirModal}
          className="w-full bg-gradient-to-r from-primary-pink to-primary-purple text-white py-4 rounded-lg font-bold hover:opacity-90 transition flex items-center justify-center space-x-2 mb-8"
        >
          <FaPlus />
          <span>Criar Novo Post</span>
        </button>

        {/* MODAL DE CRIAÇÃO DE POST (REQUISITO OBRIGATÓRIO) */}
        <Modal
          isOpen={isModalOpen}
          onClose={fecharModal}
          title="Criar Novo Post"
        >
          <form onSubmit={publicarPost}>
            {/* Textarea (onChange - REQUISITO) */}
            <div className="mb-4">
              <label htmlFor="conteudo" className="block text-gray-400 mb-2">
                O que você quer compartilhar?
              </label>
              <textarea
                id="conteudo"
                value={novoPost.conteudo}
                onChange={handleConteudoChange}
                placeholder="Escreva algo inspirador..."
                rows="5"
                className="w-full bg-dark-bg border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary-pink focus:outline-none resize-none"
              />
            </div>

            {/* Upload de Imagem (onChange - REQUISITO) */}
            <div className="mb-6">
              <label htmlFor="imagem" className="block text-gray-400 mb-2">
                Adicionar Imagem (opcional)
              </label>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="imagem"
                  className="bg-semi-dark-bg border border-gray-700 rounded-lg px-4 py-2 text-white cursor-pointer hover:bg-dark-bg transition flex items-center space-x-2"
                >
                  <FaImage />
                  <span>Escolher Imagem</span>
                </label>
                <input
                  type="file"
                  id="imagem"
                  accept="image/*"
                  onChange={handleImagemChange}
                  className="hidden"
                />
                {novoPost.imagem && (
                  <span className="text-primary-green text-sm">✓ Imagem selecionada</span>
                )}
              </div>
            </div>

            {/* Preview da Imagem */}
            {novoPost.imagem && (
              <div className="mb-4">
                <img
                  src={novoPost.imagem}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Botões do Modal (onClick - REQUISITO) */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={fecharModal}
                className="flex-1 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary-pink to-primary-purple text-white py-2 rounded-lg hover:opacity-90 transition"
              >
                Publicar
              </button>
            </div>
          </form>
        </Modal>

        {/* Lista de Posts */}
        <section className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="bg-semi-dark-bg rounded-lg p-6">
              {/* Cabeçalho do Post */}
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={post.foto_autor}
                  alt={post.autor}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-white font-bold">{post.autor}</h3>
                  <p className="text-gray-500 text-sm">{formatarData(post.data)}</p>
                </div>
              </div>

              {/* Conteúdo */}
              <p className="text-gray-300 mb-4">{post.conteudo}</p>

              {/* Imagem */}
              {post.imagem && (
                <img
                  src={post.imagem}
                  alt="Post"
                  className="w-full max-h-96 object-cover rounded-lg mb-4"
                />
              )}

              {/* Interações (onClick - REQUISITO) */}
              <div className="flex items-center space-x-6 pt-4 border-t border-gray-700">
                <button
                  onClick={() => darLike(post.id)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-primary-pink transition"
                >
                  <FaHeart />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-primary-purple transition">
                  <FaComment />
                  <span>{post.comentarios}</span>
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Feed;

