-- Schema para o banco produtos
-- Cria as tabelas itens e servicos utilizadas pela aplicação

CREATE TABLE IF NOT EXISTS itens (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    categoria VARCHAR(100),
    tipo VARCHAR(100),
    valor NUMERIC(12,2),
    gasto NUMERIC(12,2),
    quantidade INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS servicos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    valor NUMERIC(12,2),
    categoria VARCHAR(100)
);
