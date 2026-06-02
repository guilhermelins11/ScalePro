-- Script de migração: remover coluna `senha` da tabela `cadastro`
-- Motivo: senhas agora são armazenadas em `usuarios` com hash bcrypt
-- Data: 31 de maio de 2026

-- AVISO: Este script DROPA a tabela antiga e a recria sem a coluna `senha`.
-- Se você tem dados que precisa preservar, faça backup antes de executar!

-- Passo 1: Remover restrições de chave estrangeira (se houver em outras tabelas)
-- (caso não haja FK de outras tabelas para cadastro.id, pule isto)

-- Passo 2: Dropa a tabela antiga (com todos seus dados)
DROP TABLE IF EXISTS cadastro CASCADE;

-- Passo 3: Recriar a tabela com o novo schema (sem a coluna senha)
CREATE TABLE IF NOT EXISTS cadastro (
    id SERIAL PRIMARY KEY,
    razao_social VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    telefone VARCHAR(50)
);

-- Passo 4: Criar índice para buscas rápidas
CREATE INDEX IF NOT EXISTS idx_cadastro_razao_social ON cadastro (razao_social);

-- Passo 5: Confirmar que a tabela foi recriada com sucesso
SELECT 'Tabela cadastro recriada com sucesso!' AS mensagem;
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'cadastro' AND table_schema = 'public' 
ORDER BY ordinal_position;
