"""
Sistema de Persistência em JSON e TXT (REQUISITO OBRIGATÓRIO)
Funções para salvar, carregar e fazer backup de dados em arquivos
Registra todas as operações em arquivo de log
"""

import json
import os
from datetime import datetime
from typing import List, Dict, Any
from pathlib import Path

# Diretório base para armazenamento de dados
BASE_DIR = Path(__file__).resolve().parent.parent
DATABASE_DIR = BASE_DIR / "database"

# Criar diretório database se não existir
DATABASE_DIR.mkdir(exist_ok=True)


def registrar_log(mensagem: str) -> None:
    """
    Registra ações em arquivo de log TXT (REQUISITO OBRIGATÓRIO)
    
    Args:
        mensagem (str): Mensagem a ser registrada no log
        
    Example:
        >>> registrar_log("Novo usuário criado: joao@email.com")
    """
    try:
        log_file = DATABASE_DIR / "logs.txt"
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        with open(log_file, 'a', encoding='utf-8') as f:
            f.write(f"[{timestamp}] {mensagem}\n")
            
    except IOError as e:
        print(f"ERRO ao registrar log: {e}")


def salvar_backup_json(collection_name: str, data: List[Dict[str, Any]]) -> bool:
    """
    Salva backup dos dados em arquivo JSON (REQUISITO OBRIGATÓRIO)
    
    Args:
        collection_name (str): Nome da coleção (ex: "users", "jogadoras")
        data (List[Dict]): Lista de dados para salvar
        
    Returns:
        bool: True se salvou com sucesso, False caso contrário
        
    Example:
        >>> usuarios = [{"nome": "João", "email": "joao@email.com"}]
        >>> salvar_backup_json("users", usuarios)
        True
    """
    try:
        filename = DATABASE_DIR / f"{collection_name}_backup.json"
        
        # Converter ObjectId do MongoDB para string se existir
        data_serializable = []
        for item in data:
            item_copy = item.copy()
            if '_id' in item_copy:
                item_copy['_id'] = str(item_copy['_id'])
            data_serializable.append(item_copy)
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data_serializable, f, ensure_ascii=False, indent=2, default=str)
        
        registrar_log(f"✓ Backup salvo: {collection_name} ({len(data)} registros)")
        return True
        
    except IOError as e:
        registrar_log(f"✗ ERRO ao salvar backup {collection_name}: {str(e)}")
        return False
    except Exception as e:
        registrar_log(f"✗ ERRO inesperado ao salvar backup {collection_name}: {str(e)}")
        return False


def carregar_backup_json(collection_name: str) -> List[Dict[str, Any]]:
    """
    Carrega backup dos dados do arquivo JSON (REQUISITO OBRIGATÓRIO)
    
    Args:
        collection_name (str): Nome da coleção
        
    Returns:
        List[Dict]: Lista de dados carregados (vazia se não existir)
        
    Example:
        >>> usuarios = carregar_backup_json("users")
        >>> print(len(usuarios))
        10
    """
    try:
        filename = DATABASE_DIR / f"{collection_name}_backup.json"
        
        if not filename.exists():
            registrar_log(f"⚠ Arquivo de backup não encontrado: {collection_name}")
            return []
        
        with open(filename, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        registrar_log(f"✓ Backup carregado: {collection_name} ({len(data)} registros)")
        return data
        
    except FileNotFoundError:
        registrar_log(f"⚠ Arquivo não encontrado: {collection_name}")
        return []
    except json.JSONDecodeError as e:
        registrar_log(f"✗ ERRO ao decodificar JSON {collection_name}: {str(e)}")
        return []
    except Exception as e:
        registrar_log(f"✗ ERRO inesperado ao carregar backup {collection_name}: {str(e)}")
        return []


def inserir_registro_json(collection_name: str, registro: Dict[str, Any]) -> bool:
    """
    Insere um novo registro no arquivo JSON (CRUD - CREATE)
    
    Args:
        collection_name (str): Nome da coleção
        registro (Dict): Dados do registro a inserir
        
    Returns:
        bool: True se inseriu com sucesso
    """
    try:
        # Carregar dados existentes
        dados = carregar_backup_json(collection_name)
        
        # Adicionar novo registro
        registro['_id'] = str(len(dados) + 1)  # ID simples
        dados.append(registro)
        
        # Salvar de volta
        salvar_backup_json(collection_name, dados)
        
        registrar_log(f"✓ Registro inserido em {collection_name}: {registro.get('nome', registro.get('email', 'N/A'))}")
        return True
        
    except Exception as e:
        registrar_log(f"✗ ERRO ao inserir registro em {collection_name}: {str(e)}")
        return False


def atualizar_registro_json(collection_name: str, registro_id: str, novos_dados: Dict[str, Any]) -> bool:
    """
    Atualiza um registro no arquivo JSON (CRUD - UPDATE)
    
    Args:
        collection_name (str): Nome da coleção
        registro_id (str): ID do registro
        novos_dados (Dict): Novos dados
        
    Returns:
        bool: True se atualizou com sucesso
    """
    try:
        dados = carregar_backup_json(collection_name)
        
        # Encontrar e atualizar registro
        encontrado = False
        for i, item in enumerate(dados):
            if str(item.get('_id')) == str(registro_id):
                dados[i].update(novos_dados)
                encontrado = True
                break
        
        if not encontrado:
            registrar_log(f"⚠ Registro não encontrado para atualizar: {collection_name} ID {registro_id}")
            return False
        
        # Salvar de volta
        salvar_backup_json(collection_name, dados)
        
        registrar_log(f"✓ Registro atualizado em {collection_name}: ID {registro_id}")
        return True
        
    except Exception as e:
        registrar_log(f"✗ ERRO ao atualizar registro em {collection_name}: {str(e)}")
        return False


def deletar_registro_json(collection_name: str, registro_id: str) -> bool:
    """
    Deleta um registro do arquivo JSON (CRUD - DELETE)
    
    Args:
        collection_name (str): Nome da coleção
        registro_id (str): ID do registro
        
    Returns:
        bool: True se deletou com sucesso
    """
    try:
        dados = carregar_backup_json(collection_name)
        
        # Filtrar removendo o registro
        dados_filtrados = [item for item in dados if str(item.get('_id')) != str(registro_id)]
        
        if len(dados_filtrados) == len(dados):
            registrar_log(f"⚠ Registro não encontrado para deletar: {collection_name} ID {registro_id}")
            return False
        
        # Salvar de volta
        salvar_backup_json(collection_name, dados_filtrados)
        
        registrar_log(f"✓ Registro deletado de {collection_name}: ID {registro_id}")
        return True
        
    except Exception as e:
        registrar_log(f"✗ ERRO ao deletar registro de {collection_name}: {str(e)}")
        return False


def listar_registros_json(collection_name: str) -> List[Dict[str, Any]]:
    """
    Lista todos os registros do arquivo JSON (CRUD - READ)
    
    Args:
        collection_name (str): Nome da coleção
        
    Returns:
        List[Dict]: Lista de registros
    """
    return carregar_backup_json(collection_name)


# Inicializar arquivo de log
if not (DATABASE_DIR / "logs.txt").exists():
    registrar_log("=" * 50)
    registrar_log("Sistema de Persistência Iniciado")
    registrar_log("Passa a Bola - Backend API")
    registrar_log("Desenvolvido por: Calçada LTDA")
    registrar_log("=" * 50)

