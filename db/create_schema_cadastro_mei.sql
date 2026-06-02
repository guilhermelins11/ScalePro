-- Schema para o banco cadastro_mei
-- Cria a tabela de cadastro usada pela aplicação

CREATE TABLE IF NOT EXISTS cadastro (
    id SERIAL PRIMARY KEY,
    razao_social VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    telefone VARCHAR(50)
);

-- Índice para busca por razao_social se necessário
-- Observação: anteriormente havia uma coluna `senha` nesta tabela.
-- As senhas agora devem ser armazenadas na tabela `usuarios` como hashes.
CREATE INDEX IF NOT EXISTS idx_cadastro_razao_social ON cadastro (razao_social);
