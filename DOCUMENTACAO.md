# 📚 DOCUMENTAÇÃO COMPLETA - PROJETO PASSA A BOLA

---

## 📑 Sumário
1. [Capa](#capa)
2. [Introdução](#introdução)
3. [Arquitetura do Sistema](#arquitetura-do-sistema)
4. [Funcionalidades Principais](#funcionalidades-principais)
5. [Tecnologias Utilizadas](#tecnologias-utilizadas)
6. [Sistema de Persistência](#sistema-de-persistência)
7. [Tratamento de Erros](#tratamento-de-erros)
8. [Deploy e Produção](#deploy-e-produção)
9. [Conclusão](#conclusão)

---

<div id="capa"></div>

## 🏆 CAPA

### PASSA A BOLA (RADAR DA BOLA)
**Plataforma para Conectar Talentos do Futebol Feminino**

---

**Instituição:** FIAP  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Disciplinas:**
- Front-end Design
- Web Development  
- Computational Thinking with Python

**Sprint:** 4  
**Data:** Novembro 2025

---

**Grupo:** Calçada LTDA

**Integrantes:**
- Caio M. Lins - RM 559805
- Murilo B. Gonzalez - RM 566199
- Bernardo G. Lozório - RM 564943

---

**Repositório GitHub:**  
https://github.com/MuriloBezChleba/Sprint4--Passa-a-bola

---

<div id="introdução"></div>

## 1. INTRODUÇÃO

### 1.1 Contexto
O futebol feminino brasileiro vem crescendo exponencialmente nos últimos anos, mas ainda enfrenta desafios significativos em termos de visibilidade e oportunidades. Muitas jogadoras talentosas não têm acesso a plataformas que as conectem com olheiros, clubes e oportunidades de peneiras.

### 1.2 Objetivo do Projeto
O **Passa a Bola** (também conhecido como **Radar da Bola**) é uma plataforma web completa desenvolvida para:

- 🎯 **Conectar jogadoras de futebol feminino** com olheiros e clubes
- 📍 **Divulgar peneiras, eventos e torneios** de forma centralizada
- 📱 **Criar uma comunidade** engajada através de um feed social
- 📰 **Informar** sobre notícias do futebol feminino
- 🤝 **Promover projetos sociais** relacionados ao esporte

### 1.3 Público-Alvo
- **Atletas:** Amadoras e profissionais que buscam visibilidade
- **Olheiros & Clubes:** Buscam descobrir novos talentos
- **Fãs & Comunidade:** Apoiam o movimento do futebol feminino

---

<div id="arquitetura-do-sistema"></div>

## 2. ARQUITETURA DO SISTEMA

### 2.1 Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React Vite)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Landing    │  │   Dashboard  │  │    Feed      │     │
│  │     Page     │  │   Dinâmico   │  │   Social     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Busca de   │  │   Eventos    │  │   Torneios   │     │
│  │  Jogadoras   │  │  e Peneiras  │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ▼ HTTP/JSON
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (FastAPI)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Autenticação │  │   Jogadoras  │  │   Eventos    │     │
│  │     JWT      │  │  CRUD API    │  │  CRUD API    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ▼ Persistência
┌─────────────────────────────────────────────────────────────┐
│              SISTEMA DE BACKUP (JSON/TXT)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    users     │  │  jogadoras   │  │   eventos    │     │
│  │ _backup.json │  │_backup.json  │  │_backup.json  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌──────────────────────────────────────────────────┐      │
│  │            logs.txt (Registro de Ações)          │      │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Fluxo de Dados

1. **Usuário** acessa a aplicação web via navegador
2. **Frontend React** renderiza as páginas e componentes
3. **Requisições HTTP** são enviadas para o backend
4. **Backend FastAPI** processa as requisições
5. **Sistema de Persistência** salva/carrega dados do JSON
6. **Logs** são registrados em arquivo TXT
7. **Resposta JSON** é enviada de volta ao frontend

---

<div id="funcionalidades-principais"></div>

## 3. FUNCIONALIDADES PRINCIPAIS

### 3.1 Autenticação JWT

#### Registro de Usuário
- Validação de email único
- Senha com mínimo 8 caracteres
- Hash bcrypt da senha
- Roles: `jogadora_amadora`, `jogadora_profissional`, `olheiro`, `torcedor`

#### Login
- Autenticação via email e senha
- Geração de token JWT com expiração de 7 dias
- Armazenamento do token no localStorage

#### Proteção de Rotas
- Rotas privadas requerem autenticação
- Redirecionamento automático para login

### 3.2 Dashboard Dinâmico

#### Estatísticas em Tempo Real
- **Jogadoras Cadastradas:** Total de atletas na plataforma
- **Eventos Agendados:** Peneiras e torneios disponíveis
- **Torneios Ativos:** Competições em andamento

#### CSS Grid Responsivo
```css
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;              /* Mobile: 1 coluna */
}

@media (min-width: 768px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 colunas */
  }
}

@media (min-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(3, 1fr); /* Desktop: 3 colunas */
  }
}
```

### 3.3 Busca de Jogadoras

#### Filtros Avançados
- **Nome:** Busca textual
- **Posição:** Goleira, Zagueira, Lateral, Meio-campista, Atacante
- **Nacionalidade:** País de origem
- **Status:** Ativo, Aposentada

#### Consumo de JSON Local
```javascript
// Requisito obrigatório: JSON local
import jogadorasLocal from '../data/jogadoras.json';

const [jogadoras, setJogadoras] = useState([]);

useEffect(() => {
  setJogadoras(jogadorasLocal);
}, []);
```

### 3.4 Feed Social

#### Modal de Criação de Post (REQUISITO OBRIGATÓRIO)
- **Textarea:** Campo para texto do post
- **Upload de Imagem:** Seleção de arquivo
- **Preview:** Visualização da imagem antes de publicar
- **Botões:** Cancelar (fecha modal) e Publicar (envia dados)

#### Interações
- **Likes:** Sistema de curtidas (onClick)
- **Comentários:** Sistema de comentários
- **Listagem:** Exibição de posts em ordem cronológica

### 3.5 Eventos e Peneiras

#### Tipos de Eventos
- **Peneiras:** Testes de jogadoras
- **Torneios:** Competições
- **Festivais:** Eventos comunitários
- **Clínicas:** Aulas e treinamentos

#### Informações Detalhadas
- Data e horário
- Local e endereço
- Vagas disponíveis
- Requisitos de inscrição
- Status de inscrições

---

<div id="tecnologias-utilizadas"></div>

## 4. TECNOLOGIAS UTILIZADAS

### 4.1 Frontend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **React** | 18+ | Biblioteca JavaScript para UI |
| **Vite** | Latest | Build tool rápido e moderno |
| **TailwindCSS** | 4.0 | Framework CSS utility-first |
| **React Router DOM** | 6+ | Roteamento client-side |
| **React Icons** | Latest | Biblioteca de ícones |
| **JWT Decode** | Latest | Decodificação de tokens JWT |
| **Axios** | Latest | Cliente HTTP |

#### Justificativa das Escolhas
- **React + Vite:** Performance superior ao Create React App
- **TailwindCSS:** Desenvolvimento rápido e consistente
- **React Router DOM:** Navegação sem recarregar a página

### 4.2 Backend

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Python** | 3.10+ | Linguagem de programação |
| **FastAPI** | 0.115+ | Framework web assíncrono |
| **Pydantic** | 2.9+ | Validação de dados |
| **python-jose** | 3.3+ | Implementação JWT |
| **passlib** | 1.7+ | Hash de senhas |
| **bcrypt** | 4.2+ | Algoritmo de hash |
| **uvicorn** | 0.32+ | Servidor ASGI |

#### Justificativa das Escolhas
- **FastAPI:** Performance, documentação automática (Swagger)
- **Pydantic:** Validação automática de dados
- **JWT:** Autenticação stateless e escalável
- **Bcrypt:** Algoritmo seguro para hash de senhas

---

<div id="sistema-de-persistência"></div>

## 5. SISTEMA DE PERSISTÊNCIA (REQUISITO OBRIGATÓRIO)

### 5.1 Arquitetura de Persistência

```python
# utils/persistence.py

def salvar_backup_json(collection_name: str, data: List[Dict]) -> bool:
    """
    Salva backup dos dados em arquivo JSON
    
    REQUISITO OBRIGATÓRIO: Persistência em JSON
    """
    try:
        filename = DATABASE_DIR / f"{collection_name}_backup.json"
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2, default=str)
        
        registrar_log(f"✓ Backup salvo: {collection_name}")
        return True
        
    except IOError as e:
        registrar_log(f"✗ ERRO ao salvar backup: {str(e)}")
        return False
```

### 5.2 CRUD Completo em Arquivos

#### CREATE (Inserir)
```python
def inserir_registro_json(collection_name: str, registro: Dict) -> bool:
    """Insere novo registro no JSON"""
    dados = carregar_backup_json(collection_name)
    registro['_id'] = str(len(dados) + 1)
    dados.append(registro)
    return salvar_backup_json(collection_name, dados)
```

#### READ (Consultar)
```python
def listar_registros_json(collection_name: str) -> List[Dict]:
    """Lista todos os registros"""
    return carregar_backup_json(collection_name)
```

#### UPDATE (Atualizar)
```python
def atualizar_registro_json(collection_name: str, id: str, dados: Dict) -> bool:
    """Atualiza registro existente"""
    registros = carregar_backup_json(collection_name)
    for i, item in enumerate(registros):
        if str(item.get('_id')) == str(id):
            registros[i].update(dados)
            return salvar_backup_json(collection_name, registros)
    return False
```

#### DELETE (Deletar)
```python
def deletar_registro_json(collection_name: str, id: str) -> bool:
    """Deleta registro do JSON"""
    registros = carregar_backup_json(collection_name)
    filtrados = [r for r in registros if str(r.get('_id')) != str(id)]
    return salvar_backup_json(collection_name, filtrados)
```

### 5.3 Sistema de Logs (TXT)

```python
def registrar_log(mensagem: str) -> None:
    """
    Registra ações em arquivo de log TXT
    
    REQUISITO OBRIGATÓRIO: Persistência em TXT
    """
    try:
        log_file = DATABASE_DIR / "logs.txt"
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        with open(log_file, 'a', encoding='utf-8') as f:
            f.write(f"[{timestamp}] {mensagem}\n")
            
    except IOError as e:
        print(f"ERRO ao registrar log: {e}")
```

#### Exemplo de logs.txt:
```
[2025-11-05 14:30:00] ============================================================
[2025-11-05 14:30:00] Sistema de Persistência Iniciado
[2025-11-05 14:30:01] ✓ API Passa a Bola iniciada com sucesso!
[2025-11-05 14:31:15] ✓ Novo usuário registrado: maria@email.com (jogadora_amadora)
[2025-11-05 14:31:45] ✓ Login bem-sucedido: maria@email.com
[2025-11-05 14:32:10] ✓ Nova jogadora criada: Ana Paula
[2025-11-05 14:32:30] ✓ Backup salvo: jogadoras (12 registros)
[2025-11-05 14:33:00] ✗ ERRO ao buscar jogadora: ID não encontrado
```

---

<div id="tratamento-de-erros"></div>

## 6. TRATAMENTO DE ERROS (REQUISITO OBRIGATÓRIO)

### 6.1 Estrutura de Try-Except

Todas as rotas da API possuem tratamento de erros completo:

```python
@router.post("/api/jogadoras")
def criar_jogadora(dados: JogadoraCreate):
    """
    Cria nova jogadora
    Try-except OBRIGATÓRIO em todas as rotas
    """
    try:
        # 1. Lógica principal
        jogadoras = carregar_backup_json("jogadoras")
        nova_jogadora = {**dados.dict(), "id": str(len(jogadoras) + 1)}
        jogadoras.append(nova_jogadora)
        
        # 2. Salvar no JSON
        salvar_backup_json("jogadoras", jogadoras)
        
        # 3. Registrar log
        registrar_log(f"✓ Nova jogadora criada: {dados.nome}")
        
        return {"mensagem": "Sucesso", "jogadora": nova_jogadora}
        
    except ValueError as e:
        # Erro de validação
        registrar_log(f"✗ ERRO de validação: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail=f"Erro de validação: {str(e)}"
        )
        
    except IOError as e:
        # Erro de arquivo
        registrar_log(f"✗ ERRO de I/O: {str(e)}")
        raise HTTPException(
            status_code=503,
            detail="Erro ao acessar arquivo de dados"
        )
        
    except Exception as e:
        # Erro genérico
        registrar_log(f"✗ ERRO inesperado: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Erro interno do servidor: {str(e)}"
        )
```

### 6.2 Tipos de Erros Tratados

| Erro | Status Code | Descrição |
|------|-------------|-----------|
| `ValueError` | 400 | Dados inválidos |
| `IOError` | 503 | Problema com arquivos |
| `HTTPException` | Variável | Erro HTTP específico |
| `Exception` | 500 | Erro genérico |

### 6.3 Mensagens de Erro Claras

❌ **RUIM:**
```python
raise HTTPException(status_code=400, detail="Error")
```

✅ **BOM:**
```python
raise HTTPException(
    status_code=400,
    detail="Erro de validação: O email fornecido já está cadastrado. Tente fazer login ou usar outro email."
)
```

---

<div id="deploy-e-produção"></div>

## 7. DEPLOY E PRODUÇÃO

### 7.1 Frontend (Vercel)

#### Configuração:
1. Conectar repositório GitHub à Vercel
2. Configurar variável de ambiente:
   ```
   VITE_API_URL=https://sua-api.vercel.app
   ```
3. Build automático a cada push

#### Comando de Deploy Manual:
```bash
npm install -g vercel
cd passa-a-bola-frontend
vercel --prod
```

### 7.2 Backend (Vercel Serverless)

#### vercel.json:
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

#### Deploy:
```bash
cd passa-a-bola-backend
vercel --prod
```

### 7.3 GitHub

#### Comandos:
```bash
# Inicializar repositório
git init

# Adicionar arquivos
git add .

# Commit
git commit -m "feat: Projeto completo Passa a Bola"

# Conectar ao repositório remoto
git remote add origin https://github.com/MuriloBezChleba/Sprint4--Passa-a-bola.git

# Push
git push -u origin main
```

---

<div id="conclusão"></div>

## 8. CONCLUSÃO

### 8.1 Objetivos Alcançados

✅ **Front-end Design:**
- React Vite implementado
- TailwindCSS em 100% do projeto
- CSS Grid no dashboard
- Modal de criação de post
- Dropdown de perfil
- Responsividade completa

✅ **Web Development:**
- Projeto React funcional
- Consumo de JSON local e API
- Manipulação do DOM (useState, useEffect)
- Eventos (onClick, onChange, onSubmit)
- HTML5 semântico validado
- 15+ componentes reutilizáveis

✅ **Computational Thinking with Python:**
- Try-except em todas as rotas
- Sistema completo de persistência JSON/TXT
- CRUD em arquivos
- Funções organizadas e documentadas
- Interface intuitiva (Swagger)
- Autenticação JWT

### 8.2 Aprendizados

1. **React + Vite:** Performance superior ao CRA
2. **TailwindCSS:** Desenvolvimento rápido e consistente
3. **FastAPI:** Framework moderno e bem documentado
4. **Pydantic:** Validação automática economiza tempo
5. **JWT:** Autenticação stateless e escalável
6. **Persistência JSON:** Simplicidade para projetos pequenos

### 8.3 Melhorias Futuras

1. **Banco de Dados:** Migrar de JSON para PostgreSQL/MongoDB
2. **Testes:** Implementar testes unitários e de integração
3. **Cache:** Redis para melhorar performance
4. **WebSockets:** Chat em tempo real
5. **PWA:** Transformar em Progressive Web App
6. **CI/CD:** Pipeline de deploy automatizado
7. **Notificações:** Push notifications para eventos
8. **Internacionalização:** Suporte a múltiplos idiomas

### 8.4 Impacto Esperado

O **Passa a Bola** tem potencial para:
- **Aumentar a visibilidade** de jogadoras talentosas
- **Facilitar a descoberta** de novos talentos
- **Centralizar informações** sobre peneiras e eventos
- **Fortalecer a comunidade** do futebol feminino
- **Democratizar oportunidades** no esporte

### 8.5 Agradecimentos

Agradecemos à **FIAP** e aos professores pelas disciplinas que tornaram este projeto possível:
- Front-end Design
- Web Development
- Computational Thinking with Python

---

## 📊 ESTATÍSTICAS DO PROJETO

| Métrica | Valor |
|---------|-------|
| **Linhas de Código (Frontend)** | ~3.500 |
| **Linhas de Código (Backend)** | ~1.800 |
| **Componentes React** | 15+ |
| **Rotas da API** | 15+ |
| **Páginas Frontend** | 7 |
| **Arquivos JSON** | 3 |
| **Tempo de Desenvolvimento** | ~80 horas |

---

## 📞 CONTATO

**Email:** contato@passabola.com  
**GitHub:** https://github.com/MuriloBezChleba/Sprint4--Passa-a-bola  
**LinkedIn:** [Calçada LTDA]

---

**Desenvolvido com 💚 por Calçada LTDA | FIAP - Sprint 4 - 2025**

