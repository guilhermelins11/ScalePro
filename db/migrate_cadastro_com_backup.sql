-- Script de migração SEGURA com backup: remover coluna `senha` da tabela `cadastro`
-- Motivo: senhas agora são armazenadas em `usuarios` com hash bcrypt
-- Data: 31 de maio de 2026

-- PASSO 1: Criar tabela de backup com os dados antigos
CREATE TABLE IF NOT EXISTS cadastro_backup AS
SELECT * FROM cadastro;

-- PASSO 2: Mensagem de confirmação
DO $$
BEGIN
    RAISE NOTICE 'Backup criado em "cadastro_backup". Dados originais preservados.';
END $$;

-- PASSO 3: Remover FK se houver em outras tabelas (exemplo: usuarios.cadastro_id referencia cadastro.id)
-- Verificar se há constraint e remover temporariamente
ALTER TABLE usuarios DROP CONSTRAINT IF EXISTS usuarios_cadastro_id_fkey;

-- PASSO 4: Dropa a tabela antiga
DROP TABLE IF EXISTS cadastro;

-- PASSO 5: Recriar a tabela com o novo schema (sem a coluna senha)
CREATE TABLE cadastro (
    id SERIAL PRIMARY KEY,
    razao_social VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    telefone VARCHAR(50)
);

-- PASSO 6: Restaurar a constraint de FK em usuarios
ALTER TABLE usuarios 
ADD CONSTRAINT usuarios_cadastro_id_fkey 
FOREIGN KEY (cadastro_id) REFERENCES cadastro(id) ON DELETE SET NULL;

-- PASSO 7: Criar índice para buscas rápidas
CREATE INDEX IF NOT EXISTS idx_cadastro_razao_social ON cadastro (razao_social);

-- PASSO 8: Confirmar sucesso
DO $$
BEGIN
    RAISE NOTICE 'Migração concluída com sucesso!';
    RAISE NOTICE 'Tabela cadastro recriada sem a coluna senha.';
    RAISE NOTICE 'Backup disponível em: cadastro_backup';
END $$;

-- PASSO 9: Listar estrutura da nova tabela
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'cadastro' 
ORDER BY ordinal_position;
