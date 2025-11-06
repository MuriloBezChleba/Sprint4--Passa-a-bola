"""
Modelos Pydantic para validação de dados (REQUISITO OBRIGATÓRIO)
Define estruturas de dados com validação automática
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


class UsuarioBase(BaseModel):
    """Modelo base de usuário"""
    nome: str = Field(..., min_length=3, max_length=100, description="Nome completo do usuário")
    email: EmailStr = Field(..., description="Email válido")
    role: str = Field(..., description="Tipo de usuário: jogadora_amadora, jogadora_profissional, olheiro, torcedor")


class UsuarioCreate(UsuarioBase):
    """Modelo para criação de usuário"""
    senha: str = Field(..., min_length=8, description="Senha com mínimo 8 caracteres")


class UsuarioResponse(UsuarioBase):
    """Modelo de resposta de usuário (sem senha)"""
    id: Optional[str] = None
    
    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    """Modelo para requisição de login"""
    email: EmailStr
    senha: str


class TokenResponse(BaseModel):
    """Modelo de resposta com token JWT"""
    access_token: str
    token_type: str
    role: str
    nome: str


class JogadoraBase(BaseModel):
    """Modelo base de jogadora"""
    nome: str
    idade: Optional[int] = None
    posicao: str
    nacionalidade: Optional[str] = "Brasil"
    clube_atual: Optional[str] = None
    altura: Optional[float] = None
    peso: Optional[float] = None
    pe_preferido: Optional[str] = None


class JogadoraCreate(JogadoraBase):
    """Modelo para criação de jogadora"""
    pass


class JogadoraResponse(JogadoraBase):
    """Modelo de resposta de jogadora"""
    id: str
    gols_carreira: Optional[int] = 0
    assistencias: Optional[int] = 0
    partidas_jogadas: Optional[int] = 0
    
    class Config:
        from_attributes = True


class EventoBase(BaseModel):
    """Modelo base de evento"""
    titulo: str = Field(..., min_length=5, max_length=200)
    descricao: str
    tipo: str = Field(..., description="Peneira, Torneio, Festival, Clínica")
    data: str
    horario: str
    local: str
    endereco: str


class EventoCreate(EventoBase):
    """Modelo para criação de evento"""
    vagas: Optional[int] = None
    categoria: Optional[str] = None
    organizador: Optional[str] = None


class EventoResponse(EventoBase):
    """Modelo de resposta de evento"""
    id: str
    vagas_disponiveis: Optional[int] = None
    inscricoes_abertas: bool = True
    
    class Config:
        from_attributes = True


class MessageResponse(BaseModel):
    """Modelo genérico de resposta com mensagem"""
    mensagem: str
    sucesso: bool = True


class ErrorResponse(BaseModel):
    """Modelo de resposta de erro"""
    detail: str
    status_code: int

