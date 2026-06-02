# Estrutura do Projeto ScalePro

Este documento descreve a organização padronizada do projeto ScalePro, seguindo as melhores práticas de grandes projetos Node.js/Express.

## 📁 Estrutura de Diretórios

```
ScalePro/
├── src/                              # Código-fonte principal
│   ├── server.js                     # Arquivo de entrada da aplicação
│   ├── config/                       # Configurações da aplicação
│   │   ├── dbCadMei.js              # Configuração BD - Cadastro MEI
│   │   └── dbProd.js                # Configuração BD - Produtos
│   ├── controllers/                  # Controladores (lógica de negócio)
│   │   ├── authController.js        # Autenticação e autorização
│   │   ├── controllerCad.js         # Cadastro
│   │   ├── controllerItem.js        # Itens/Produtos
│   │   └── controllerServ.js        # Serviços
│   ├── models/                       # Modelos de dados
│   │   ├── modelCad.js              # Modelo Cadastro
│   │   ├── modelItem.js             # Modelo Item
│   │   └── modelServ.js             # Modelo Serviço
│   ├── routes/                       # Rotas da API
│   │   ├── routesAuth.js            # Rotas de autenticação
│   │   ├── routesCad.js             # Rotas de cadastro
│   │   ├── routesItem.js            # Rotas de itens
│   │   └── routesServ.js            # Rotas de serviços
│   ├── middleware/                   # Middlewares customizados
│   │   ├── authMiddleware.js        # Autenticação de requisições
│   │   ├── errorHandler.js          # Tratamento de erros
│   │   └── validators.js            # Validações de dados
│   ├── utils/                        # Utilitários e helpers
│   │   ├── maskCNPJ.js              # Máscara CNPJ
│   │   ├── maskTel.js               # Máscara Telefone
│   │   └── helpers.js               # Funções auxiliares
│   └── masks/                        # Máscaras de dados (pode ser em utils)
│
├── public/                           # Arquivos estáticos
│   ├── html/                         # Páginas HTML
│   │   ├── index.html               # Página inicial
│   │   ├── entrar.html              # Login
│   │   ├── register.html            # Registro
│   │   ├── cadastro.html            # Cadastro
│   │   └── interno.html             # Área interna
│   ├── css/                          # Estilos CSS
│   │   ├── index.css
│   │   ├── entrar.css
│   │   └── interno.css
│   └── js/                           # JavaScript do cliente
│       ├── main.js                  # Script principal
│       └── app.js                   # Lógica da aplicação
│
├── db/                               # Banco de dados
│   ├── schema/                       # Schemas do banco
│   │   ├── create_schema_usuarios.sql
│   │   ├── create_schema_session.sql
│   │   ├── create_schema_cadastro_mei.sql
│   │   └── create_schema_produtos.sql
│   └── migrations/                   # Scripts de migração
│       ├── migrate_cadastro_com_backup.sql
│       └── migrate_cadastro_remove_senha.sql
│
├── tests/                            # Testes automatizados
│   ├── test_endpoints.js            # Testes de endpoints
│   └── test_advanced.js             # Testes avançados
│
├── docs/                             # Documentação
│   ├── LEGACY.md
│   ├── PROJECT_STRUCTURE.md         # Este arquivo
│   └── [outros documentos]
│
├── logs/                             # Logs da aplicação
│   └── .gitkeep                     # Placeholder (pasta vazia)
│
├── package.json                      # Dependências do projeto
├── .env.example                      # Exemplo de variáveis de ambiente
├── .gitignore                        # Git ignore
└── README.md                         # Documentação principal
```

## 🔍 Descrição das Pastas

### `/src` - Código-Fonte
A pasta raiz contém todo o código da aplicação. É separada dos arquivos estáticos para melhor organização.

- **config/**: Arquivos de configuração de banco de dados e variáveis de ambiente
- **controllers/**: Controladores que contêm a lógica de negócio
- **models/**: Modelos que representam a estrutura dos dados
- **routes/**: Definição das rotas da API REST
- **middleware/**: Funções executadas antes dos controllers
- **utils/**: Funções auxiliares reutilizáveis
- **masks/**: Máscaras para formatação de dados (telefone, CNPJ, etc.)

### `/public` - Arquivos Estáticos
Contém todos os arquivos servidos diretamente ao navegador.

- **html/**: Páginas HTML da aplicação
- **css/**: Arquivos de estilo
- **js/**: Scripts JavaScript do lado do cliente

### `/db` - Banco de Dados
Scripts e estrutura do banco de dados.

- **schema/**: Criação das tabelas e estrutura
- **migrations/**: Scripts para alterar a estrutura do BD

### `/tests` - Testes
Testes automatizados da aplicação.

### `/docs` - Documentação
Documentação técnica e guias do projeto.

### `/logs` - Logs
Arquivos de log da aplicação (não versionados).

## 🚀 Como Usar

### Iniciar o servidor em desenvolvimento:
```bash
npm run dev
```

### Iniciar o servidor em produção:
```bash
npm start
```

### Executar testes:
```bash
npm test
```

## 📝 Convenções de Código

1. **Nomes de arquivos**: Use kebab-case para nomes de arquivo (ex: `auth-controller.js`)
2. **Variáveis de Ambiente**: Configure um arquivo `.env` baseado em `.env.example`
3. **Imports**: Sempre use paths relativos do `src/`
4. **Controllers**: Devem conter apenas lógica de negócio, não queries SQL diretas
5. **Routes**: Apenas definições de rota e chamadas de controller

## 🔐 Segurança

- Nunca commitar `.env` com dados sensíveis
- Use `.env.example` como template
- Validar sempre os dados de entrada
- Usar middlewares de autenticação nas rotas protegidas

## 📚 Referências

- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Node.js Project Structure](https://www.digitalocean.com/community/tutorials/how-to-structure-a-node-js-project)
