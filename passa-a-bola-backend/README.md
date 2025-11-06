# 🐍 Passa a Bola - Backend (Python + FastAPI)

Backend completo para a plataforma Passa a Bola, desenvolvido com FastAPI e sistema de persistência em JSON.

## 👥 Desenvolvido por

**Calçada LTDA**
- Caio M. Lins - RM 559805
- Murilo B. Gonzalez - RM 566199
- Bernardo G. Lozório - RM 564943

## 🚀 Tecnologias Utilizadas

- **Python 3.10+**
- **FastAPI** (framework web rápido e moderno)
- **Pydantic v2** (validação de dados)
- **JWT** (autenticação com python-jose)
- **Bcrypt** (hash de senhas com passlib)
- **Uvicorn** (servidor ASGI)

## 📋 Requisitos Atendidos

### Computational Thinking with Python
- ✅ **Validações e try-except:** Todas as rotas com tratamento de erros
- ✅ **Persistência JSON/TXT:** Sistema completo de backup em arquivos
- ✅ **CRUD em arquivos:** Create, Read, Update, Delete em JSON
- ✅ **Funções com parâmetros:** Código modular e reutilizável
- ✅ **Interface intuitiva:** Swagger Docs automático
- ✅ **Comentários e boas práticas:** Docstrings em todas as funções
- ✅ **Cadastro e Login:** Sistema completo com JWT

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/MuriloBezChleba/Sprint4--Passa-a-bola.git

# Entre na pasta do backend
cd passa-a-bola-backend

# Crie um ambiente virtual
python -m venv venv

# Ative o ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instale as dependências
pip install -r requirements.txt

# Inicie o servidor
python backend/main.py
```

O servidor estará rodando em `http://localhost:8000`

## 🏗️ Estrutura do Projeto

```
passa-a-bola-backend/
├── backend/
│   ├── routes/              # Rotas da API
│   │   ├── auth.py          # Autenticação (login, registro)
│   │   ├── players.py       # CRUD de jogadoras
│   │   └── events.py        # CRUD de eventos
│   ├── models.py            # Modelos Pydantic
│   ├── security.py          # JWT e hash de senhas
│   └── main.py              # Aplicação FastAPI
├── database/                # Arquivos JSON e logs (OBRIGATÓRIO)
│   ├── users_backup.json
│   ├── jogadoras_backup.json
│   ├── eventos_backup.json
│   └── logs.txt
├── utils/
│   └── persistence.py       # Sistema de persistência JSON/TXT
└── requirements.txt         # Dependências Python
```

## 🎯 Funcionalidades

### 1. Sistema de Persistência em JSON (REQUISITO OBRIGATÓRIO)

#### Funções Principais:
- `salvar_backup_json(collection, data)`: Salva backup em JSON
- `carregar_backup_json(collection)`: Carrega dados do JSON
- `inserir_registro_json(collection, registro)`: INSERT
- `atualizar_registro_json(collection, id, dados)`: UPDATE
- `deletar_registro_json(collection, id)`: DELETE
- `listar_registros_json(collection)`: SELECT ALL
- `registrar_log(mensagem)`: Grava logs em TXT

#### Exemplo de Uso:
```python
from utils.persistence import salvar_backup_json, registrar_log

# Salvar dados
jogadoras = [{"nome": "Marta", "posicao": "Atacante"}]
salvar_backup_json("jogadoras", jogadoras)

# Registrar log
registrar_log("✓ Nova jogadora cadastrada: Marta")
```

### 2. Autenticação JWT

#### Registro:
```bash
POST /auth/register
Content-Type: application/json

{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "senha": "senha12345",
  "role": "jogadora_amadora"
}
```

#### Login:
```bash
POST /auth/login
Content-Type: application/x-www-form-urlencoded

username=maria@email.com&password=senha12345
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "role": "jogadora_amadora",
  "nome": "Maria Silva"
}
```

### 3. CRUD de Jogadoras

#### Listar Todas:
```bash
GET /api/players/
```

#### Buscar por ID:
```bash
GET /api/players/1
```

#### Criar Nova:
```bash
POST /api/players/
Content-Type: application/json
Authorization: Bearer {token}

{
  "nome": "Ana Paula",
  "posicao": "Meio-campista",
  "nacionalidade": "Brasil",
  "clube_atual": "Corinthians"
}
```

#### Atualizar:
```bash
PUT /api/players/1
Content-Type: application/json
Authorization: Bearer {token}

{
  "clube_atual": "Palmeiras"
}
```

#### Deletar:
```bash
DELETE /api/players/1
Authorization: Bearer {token}
```

### 4. CRUD de Eventos

Mesma estrutura das jogadoras:
- `GET /api/events/` - Listar todos
- `GET /api/events/{id}` - Buscar por ID
- `POST /api/events/` - Criar novo
- `PUT /api/events/{id}` - Atualizar
- `DELETE /api/events/{id}` - Deletar

## 📊 Tratamento de Erros (REQUISITO OBRIGATÓRIO)

Todas as rotas possuem try-except com mensagens claras:

```python
@router.post("/api/jogadoras")
def criar_jogadora(dados: JogadoraCreate):
    try:
        # Lógica da rota
        registrar_log("✓ Jogadora criada")
        return {"mensagem": "Sucesso"}
        
    except ValueError as e:
        registrar_log(f"✗ ERRO de validação: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail=f"Erro de validação: {str(e)}"
        )
    except Exception as e:
        registrar_log(f"✗ ERRO inesperado: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Erro interno: {str(e)}"
        )
```

## 📝 Arquivo de Logs (REQUISITO OBRIGATÓRIO)

Todas as operações são registradas em `database/logs.txt`:

```
[2025-11-05 14:30:00] ✓ Sistema de Persistência Iniciado
[2025-11-05 14:30:01] ✓ API Passa a Bola iniciada com sucesso!
[2025-11-05 14:31:15] ✓ Novo usuário registrado: maria@email.com (jogadora_amadora)
[2025-11-05 14:31:45] ✓ Login bem-sucedido: maria@email.com
[2025-11-05 14:32:10] ✓ Nova jogadora criada: Ana Paula
[2025-11-05 14:32:30] ✓ Backup salvo: jogadoras (12 registros)
```

## 📚 Documentação Interativa

A documentação completa está disponível em:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## 🔐 Segurança

### Hash de Senhas:
- Algoritmo: **Bcrypt**
- Rounds: 12 (padrão do passlib)

### JWT:
- Algoritmo: **HS256**
- Expiração: 7 dias
- Secret Key: Configurável via variável de ambiente

## 🧪 Testes

```bash
# Testar registro
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste User",
    "email": "teste@email.com",
    "senha": "senha123",
    "role": "jogadora_amadora"
  }'

# Testar login
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=teste@email.com&password=senha123"
```

## 🚀 Deploy

### Vercel (Recomendado)

Crie `vercel.json` na raiz:
```json
{
  "builds": [
    {
      "src": "backend/main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "backend/main.py"
    }
  ]
}
```

Deploy:
```bash
vercel --prod
```

## 📄 Arquivos de Backup JSON

### Estrutura:
- `users_backup.json`: Usuários cadastrados
- `jogadoras_backup.json`: Jogadoras
- `eventos_backup.json`: Eventos e peneiras
- `logs.txt`: Registro de todas as operações

### Exemplo de `users_backup.json`:
```json
[
  {
    "_id": "1",
    "nome": "Maria Silva",
    "email": "maria@email.com",
    "hashed_password": "$2b$12$...",
    "role": "jogadora_amadora",
    "data_criacao": "2025-11-05T14:30:00"
  }
]
```

## 🎓 Critérios de Avaliação Atendidos

- [x] **Validações e try-except (20 pontos):** Todas as rotas
- [x] **Persistência JSON/TXT (20 pontos):** Sistema completo
- [x] **CRUD em arquivos (30 pontos):** CREATE, READ, UPDATE, DELETE
- [x] **Funções organizadas (10 pontos):** Código modular
- [x] **Interface intuitiva (15 pontos):** Swagger Docs
- [x] **Comentários (5 pontos):** Docstrings em todas as funções

## 📞 Suporte

Para dúvidas ou problemas, entre em contato:
- **Email:** contato@passabola.com
- **GitHub:** https://github.com/MuriloBezChleba/Sprint4--Passa-a-bola

---

**Desenvolvido com 💚 por Calçada LTDA | FIAP - Sprint 4 - 2025**

