# Projeto final

**Disciplina:** Desenvolvedor Front-end
**Professor:** Reinaldo de Souza Junior

---

### 👥 Alunos
| Nome | Matrícula |
|-|-|
| **Carlos Henrique Silva Bispo Rodrigues** | 2025200222 |
| **Lucas Rodrigues Porto** | 2025200247 |
---
# 🚀 Sistema de Gerenciamento de Conteúdo Pessoal Dinâmico - SGCPD

O **SGCPD** é uma plataforma para organização e gestão de conteúdo. Permite que usuários criem, categorizem e acessem seus materiais de forma dinâmica através de uma interface moderna com sistema de tags e visualizações customizáveis.  

## 📋 Pré-requisitos

- Node (express, live-server)
- Docker
- Docker Compose  

## 🛠 Configuração do Ambiente

### 1. Inicialização do banco de dados (PostgreSQL)

## Passo 1: Configuração do Banco de Dados com Docker

Usaremos o `docker-compose.yml` 

**1.1. Estrutura de Arquivos:**

Certifique-se de que a estrutura do projeto inclua os seguintes arquivos na pasta raiz:

	├── docker-compose.yml (Configuração do container PostgreSQL)
	└── init-db\init.sql (Script para criar o banco de dados e tabelas)`

**Passo 1:** Inicialização do Container:
`docker-compose up -d`

Este comando fará o seguinte:
-   Baixará a imagem do **PostgreSQL**.
-   Criará um container chamado `sgcpd_db`.
-   Mapeará a porta `5435` da máquina (Host) para a porta interna `5432` do container.
-   Executará automaticamente o script **`init.sql`**, que cria o banco de dados, o schema e as tabelas com os dados iniciais.

  
## Passo 2: Conexão e inicialização do Backend

Após o Docker estar rodando, o serviço de Backend (Node.js) deve usar as seguintes credenciais para se conectar ao banco de dados:

**Host**: `localhost` (ou `sgcpd_db` se estiver em outro container Docker)
**Porta**: `5435` (A porta no Host que o Docker está usando)
**Usuário**: `postgres`
**Senha**: `postgres`
**Banco de Dados**: `sgcpd_db`

Certifique-se de que esteja no diretório backend:
**Passo 1:** Inicialização do backend: `npm install && npm start` 

## Passo 3: Build e Execução do Frontend (HTML/CSS/JS)

O Frontend (os arquivos HTML/CSS/JS)

Certifique-se de que esteja no diretório frontend:
**Passo 1:** Inicialização do frontend: `npm install && npm start` 