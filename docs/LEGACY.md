Arquivos legados e motivos
=========================

Este arquivo lista arquivos/diretórios identificados como legados, obsoletos ou que precisam de revisão, com justificativas e recomendações.

1) `Scripts/controllers/controllerLogin.js` (renomeado para `controllerLogin.legacy.js`)
- Motivo: não é referenciado por rotas ativas. A autenticação foi migrada para `Scripts/controllers/authController.js` que usa a tabela `usuarios` com `password_hash` e `bcryptjs`.
- Risco: manter ambos pode causar confusão e uso acidental do mecanismo inseguro.
- Ação tomada: arquivo original removido e versão legada adicionada em `controllerLogin.legacy.js` com instruções.

2) Coluna `senha` em `db/create_schema_cadastro_mei.sql`
- Motivo: esquema original armazenava senha em texto na tabela `cadastro`.
- Risco: armazenamento inseguro de senhas e ambiguidade com a tabela `usuarios`.
- Ação tomada: coluna `senha` removida do schema; comentários adicionados orientando a usar `usuarios` para autenticação.

3) `node/` e `nodemon/` (vendorizados na raiz)
- Motivo: cópias do runtime e de ferramentas estão no repositório em vez de serem instaladas via `npm`.
- Risco: aumentam tamanho do repositório, duplicam binários e confundem execução.
- Recomendação: remover essas pastas e usar `npm install` / `.gitignore`.

4) `package.json`
- Motivo: listava `node` como dependência e `postgres` junto com `pg`. `cookie-parser` estava em `optionalDependencies` mas é usado pelo código.
- Ação tomada: atualizei `package.json` para remover `node`/`postgres`, mover `cookie-parser` para `dependencies`, e adicionar scripts `start` e `dev`.

Recomendações adicionais
- Criar script de migração caso já existam senhas armazenadas em `cadastro`.
- Verificar histórico git (commits) antes de remover grandes diretórios para garantir que não há necessidade futura.
- Adicionar `.gitignore` para evitar commit de binários e dependências vendorizadas.

Se desejar, eu posso:
- Remover fisicamente `node/` e `nodemon/` (faço backup/arquivo antes),
- Criar script de migração para mover senhas (se existirem) para `usuarios` com hash,
- Atualizar `README.md` com o passo de limpeza e instruções para `npm install` e start.
