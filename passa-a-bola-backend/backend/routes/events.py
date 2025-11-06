"""
Rotas de Eventos (CRUD Completo)
Todas as rotas com try-except (REQUISITO OBRIGATÓRIO)
Operações em arquivos JSON (REQUISITO OBRIGATÓRIO)
"""

from fastapi import APIRouter, HTTPException, status
from typing import List, Dict

import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent.parent))

from backend.models import EventoCreate, EventoResponse
from utils.persistence import (
    carregar_backup_json,
    salvar_backup_json,
    registrar_log
)

router = APIRouter(prefix="/api/events", tags=["Eventos"])


@router.get("/", response_model=List[Dict])
def listar_eventos():
    """
    Lista todos os eventos (CRUD - READ)
    Try-except obrigatório para tratamento de erros
    """
    try:
        # Carregar do JSON (REQUISITO OBRIGATÓRIO)
        eventos = carregar_backup_json("eventos")
        
        registrar_log(f"✓ Listagem de eventos: {len(eventos)} registros")
        
        return eventos
        
    except Exception as e:
        registrar_log(f"✗ ERRO ao listar eventos: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao listar eventos: {str(e)}"
        )


@router.get("/{evento_id}", response_model=Dict)
def buscar_evento(evento_id: str):
    """
    Busca um evento por ID (CRUD - READ)
    Try-except obrigatório para tratamento de erros
    """
    try:
        eventos = carregar_backup_json("eventos")
        
        # Buscar evento
        for evento in eventos:
            if str(evento.get('id')) == str(evento_id):
                registrar_log(f"✓ Evento encontrado: {evento.get('titulo')}")
                return evento
        
        # Não encontrado
        registrar_log(f"⚠ Evento não encontrado: ID {evento_id}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Evento com ID {evento_id} não encontrado"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        registrar_log(f"✗ ERRO ao buscar evento: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao buscar evento: {str(e)}"
        )


@router.post("/", response_model=Dict, status_code=status.HTTP_201_CREATED)
def criar_evento(dados: EventoCreate):
    """
    Cria novo evento (CRUD - CREATE)
    Try-except obrigatório para tratamento de erros
    Salva em arquivo JSON (REQUISITO OBRIGATÓRIO)
    """
    try:
        eventos = carregar_backup_json("eventos")
        
        # Criar novo registro
        novo_id = str(len(eventos) + 1)
        novo_evento = {
            "id": novo_id,
            **dados.dict(),
            "vagas_disponiveis": dados.vagas if dados.vagas else None,
            "inscricoes_abertas": True
        }
        
        eventos.append(novo_evento)
        
        # Salvar no JSON (REQUISITO OBRIGATÓRIO)
        salvar_backup_json("eventos", eventos)
        
        registrar_log(f"✓ Novo evento criado: {dados.titulo}")
        
        return {
            "mensagem": "Evento criado com sucesso",
            "id": novo_id,
            "evento": novo_evento
        }
        
    except Exception as e:
        registrar_log(f"✗ ERRO ao criar evento: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao criar evento: {str(e)}"
        )


@router.put("/{evento_id}", response_model=Dict)
def atualizar_evento(evento_id: str, dados: Dict):
    """
    Atualiza dados de um evento (CRUD - UPDATE)
    Try-except obrigatório para tratamento de erros
    Atualiza arquivo JSON (REQUISITO OBRIGATÓRIO)
    """
    try:
        eventos = carregar_backup_json("eventos")
        
        # Encontrar e atualizar evento
        encontrado = False
        for i, evento in enumerate(eventos):
            if str(evento.get('id')) == str(evento_id):
                eventos[i].update(dados)
                encontrado = True
                break
        
        if not encontrado:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Evento com ID {evento_id} não encontrado"
            )
        
        # Salvar no JSON (REQUISITO OBRIGATÓRIO)
        salvar_backup_json("eventos", eventos)
        
        registrar_log(f"✓ Evento atualizado: ID {evento_id}")
        
        return {
            "mensagem": "Evento atualizado com sucesso",
            "id": evento_id
        }
        
    except HTTPException:
        raise
    except Exception as e:
        registrar_log(f"✗ ERRO ao atualizar evento: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao atualizar evento: {str(e)}"
        )


@router.delete("/{evento_id}", response_model=Dict)
def deletar_evento(evento_id: str):
    """
    Deleta um evento (CRUD - DELETE)
    Try-except obrigatório para tratamento de erros
    Remove do arquivo JSON (REQUISITO OBRIGATÓRIO)
    """
    try:
        eventos = carregar_backup_json("eventos")
        
        # Filtrar removendo o evento
        eventos_filtrados = [e for e in eventos if str(e.get('id')) != str(evento_id)]
        
        if len(eventos_filtrados) == len(eventos):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Evento com ID {evento_id} não encontrado"
            )
        
        # Salvar no JSON (REQUISITO OBRIGATÓRIO)
        salvar_backup_json("eventos", eventos_filtrados)
        
        registrar_log(f"✓ Evento deletado: ID {evento_id}")
        
        return {
            "mensagem": "Evento deletado com sucesso",
            "id": evento_id
        }
        
    except HTTPException:
        raise
    except Exception as e:
        registrar_log(f"✗ ERRO ao deletar evento: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao deletar evento: {str(e)}"
        )

