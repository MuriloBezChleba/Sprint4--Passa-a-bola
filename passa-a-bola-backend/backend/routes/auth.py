"""
Rotas de Autenticação (Login e Registro)
Todas as rotas com try-except (REQUISITO OBRIGATÓRIO)
"""

from fastapi import APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Depends
from typing import Dict

# Imports internos
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent.parent))

from backend.models import UsuarioCreate, UsuarioResponse, TokenResponse
from backend.security import get_password_hash, verify_password, create_access_token
from utils.persistence import (
    carregar_backup_json,
    salvar_backup_json,
    inserir_registro_json,
    registrar_log
)

router = APIRouter(prefix="/auth", tags=["Autenticação"])


@router.post("/register", response_model=Dict, status_code=status.HTTP_201_CREATED)
def registrar_usuario(dados: UsuarioCreate):
    """
    Registra novo usuário no sistema (CRUD - CREATE)
    Try-except obrigatório para tratamento de erros
    
    Validações:
    - Email único
    - Senha mínimo 8 caracteres
    - Role válido
    """
    try:
        # Carregar usuários existentes do JSON
        usuarios = carregar_backup_json("users")
        
        # Validar email único
        for usuario in usuarios:
            if usuario.get('email') == dados.email:
                registrar_log(f"✗ Tentativa de registro com email duplicado: {dados.email}")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email já cadastrado. Faça login ou use outro email."
                )
        
        # Validar role
        roles_validos = ['jogadora_amadora', 'jogadora_profissional', 'olheiro', 'torcedor']
        if dados.role not in roles_validos:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Role inválido. Valores aceitos: {', '.join(roles_validos)}"
            )
        
        # Hash da senha
        senha_hash = get_password_hash(dados.senha)
        
        # Criar registro do usuário
        novo_usuario = {
            "nome": dados.nome,
            "email": dados.email,
            "hashed_password": senha_hash,
            "role": dados.role,
            "data_criacao": str(datetime.now())
        }
        
        # Adicionar aos usuários
        usuarios.append(novo_usuario)
        
        # Salvar backup JSON (REQUISITO OBRIGATÓRIO)
        salvar_backup_json("users", usuarios)
        
        # Log da ação (REQUISITO OBRIGATÓRIO)
        registrar_log(f"✓ Novo usuário registrado: {dados.email} ({dados.role})")
        
        return {
            "mensagem": "Usuário registrado com sucesso!",
            "email": dados.email,
            "role": dados.role
        }
        
    except HTTPException:
        raise
    except ValueError as e:
        registrar_log(f"✗ ERRO de validação no registro: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Erro de validação: {str(e)}"
        )
    except Exception as e:
        registrar_log(f"✗ ERRO inesperado no registro: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro interno ao registrar usuário: {str(e)}"
        )


@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Autentica usuário e retorna token JWT (CRUD - READ)
    Try-except obrigatório para tratamento de erros
    
    Args:
        username: Email do usuário
        password: Senha
        
    Returns:
        dict: access_token, token_type, role, nome
    """
    try:
        # Carregar usuários do JSON (REQUISITO OBRIGATÓRIO)
        usuarios = carregar_backup_json("users")
        
        # Buscar usuário por email
        usuario_encontrado = None
        for usuario in usuarios:
            if usuario.get('email') == form_data.username:
                usuario_encontrado = usuario
                break
        
        # Verificar se usuário existe
        if not usuario_encontrado:
            registrar_log(f"✗ Tentativa de login com email não cadastrado: {form_data.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Email ou senha incorretos",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Verificar senha
        if not verify_password(form_data.password, usuario_encontrado["hashed_password"]):
            registrar_log(f"✗ Tentativa de login com senha incorreta: {form_data.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Email ou senha incorretos",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Gerar token JWT
        token = create_access_token(
            data={
                "sub": usuario_encontrado["email"],
                "role": usuario_encontrado["role"]
            }
        )
        
        # Log da ação (REQUISITO OBRIGATÓRIO)
        registrar_log(f"✓ Login bem-sucedido: {form_data.username}")
        
        return {
            "access_token": token,
            "token_type": "bearer",
            "role": usuario_encontrado["role"],
            "nome": usuario_encontrado["nome"]
        }
        
    except HTTPException:
        raise
    except Exception as e:
        registrar_log(f"✗ ERRO inesperado no login: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro interno ao fazer login: {str(e)}"
        )


# Importar datetime
from datetime import datetime

