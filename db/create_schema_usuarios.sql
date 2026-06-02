    -- Schema para a tabela de usuários de autenticação
    -- Essa tabela fica no banco `cadastro_mei` por conveniência (pode ser movida para outro DB)

    CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user', -- 'admin' ou 'user'
        cadastro_id INTEGER REFERENCES cadastro(id) ON DELETE SET NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS idx_usuarios_username ON usuarios(username);
