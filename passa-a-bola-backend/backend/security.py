"""
Módulo de Segurança - JWT e Hash de Senhas
Implementa autenticação segura com JWT e bcrypt
"""

from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
import os

# Configurações de segurança
SECRET_KEY = os.getenv("SECRET_KEY", "sua_chave_super_secreta_para_jwt_2025_passa_a_bola")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 dias

# Context para hash de senhas com bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    """
    Gera hash da senha usando bcrypt
    
    Args:
        password (str): Senha em texto plano
        
    Returns:
        str: Hash da senha
        
    Example:
        >>> hashed = get_password_hash("minhasenha123")
        >>> print(hashed)
        $2b$12$...
    """
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica se a senha corresponde ao hash
    
    Args:
        plain_password (str): Senha em texto plano
        hashed_password (str): Hash armazenado
        
    Returns:
        bool: True se a senha está correta
        
    Example:
        >>> is_valid = verify_password("minhasenha123", hashed)
        >>> print(is_valid)
        True
    """
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Cria um token JWT com dados do usuário
    
    Args:
        data (dict): Dados a serem incluídos no token (ex: email, role)
        expires_delta (timedelta, optional): Tempo de expiração customizado
        
    Returns:
        str: Token JWT assinado
        
    Example:
        >>> token = create_access_token({"sub": "user@email.com", "role": "jogadora_amadora"})
        >>> print(token)
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    """
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt


def decode_access_token(token: str) -> Optional[dict]:
    """
    Decodifica e valida um token JWT
    
    Args:
        token (str): Token JWT
        
    Returns:
        dict: Dados do token se válido, None caso contrário
        
    Example:
        >>> payload = decode_access_token(token)
        >>> print(payload['sub'])
        user@email.com
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

