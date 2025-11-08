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

