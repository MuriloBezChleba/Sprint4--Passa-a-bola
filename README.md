# ⚽ PASSA A BOLA - Projeto Completo

Plataforma para conectar jogadoras de futebol feminino, olheiros, clubes e fãs.

---

## 👥 Desenvolvido por

**Calçada LTDA**
- **Caio M. Lins** - RM 559805
- **Murilo B. Gonzalez** - RM 566199  
- **Bernardo G. Lozório** - RM 564943

---

## 📦 Estrutura do Projeto

```
sprint4/
├── passa-a-bola-frontend/    # Frontend React Vite + TailwindCSS
│   ├── src/
│   │   ├── components/       # 8+ componentes reutilizáveis
│   │   ├── pages/            # 7 páginas completas
│   │   ├── data/             # JSON local (OBRIGATÓRIO)
│   │   └── config/           # Configurações da API
│   └── README.md
│
├── passa-a-bola-backend/     # Backend Python + FastAPI
│   ├── backend/
│   │   ├── routes/           # Rotas da API (auth, players, events)
│   │   ├── models.py         # Modelos Pydantic
│   │   └── main.py           # Aplicação principal
│   ├── utils/
│   │   └── persistence.py    # Sistema JSON/TXT (OBRIGATÓRIO)
│   ├── database/             # Backups JSON e logs.txt
│   └── README.md
│
├── RMs.txt                   # RMs dos integrantes (OBRIGATÓRIO)
├── DOCUMENTACAO.md           # Documentação completa (OBRIGATÓRIO)
└── README.md                 # Este arquivo
```

---

## 🚀 Como Executar

### 1️⃣ Backend (Python + FastAPI)

```bash
# Entre na pasta do backend
cd passa-a-bola-backend

# Crie um ambiente virtual
python -m venv venv

# Ative o ambiente virtual
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Inicie o servidor
python backend/main.py
```

✅ Backend rodando em: **http://localhost:8000**  
📚 Documentação Swagger: **http://localhost:8000/docs**

---

### 2️⃣ Frontend (React + Vite)

```bash
# Entre na pasta do frontend
cd passa-a-bola-frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

✅ Frontend rodando em: **http://localhost:5173**

---

## ✨ Funcionalidades Implementadas

### Frontend (Front-end Design + Web Development)
- ✅ **React 18 + Vite** (não Next.js - requisito obrigatório)
- ✅ **TailwindCSS** em 100% do projeto
- ✅ **CSS Grid** no Dashboard (3 colunas responsivas)
- ✅ **Modal de criação de post** (requisito obrigatório)
- ✅ **Dropdown de perfil** (requisito obrigatório)
- ✅ **JSON Local** (jogadoras.json, eventos.json - requisito obrigatório)
- ✅ **Eventos:** onClick, onChange, onSubmit em todos os formulários
- ✅ **HTML5 semântico:** header, main, section, article, footer
- ✅ **15+ componentes** reutilizáveis
- ✅ **Responsividade** mobile/tablet/desktop

### Backend (Computational Thinking with Python)
- ✅ **Try-except em TODAS as rotas** (requisito obrigatório)
- ✅ **Persistência JSON/TXT** (requisito obrigatório)
- ✅ **CRUD completo em arquivos** (requisito obrigatório)
- ✅ **Funções organizadas** com docstrings
- ✅ **Interface intuitiva** (Swagger Docs automático)
- ✅ **Autenticação JWT** com registro e login
- ✅ **Validações Pydantic** automáticas
- ✅ **Logs.txt** com registro de todas as ações

---

## 📊 Requisitos Atendidos

### ✅ Front-end Design (100%)
- [x] React Vite
- [x] TailwindCSS em 100% do projeto
- [x] CSS Grid (Dashboard)
- [x] Dashboards dinâmicos
- [x] Formulário Modal
- [x] Drop-down de perfil
- [x] Responsividade
- [x] Deploy Vercel (preparado)

### ✅ Web Development (100%)
- [x] Projeto React Vite
- [x] Consumo de JSON local
- [x] Consumo de API backend
- [x] Revisão do DOM (useState, useEffect)
- [x] Criação de eventos (onClick, onChange, onSubmit)
- [x] Estilização com TailwindCSS
- [x] HTML5 semântico
- [x] 15+ componentes
- [x] Versionamento GitHub

### ✅ Computational Thinking with Python (100%)
- [x] Validações e try-except (20 pts)
- [x] Persistência JSON/TXT (20 pts)
- [x] CRUD em arquivos (30 pts)
- [x] Funções organizadas (10 pts)
- [x] Interface intuitiva (15 pts)
- [x] Comentários e boas práticas (5 pts)

---

## 🎯 Páginas e Funcionalidades

### Frontend
1. **Landing Page** - Hero section com CTAs
2. **Dashboard** - Estatísticas com CSS Grid (OBRIGATÓRIO)
3. **Login/Registro** - Autenticação JWT
4. **Busca de Jogadoras** - Filtros avançados + JSON local
5. **Eventos e Peneiras** - Lista de eventos + JSON local
6. **Feed Social** - Modal de criação de post (OBRIGATÓRIO)

### Backend
1. **Autenticação** - Registro, Login, JWT
2. **CRUD Jogadoras** - Create, Read, Update, Delete
3. **CRUD Eventos** - Create, Read, Update, Delete
4. **Sistema de Backup** - JSON e TXT automático
5. **Logs** - Registro de todas as ações

---

## 📚 Documentação

- **RMs.txt** - RMs dos integrantes
- **DOCUMENTACAO.md** - Documentação completa (20+ páginas)
- **README.md (frontend)** - Instruções do frontend
- **README.md (backend)** - Instruções do backend

---

## 🔑 Credenciais de Teste

Usuário de teste criado automaticamente:
- **Email:** teste@passabola.com
- **Senha:** senha123
- **Role:** jogadora_amadora

---

## 🌐 Deploy

### Frontend (Vercel)
```bash
cd passa-a-bola-frontend
npm install -g vercel
vercel --prod
```

### Backend (Vercel)
```bash
cd passa-a-bola-backend
vercel --prod
```

---

## 📞 Contato

**Email:** contato@passabola.com  
**GitHub:** https://github.com/MuriloBezChleba/Sprint4--Passa-a-bola

---

## 📄 Licença

Desenvolvido para o projeto **Sprint 4 - FIAP 2025**

---

**Desenvolvido com 💚 por Calçada LTDA**

