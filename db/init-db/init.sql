-----------------------------------------------------------
-- 1. Criação do SCHEMA
-----------------------------------------------------------
CREATE SCHEMA IF NOT EXISTS sgcpd_schema;

SET search_path TO sgcpd_schema;

-----------------------------------------------------------
-- 2. Tabela USUARIOS
-----------------------------------------------------------
CREATE TABLE IF NOT EXISTS sgcpd_schema.usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

GRANT ALL PRIVILEGES ON TABLE sgcpd_schema.usuarios TO postgres;
GRANT USAGE, SELECT ON SEQUENCE sgcpd_schema.usuarios_id_seq TO postgres;

-----------------------------------------------------------
-- 3. Tabela CATEGORIAS: Categorização/Tags
-----------------------------------------------------------
CREATE TABLE IF NOT EXISTS sgcpd_schema.categorias (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) UNIQUE NOT NULL,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

GRANT ALL PRIVILEGES ON TABLE sgcpd_schema.categorias TO postgres;
GRANT USAGE, SELECT ON SEQUENCE sgcpd_schema.categorias_id_seq TO postgres;

-----------------------------------------------------------
-- 4. Tabela NOTAS: CRUD de Conteúdo e Status
-----------------------------------------------------------
CREATE TABLE IF NOT EXISTS sgcpd_schema.notas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    conteudo TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Pendente', -- Pendente, Em Andamento, Concluído
    usuario_id INTEGER NOT NULL REFERENCES sgcpd_schema.usuarios(id) ON DELETE CASCADE,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

GRANT ALL PRIVILEGES ON TABLE sgcpd_schema.notas TO postgres;
GRANT USAGE, SELECT ON SEQUENCE sgcpd_schema.notas_id_seq TO postgres;

-----------------------------------------------------------
-- 5. Tabela NOTAS_CATEGORIAS (Muitos para Muitos)
-----------------------------------------------------------
CREATE TABLE IF NOT EXISTS sgcpd_schema.notas_categorias (
    nota_id INTEGER NOT NULL REFERENCES sgcpd_schema.notas(id) ON DELETE CASCADE,
    categoria_id INTEGER NOT NULL REFERENCES sgcpd_schema.categorias(id) ON DELETE CASCADE,
    PRIMARY KEY (nota_id, categoria_id)
);

GRANT ALL PRIVILEGES ON TABLE sgcpd_schema.notas_categorias TO postgres;

-----------------------------------------------------------
-- 6. Funções e Triggers: Atualização Automática de Data
-----------------------------------------------------------
CREATE OR REPLACE FUNCTION atualizar_data_modificacao()
RETURNS TRIGGER AS $$
BEGIN
   NEW.data_atualizacao = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS tr_notas_data_atualizacao ON sgcpd_schema.notas;
CREATE TRIGGER tr_notas_data_atualizacao
BEFORE UPDATE ON sgcpd_schema.notas
FOR EACH ROW
EXECUTE PROCEDURE atualizar_data_modificacao();

-----------------------------------------------------------
-- 7. INSERTS (Dados Iniciais)
-----------------------------------------------------------

-- 7.1. Inserir Usuário de Teste
INSERT INTO sgcpd_schema.usuarios (nome, email, senha_hash) VALUES
('Usuário Teste SGCPD', 'teste@sgcpd.com', 'hash_exemplo_123')
ON CONFLICT (email) DO NOTHING; -- Evita erro se rodar o script mais de uma vez

-- 7.2. Inserir Categorias Iniciais (se não existirem)
INSERT INTO sgcpd_schema.categorias (nome) VALUES
('Projeto'), ('Pessoal'), ('Estudo'), ('Trabalho'), ('Financeiro')
ON CONFLICT (nome) DO NOTHING;

DO $$
DECLARE
    user_id_val INTEGER := (SELECT id FROM sgcpd_schema.usuarios WHERE email = 'teste@sgcpd.com');
    cat_projeto_id INTEGER := (SELECT id FROM sgcpd_schema.categorias WHERE nome = 'Projeto');
    cat_estudo_id INTEGER := (SELECT id FROM sgcpd_schema.categorias WHERE nome = 'Estudo');
    cat_trabalho_id INTEGER := (SELECT id FROM sgcpd_schema.categorias WHERE nome = 'Trabalho');
    nota_pendente_id INTEGER;
    nota_andamento_id INTEGER;
    nota_concluido_id INTEGER;
BEGIN
    IF user_id_val IS NOT NULL THEN
        -- 7.3. Inserir Notas de Exemplo

        -- Nota Pendente
        INSERT INTO sgcpd_schema.notas (titulo, conteudo, status, usuario_id) VALUES
        ('Ideias de Backend (CRUD)', 'Implementar APIs para criação, leitura, atualização e exclusão de notas...', 'Pendente', user_id_val)
        RETURNING id INTO nota_pendente_id;

        -- Nota Em Andamento
        INSERT INTO sgcpd_schema.notas (titulo, conteudo, status, usuario_id) VALUES
        ('Planejamento do Projeto Final', 'Revisar requisitos funcionais e não funcionais, design responsivo, e finalizar o Canvas.', 'Em Andamento', user_id_val)
        RETURNING id INTO nota_andamento_id;

        -- Nota Concluída
        INSERT INTO sgcpd_schema.notas (titulo, conteudo, status, usuario_id) VALUES
        ('Reunião de Grupo', 'Discutir a divisão de tarefas, definir prazos e revisar o protótipo da Entrega 1.', 'Concluído', user_id_val)
        RETURNING id INTO nota_concluido_id;

        -- 7.4. Vínculo Notas e Categorias

        -- Ideias de Backend -> Projeto
        INSERT INTO sgcpd_schema.notas_categorias (nota_id, categoria_id) VALUES
        (nota_pendente_id, cat_projeto_id);

        -- Planejamento -> Estudo
        INSERT INTO sgcpd_schema.notas_categorias (nota_id, categoria_id) VALUES
        (nota_andamento_id, cat_estudo_id);

        -- Reunião de Grupo -> Trabalho
        INSERT INTO sgcpd_schema.notas_categorias (nota_id, categoria_id) VALUES
        (nota_concluido_id, cat_trabalho_id);

    END IF;
END $$;