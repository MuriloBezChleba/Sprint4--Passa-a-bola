"""
FastAPI - Backend Passa a Bola
Aplicação principal com todas as rotas e configurações
Desenvolvido por: Calçada LTDA
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import sys
from pathlib import Path

# Adicionar path para imports
sys.path.append(str(Path(__file__).resolve().parent.parent))

# Importar rotas
from backend.routes import auth, players, events

# Importar sistema de persistência
from utils.persistence import registrar_log, carregar_backup_json, salvar_backup_json


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Gerenciador de ciclo de vida da aplicação (lifespan)
    Substitui os deprecados on_event("startup") e on_event("shutdown")
    """
    # Startup
    try:
        registrar_log("=" * 60)
        registrar_log("🚀 API Passa a Bola iniciada com sucesso!")
        registrar_log("=" * 60)
        
        # Verificar e criar arquivos JSON iniciais se não existirem
        inicializar_dados_exemplo()
        
    except Exception as e:
        registrar_log(f"✗ ERRO ao iniciar aplicação: {str(e)}")
    
    yield  # Aplicação rodando
    
    # Shutdown
    registrar_log("=" * 60)
    registrar_log("🛑 API Passa a Bola encerrada")
    registrar_log("=" * 60)


# Criar aplicação FastAPI com lifespan
app = FastAPI(
    lifespan=lifespan,
    title="Passa a Bola API",
    description="""
    ## Backend completo para a plataforma Passa a Bola
    
    ### 🎯 Objetivo
    Conectar jogadoras de futebol feminino, olheiros, clubes e fãs, promovendo 
    visibilidade e oportunidades no futebol feminino.
    
    ### ⚽ Funcionalidades
    - 🔐 **Autenticação JWT:** Registro, login e proteção de rotas
    - 👤 **Perfis de Jogadoras:** CRUD completo com persistência em JSON
    - 📍 **Eventos e Peneiras:** Gerenciamento de eventos esportivos
    - 💾 **Backup em JSON:** Sistema de persistência local (requisito obrigatório)
    - 📝 **Logs:** Registro de todas as operações em arquivo TXT
    
    ### 👥 Desenvolvido por
    **Calçada LTDA**
    - Caio M. Lins - RM 559805
    - Murilo B. Gonzalez - RM 566199
    - Bernardo G. Lozório - RM 564943
    
    ### 🔑 Autenticação
    Use o endpoint `/auth/login` para obter o token JWT.
    Depois, clique em "Authorize" e cole o token no formato: `Bearer seu_token_aqui`
    """,
    version="1.0.0",
    contact={
        "name": "Calçada LTDA",
        "email": "contato@passabola.com",
        "url": "https://github.com/MuriloBezChleba/Sprint4--Passa-a-bola"
    },
    license_info={
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT",
    }
)

# Configuração de CORS (permitir frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # React dev server alternativo
        "https://*.vercel.app",   # Deploy na Vercel
        "*"                        # DESENVOLVIMENTO APENAS
    ],
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE, etc
    allow_headers=["*"],  # Authorization, Content-Type, etc
)

# Incluir rotas
app.include_router(auth.router)
app.include_router(players.router)
app.include_router(events.router)


@app.get("/", tags=["Root"])
def root():
    """
    Rota raiz - Informações da API
    """
    return {
        "mensagem": "Bem-vindo à API Passa a Bola! ⚽",
        "versao": "1.0.0",
        "desenvolvedores": [
            "Caio M. Lins - RM 559805",
            "Murilo B. Gonzalez - RM 566199",
            "Bernardo G. Lozório - RM 564943"
        ],
        "documentacao": "/docs",
        "status": "online"
    }


@app.get("/health", tags=["Health"])
def health_check():
    """
    Rota de health check
    """
    return {"status": "healthy", "mensagem": "API funcionando corretamente"}


def inicializar_dados_exemplo():
    """
    Inicializa arquivos JSON com dados de exemplo
    Copia dados do frontend se os arquivos não existirem
    """
    import json
    from pathlib import Path
    
    # Verificar se já existem dados
    usuarios = carregar_backup_json("users")
    jogadoras = carregar_backup_json("jogadoras")
    eventos = carregar_backup_json("eventos")
    
    # Se não houver jogadoras, copiar do frontend
    if len(jogadoras) == 0:
        frontend_jogadoras = Path(__file__).resolve().parent.parent.parent / "passa-a-bola-frontend" / "src" / "data" / "jogadoras.json"
        if frontend_jogadoras.exists():
            with open(frontend_jogadoras, 'r', encoding='utf-8') as f:
                jogadoras_data = json.load(f)
                salvar_backup_json("jogadoras", jogadoras_data)
                registrar_log(f"✓ {len(jogadoras_data)} jogadoras importadas do frontend")
    
    # Se não houver eventos, copiar do frontend
    if len(eventos) == 0:
        frontend_eventos = Path(__file__).resolve().parent.parent.parent / "passa-a-bola-frontend" / "src" / "data" / "eventos.json"
        if frontend_eventos.exists():
            with open(frontend_eventos, 'r', encoding='utf-8') as f:
                eventos_data = json.load(f)
                salvar_backup_json("eventos", eventos_data)
                registrar_log(f"✓ {len(eventos_data)} eventos importados do frontend")
    
    # Criar usuário de teste se não houver usuários
    if len(usuarios) == 0:
        from backend.security import get_password_hash
        usuario_teste = {
            "_id": "1",
            "nome": "Usuária Teste",
            "email": "teste@passabola.com",
            "hashed_password": get_password_hash("senha123"),
            "role": "jogadora_amadora",
            "data_criacao": "2025-11-05T00:00:00"
        }
        salvar_backup_json("users", [usuario_teste])
        registrar_log("✓ Usuário de teste criado: teste@passabola.com / senha123")


# Executar a aplicação
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
