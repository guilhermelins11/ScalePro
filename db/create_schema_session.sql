-- Schema para a tabela de sessões usado por connect-pg-simple (express-session)
-- Esta tabela armazena sessões de usuários em produção/desenvolvimento
-- quando express-session é configurado com PgSession

CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL,
  PRIMARY KEY ("sid")
)
WITH (OIDS=FALSE);

-- Índice para limpeza automática de sessões expiradas
CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
