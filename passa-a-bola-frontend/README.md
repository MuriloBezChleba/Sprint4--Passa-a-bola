# 🎯 Passa a Bola - Frontend

Plataforma completa para conectar jogadoras de futebol feminino, olheiros, clubes e fãs.

## 👥 Desenvolvido por

**Calçada LTDA**
- Caio M. Lins - RM 559805
- Murilo B. Gonzalez - RM 566199
- Bernardo G. Lozório - RM 564943

## 🚀 Tecnologias Utilizadas

- **React 18+** com **Vite** (requisito obrigatório)
- **TailwindCSS** (100% do projeto - requisito obrigatório)
- **React Router DOM** (navegação)
- **React Icons** (ícones)
- **JWT Decode** (autenticação)

## 📋 Requisitos Atendidos

### Front-end Design
- ✅ React Vite
- ✅ TailwindCSS em 100% do projeto
- ✅ CSS Grid (Dashboard com grid responsivo)
- ✅ Dashboards dinâmicos (consumindo API)
- ✅ Formulário Modal (criação de posts)
- ✅ Drop-down (menu de perfil)
- ✅ Responsividade mobile/tablet/desktop

### Web Development
- ✅ Projeto React com Vite
- ✅ Consumo de JSON local (jogadoras.json, eventos.json)
- ✅ Consumo de API backend (múltiplos endpoints)
- ✅ Revisão do DOM (useState, useEffect, manipulação)
- ✅ Criação de eventos (onClick, onChange, onSubmit)
- ✅ Estilização com TailwindCSS
- ✅ HTML5 semântico (header, main, section, article, footer)
- ✅ 15+ componentes reutilizáveis

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/MuriloBezChleba/Sprint4--Passa-a-bola.git

# Entre na pasta do frontend
cd passa-a-bola-frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará rodando em `http://localhost:5173`

## 🏗️ Estrutura do Projeto

```
passa-a-bola-frontend/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Modal.jsx
│   │   ├── StatCard.jsx
│   │   ├── NavCard.jsx
│   │   ├── PlayerCard.jsx
│   │   ├── EventCard.jsx
│   │   └── TournamentCard.jsx
│   ├── context/         # Context API
│   │   └── AuthContext.jsx
│   ├── pages/           # Páginas da aplicação
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Players.jsx
│   │   ├── Events.jsx
│   │   └── Feed.jsx
│   ├── data/            # JSON Local (REQUISITO OBRIGATÓRIO)
│   │   ├── jogadoras.json
│   │   └── eventos.json
│   ├── config/          # Configurações
│   │   └── api.js
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Entry point
│   └── index.css        # Estilos globais
├── public/              # Assets públicos
├── index.html           # HTML base
├── tailwind.config.js   # Configuração do Tailwind
├── vite.config.js       # Configuração do Vite
└── package.json
```

## 🎨 Componentes Principais

### 1. **Navbar** (Navbar.jsx)
- Menu responsivo com hamburguer
- Dropdown de perfil (REQUISITO OBRIGATÓRIO)
- Links dinâmicos baseados no role do usuário

### 2. **Modal** (Modal.jsx)
- Modal reutilizável com overlay escuro (REQUISITO OBRIGATÓRIO)
- Usado no feed para criação de posts

### 3. **StatCard** (StatCard.jsx)
- Card de estatística para dashboard dinâmico (REQUISITO OBRIGATÓRIO)

### 4. **Dashboard** (Dashboard.jsx)
- CSS Grid responsivo (REQUISITO OBRIGATÓRIO)
- Estatísticas em tempo real
- Consome API e JSON local

### 5. **Feed** (Feed.jsx)
- Modal de criação de post (REQUISITO OBRIGATÓRIO)
- Demonstra todos os eventos: onClick, onChange, onSubmit

## 🎯 Funcionalidades

### Autenticação
- Login com JWT
- Registro de usuários
- Proteção de rotas
- Logout

### Dashboard Dinâmico
- Estatísticas em tempo real
- Cards de navegação rápida
- Personalização por role

### Busca de Jogadoras
- Filtros avançados (posição, nacionalidade, status)
- Consumo de JSON local (REQUISITO OBRIGATÓRIO)
- Grid responsivo

### Eventos e Peneiras
- Lista de eventos
- Filtros por tipo
- Consumo de JSON local (REQUISITO OBRIGATÓRIO)

### Feed Social
- Criação de posts com modal (REQUISITO OBRIGATÓRIO)
- Upload de imagens
- Sistema de likes
- Comentários

## 🎨 Paleta de Cores

```css
primary-pink: #E84F7F
primary-purple: #8A2BE2
primary-green: #4CAF50
dark-bg: #1A202C
semi-dark-bg: #2D3748
```

## 📱 Responsividade

- **Mobile:** 1 coluna
- **Tablet (md):** 2 colunas
- **Desktop (lg):** 3 colunas

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar CLI do Vercel
npm install -g vercel

# Fazer deploy
vercel --prod
```

Ou conecte o repositório diretamente no painel da Vercel.

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📄 Licença

Desenvolvido para o projeto Sprint 4 - FIAP 2025

---

**Desenvolvido com 💚 por Calçada LTDA**
