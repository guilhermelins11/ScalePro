# Guia de Migração - Estrutura do Projeto

## ✅ Estrutura Criada

A pasta `src/` agora contém toda a lógica da aplicação:
- Controllers, Models, Routes, Middleware, Utils
- Config para banco de dados

A pasta `public/` agora contém todos os arquivos estáticos:
- HTML em `public/html/`
- CSS em `public/css/`
- JavaScript do cliente em `public/js/`

## 📋 Próximos Passos

### 1. Mover arquivos existentes

Você precisará mover (manualmente ou via terminal) os arquivos para a nova estrutura:

```bash
# Dentro da pasta c:\Users\guigl\ScalePro

# Mover arquivos de configuração para src/config/
move Scripts\config\*.js src\config\

# Mover controladores para src/controllers/
move Scripts\controllers\*.js src\controllers\

# Mover modelos para src/models/
move Scripts\models\*.js src\models\

# Mover rotas para src/routes/
move Scripts\Routes\*.js src\routes\

# Mover máscaras para src/utils/
move Scripts\masks\*.js src\utils\

# Mover server.js e app.js para src/
move Scripts\server.js src\
move Scripts\app.js src\

# Mover páginas HTML para public/html/
move Pages\*.html public\html\

# Mover estilos para public/css/
move Style\*.css public\css\

# Mover scripts do cliente para public/js/
move Scripts\main.js public\js\

# Mover banco de dados para db/
move db\create_*.sql db\schema\
move db\migrate_*.sql db\migrations\

# Mover testes para tests/
move test_*.js tests\
```

### 2. Atualizar imports no código

Após mover os arquivos, você precisará atualizar os imports em:

**src/server.js** (antes era Scripts/server.js):
```javascript
const authController = require('./controllers/authController');
const config = require('./config/dbCadMei');
// etc...
```

### 3. Configurar arquivo .env

Copie o `.env.example` para `.env` e preencha com suas configurações:

```bash
copy .env.example .env
```

### 4. Servir arquivos estáticos

No seu `src/server.js`, configure o Express para servir arquivos estáticos:

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rotas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

// ... resto do código
```

## 🏗️ Estrutura Final

```
ScalePro/
├── src/                    ← Todo código da aplicação
├── public/                 ← Arquivos estáticos (HTML, CSS, JS)
├── db/                     ← Scripts de banco de dados
├── tests/                  ← Testes automatizados
├── logs/                   ← Logs da aplicação
├── docs/                   ← Documentação
├── package.json            ← Atualizado
├── .env.example            ← Criado
├── .env                    ← Crie baseado no example
└── PROJECT_STRUCTURE.md    ← Documentação completa
```

## 🚀 Verificação

Após mover os arquivos, teste se tudo funciona:

```bash
npm install
npm run dev
```

Se houver erros de módulo não encontrado, verifique os imports nos arquivos movidos.

## 📝 Notas Importantes

- **Não delete as pastas antigas** até ter certeza de que tudo funciona
- **Atualize o .gitignore** se necessário
- **Commite as mudanças** após validar que tudo funciona
- A pasta `node_modules` e `node/` original podem ser deletadas se não forem necessárias

## 🆘 Troubleshooting

Se encontrar problemas:

1. Verifique se todos os `require()` estão com paths corretos
2. Teste um módulo de cada vez
3. Use `console.log(__dirname)` para debugar caminhos
4. Verifique que a pasta `logs/` está criada e tem permissão de escrita

---

Para mais detalhes, veja [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
