# Instruções para criar bancos e aplicar schemas (PostgreSQL)

Este diretório contém os scripts SQL para criar as tabelas usadas pela aplicação.

Arquivos:
- `create_schema_cadastro_mei.sql` — cria a tabela `cadastro` (banco `cadastro_mei`).
- `create_schema_produtos.sql` — cria as tabelas `itens` e `servicos` (banco `produtos`).
- `create_schema_usuarios.sql` — cria a tabela `usuarios` (banco `cadastro_mei`).
- `create_schema_session.sql` — cria a tabela `session` para armazenar sessões (banco `cadastro_mei`).

Recomendações de execução (PowerShell):

1) Exporte a senha do usuário `postgres` (substitua pela sua senha):

```powershell
$env:PGPASSWORD = '123456'
```

2) Crie os bancos (se ainda não existirem) e aplique os scripts:

```powershell
# criar bancos (executar uma vez)
psql -U postgres -h localhost -p 5432 -d postgres -c "CREATE DATABASE cadastro_mei;"
psql -U postgres -h localhost -p 5432 -d postgres -c "CREATE DATABASE produtos;"

# aplicar schemas
psql -U postgres -h localhost -p 5432 -d cadastro_mei -f db/create_schema_cadastro_mei.sql
psql -U postgres -h localhost -p 5432 -d cadastro_mei -f db/create_schema_usuarios.sql
psql -U postgres -h localhost -p 5432 -d cadastro_mei -f db/create_schema_session.sql
psql -U postgres -h localhost -p 5432 -d produtos -f db/create_schema_produtos.sql
```

Substitua `postgres`, `localhost`, `5432` e a senha conforme seu ambiente.

Observações:
- Os nomes de colunas foram criados em minúsculas (`razao_social`, `cnpj`, `telefone`, `senha`) para compatibilidade com o código (o driver `pg` converte identificadores não entre aspas para letras minúsculas).
- A tabela `session` é criada automaticamente pelo `connect-pg-simple` na primeira execução, mas se houver erro "relação 'session' não existe", execute manualmente: `psql -U postgres -h localhost -p 5432 -d cadastro_mei -f db/create_schema_session.sql`
- Não armazene senhas em texto simples em produção; use hashing (bcrypt) e TLS.
 - Para segurança com JWT: defina a variável de ambiente `JWT_SECRET` com um segredo longo antes de iniciar a aplicação:

```powershell
$env:JWT_SECRET = 'uma_chave_muito_forte_aqui'
```