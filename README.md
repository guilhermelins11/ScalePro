# 📊 ScalePro

Sistema web para cadastro de microempresas (MEI), gerenciamento de produtos e serviços, com sistema de autenticação de usuários. Desenvolvido como projeto de portfólio; este README reúne todas as instruções e informações para executar e entender o sistema, com linguagem acessível.

## 🚀 Visão geral — o que o sistema faz

- Cadastro de empresas/usuários
- Lista e gerenciamento de itens (produtos) e serviços
- Registro e login de usuários com autenticação segura (JWT)
- Interface básica para painel interno (`geral.html`) protegida por autenticação

## 🛠 Tecnologias utilizadas

- Node.js + Express.js (servidor web)
- PostgreSQL (banco de dados)
- JWT (`jsonwebtoken`) para autenticação básica
- `bcryptjs` para hash de senhas
- `cookie-parser`, `express-session`, `connect-pg-simple` (suporte a sessão em Postgres)
- HTML, CSS e JavaScript no frontend

## O que foi implementado (resumo simples)

- Tabelas no banco:
  - `cadastro` — informações de empresas/razão social
  - `itens` — produtos
  - `servicos` — serviços
  - `usuarios` — conta de usuário com `username`, `password_hash`, `role` (admin/user)
- Registro e login de usuários. Senhas não são salvas em texto, são armazenadas como hash seguro.
- Geração de token JWT no login/registro; token enviado ao navegador em cookie HttpOnly.
- Proteção básica: `geral.html` (página interna) só abre para quem tem token válido.
- Página de registro: `Pages/register.html`.
- Botão de logout no menu interno (aponta para `/login/logout`).

## Estrutura principal de arquivos (onde procurar cada coisa)

- Frontend (páginas): `Pages/` — `entrar.html`, `register.html`, `cadastro.html`, `interno.html` (painel)
- Backend (servidor): `Scripts/` — `app.js`, `controllers/`, `Routes/`, `models/`
- Scripts SQL para criar tabelas: `db/` — `create_schema_*.sql` e `README_DB.md`
- Documentação final deste projeto: `README_FINAL.md` (igual ao conteúdo que você está vendo aqui)

## Instalação e execução (passo a passo, simples)

1) Instale o Node.js (versão LTS). Verifique com:
```powershell
node --version
```

2) Abra o PowerShell na pasta do projeto (onde está `package.json`).

3) Instale dependências:
```powershell
npm install
```

4) Defina variáveis de ambiente (substitua por valores fortes):
```powershell
$env:PGPASSWORD = 'SUA_SENHA_POSTGRES'
$env:JWT_SECRET = 'SUA_CHAVE_JWT_MUITO_FORTE'
$env:SESSION_SECRET = 'SUA_CHAVE_DE_SESSAO'
```

5) Criar bancos e aplicar tabelas (use os scripts em `db/`):
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

6) Iniciar o servidor (substitua se você usa outro comando):
```powershell
node Scripts/index.js
```

7) Testar no navegador:
- `http://localhost:PORT/register.html` — criar conta
- `http://localhost:PORT/entrar.html` — fazer login
- Após login você será redirecionado para `geral.html` se o token for válido
- Para sair: clicar em "Sair" no menu (chama `/login/logout`)

## Explicação simples do funcionamento

- Quando alguém se registra, criamos um registro no banco e salvamos uma versão segura da senha (hash).
- Quando alguém faz login e a senha confere, o servidor emite um token (JWT). Esse token prova que a pessoa está autenticada.
- O navegador guarda o token num cookie (arquivo temporário) e envia esse cookie ao servidor a cada requisição, permitindo acessar páginas protegidas.

## Segurança — o que já foi feito e recomendações

- Já feito:
  - Senhas armazenadas como hash (`bcryptjs`)
  - Token JWT usado para proteger páginas internas

- Recomendado antes de publicar no portfólio:
  - Usar HTTPS (TLS/SSL)
  - Guardar `JWT_SECRET` e `SESSION_SECRET` em variáveis de ambiente seguras (não subir no Git)
  - Ativar cookie `secure` em produção (`cookie: { secure: true }`)
  - Implementar proteção por função (`isAdmin`) para rotas administrativas

## Contato

- LinkedIn: http://linkedin.com/in/antony-lins-354b91290
- Email: contato.antonyguilherme@gmail.com

---

Se quiser, posso agora:
- adicionar middleware `isAdmin` para rotas administrativas, ou
- criar um README mais curto e visual para exibir no seu portfólio (guia do avaliador).

Obrigado — diga qual opção prefere que eu execute a seguir.
