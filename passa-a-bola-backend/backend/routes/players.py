"""
Rotas de Jogadoras (CRUD Completo)
Todas as rotas com try-except (REQUISITO OBRIGATÓRIO)
Operações em arquivos JSON (REQUISITO OBRIGATÓRIO)
"""

from fastapi import APIRouter, HTTPException, status
from typing import List, Dict

import sys
from pathlib import Path
sys.path.append(str(Path(__file__).resolve().parent.parent.parent))

from backend.models import JogadoraCreate, JogadoraResponse
from utils.persistence import (
    carregar_backup_json,
    salvar_backup_json,
    inserir_registro_json,
    atualizar_registro_json,
    deletar_registro_json,
    registrar_log
)

router = APIRouter(prefix="/api/players", tags=["Jogadoras"])


@router.get("/", response_model=List[Dict])
def listar_jogadoras():
    """
    Lista todas as jogadoras (CRUD - READ)
    Try-except obrigatório para tratamento de erros
    """
    try:
        # Carregar do JSON (REQUISITO OBRIGATÓRIO)
        jogadoras = carregar_backup_json("jogadoras")
        
        registrar_log(f"✓ Listagem de jogadoras: {len(jogadoras)} registros")
        
        return jogadoras
        
    except Exception as e:
        registrar_log(f"✗ ERRO ao listar jogadoras: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao listar jogadoras: {str(e)}"
        )


@router.get("/{jogadora_id}", response_model=Dict)
def buscar_jogadora(jogadora_id: str):
    """
    Busca uma jogadora por ID (CRUD - READ)
    Try-except obrigatório para tratamento de erros
    """
    try:
        jogadoras = carregar_backup_json("jogadoras")
        
        # Buscar jogadora
        for jogadora in jogadoras:
            if str(jogadora.get('id')) == str(jogadora_id):
                registrar_log(f"✓ Jogadora encontrada: {jogadora.get('nome')}")
                return jogadora
        
        # Não encontrada
        registrar_log(f"⚠ Jogadora não encontrada: ID {jogadora_id}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Jogadora com ID {jogadora_id} não encontrada"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        registrar_log(f"✗ ERRO ao buscar jogadora: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao buscar jogadora: {str(e)}"
        )


@router.post("/", response_model=Dict, status_code=status.HTTP_201_CREATED)
def criar_jogadora(dados: JogadoraCreate):
    """
    Cria nova jogadora (CRUD - CREATE)
    Try-except obrigatório para tratamento de erros
    Salva em arquivo JSON (REQUISITO OBRIGATÓRIO)
    """
    try:
        jogadoras = carregar_backup_json("jogadoras")
        
        # Criar novo registro
        novo_id = str(len(jogadoras) + 1)
        nova_jogadora = {
            "id": novo_id,
            **dados.dict(),
            "gols_carreira": 0,
            "assistencias": 0,
            "partidas_jogadas": 0,
            "status": "Ativo"
        }
        
        jogadoras.append(nova_jogadora)
        
        # Salvar no JSON (REQUISITO OBRIGATÓRIO)
        salvar_backup_json("jogadoras", jogadoras)
        
        registrar_log(f"✓ Nova jogadora criada: {dados.nome}")
        
        return {
            "mensagem": "Jogadora criada com sucesso",
            "id": novo_id,
            "jogadora": nova_jogadora
        }
        
    except Exception as e:
        registrar_log(f"✗ ERRO ao criar jogadora: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao criar jogadora: {str(e)}"
        )


@router.put("/{jogadora_id}", response_model=Dict)
def atualizar_jogadora(jogadora_id: str, dados: Dict):
    """
    Atualiza dados de uma jogadora (CRUD - UPDATE)
    Try-except obrigatório para tratamento de erros
    Atualiza arquivo JSON (REQUISITO OBRIGATÓRIO)
    """
    try:
        jogadoras = carregar_backup_json("jogadoras")
        
        # Encontrar e atualizar jogadora
        encontrada = False
        for i, jogadora in enumerate(jogadoras):
            if str(jogadora.get('id')) == str(jogadora_id):
                jogadoras[i].update(dados)
                encontrada = True
                break
        
        if not encontrada:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Jogadora com ID {jogadora_id} não encontrada"
            )
        
        # Salvar no JSON (REQUISITO OBRIGATÓRIO)
        salvar_backup_json("jogadoras", jogadoras)
        
        registrar_log(f"✓ Jogadora atualizada: ID {jogadora_id}")
        
        return {
            "mensagem": "Jogadora atualizada com sucesso",
            "id": jogadora_id
        }
        
    except HTTPException:
        raise
    except Exception as e:
        registrar_log(f"✗ ERRO ao atualizar jogadora: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao atualizar jogadora: {str(e)}"
        )


@router.delete("/{jogadora_id}", response_model=Dict)
def deletar_jogadora(jogadora_id: str):
    """
    Deleta uma jogadora (CRUD - DELETE)
    Try-except obrigatório para tratamento de erros
    Remove do arquivo JSON (REQUISITO OBRIGATÓRIO)
    """
    try:
        jogadoras = carregar_backup_json("jogadoras")
        
        # Filtrar removendo a jogadora
        jogadoras_filtradas = [j for j in jogadoras if str(j.get('id')) != str(jogadora_id)]
        
        if len(jogadoras_filtradas) == len(jogadoras):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Jogadora com ID {jogadora_id} não encontrada"
            )
        
        # Salvar no JSON (REQUISITO OBRIGATÓRIO)
        salvar_backup_json("jogadoras", jogadoras_filtradas)
        
        registrar_log(f"✓ Jogadora deletada: ID {jogadora_id}")
        
        return {
            "mensagem": "Jogadora deletada com sucesso",
            "id": jogadora_id
        }
        
    except HTTPException:
        raise
    except Exception as e:
        registrar_log(f"✗ ERRO ao deletar jogadora: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao deletar jogadora: {str(e)}"
        )

