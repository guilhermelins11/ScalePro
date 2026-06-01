/**
 * Script de teste completo dos endpoints principais
 * Testa: Registro, Login, Rotas protegidas, Cadastro MEI
 */

const http = require('http');
const querystring = require('querystring');

const BASE_URL = 'http://localhost:3000';
let authToken = null;
let testResults = [];

// Cores para output no console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(type, message) {
  const timestamp = new Date().toLocaleTimeString('pt-BR');
  switch(type) {
    case 'success':
      console.log(`${colors.green}✓${colors.reset} [${timestamp}] ${message}`);
      break;
    case 'error':
      console.log(`${colors.red}✗${colors.reset} [${timestamp}] ${message}`);
      break;
    case 'info':
      console.log(`${colors.blue}ℹ${colors.reset} [${timestamp}] ${message}`);
      break;
    case 'test':
      console.log(`\n${colors.cyan}━━━ TESTE: ${message} ━━━${colors.reset}`);
      break;
  }
}

// Função para fazer requisições HTTP
function makeRequest(method, path, data = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headers
      }
    };

    if (data) {
      const postData = querystring.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: body,
          cookies: res.headers['set-cookie'] || []
        });
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(querystring.stringify(data));
    }
    req.end();
  });
}

// Extrair token JWT do cookie
function extractToken(cookies) {
  for (const cookie of cookies) {
    if (cookie.includes('token=')) {
      const tokenPart = cookie.split('; ')[0];
      const token = tokenPart.split('=')[1];
      return token;
    }
  }
  return null;
}

// TESTES
async function runTests() {
  console.log(`\n${colors.yellow}╔════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.yellow}║   TESTES DE ENDPOINTS - ScalePro       ║${colors.reset}`);
  console.log(`${colors.yellow}╚════════════════════════════════════════╝${colors.reset}\n`);

  try {
    // TESTE 1: Registro de usuário
    log('test', 'REGISTRO DE USUÁRIO');
    const registerData = {
      username: 'teste_usuario',
      senha: 'senha123',
      role: 'user'
    };
    
    let res = await makeRequest('POST', '/auth/register', registerData);
    if (res.status === 302 || res.status === 200 || res.body.includes('sucesso')) {
      log('success', `Registro bem-sucedido (HTTP ${res.status})`);
      testResults.push({ test: 'Registro de Usuário', status: 'PASSOU' });
    } else {
      log('error', `Falha no registro (HTTP ${res.status}): ${res.body.substring(0, 100)}`);
      testResults.push({ test: 'Registro de Usuário', status: 'FALHOU' });
    }

    // TESTE 2: Login
    log('test', 'LOGIN DE USUÁRIO');
    const loginData = {
      username: 'teste_usuario',
      senha: 'senha123'
    };
    
    res = await makeRequest('POST', '/login', loginData);
    authToken = extractToken(res.cookies);
    
    if (authToken || res.status === 302 || res.body.includes('sucesso')) {
      log('success', `Login bem-sucedido (HTTP ${res.status})`);
      if (authToken) {
        log('info', `Token JWT extraído: ${authToken.substring(0, 20)}...`);
      }
      testResults.push({ test: 'Login de Usuário', status: 'PASSOU' });
    } else {
      log('error', `Falha no login (HTTP ${res.status}): ${res.body.substring(0, 100)}`);
      testResults.push({ test: 'Login de Usuário', status: 'FALHOU' });
    }

    // TESTE 3: Acesso a rota protegida
    log('test', 'ACESSO A ROTA PROTEGIDA (/geral.html)');
    const headers = authToken ? { 'Cookie': `token=${authToken}` } : {};
    res = await makeRequest('GET', '/geral.html', null, headers);
    
    if (res.status === 200) {
      log('success', `Acesso permitido à rota protegida (HTTP ${res.status})`);
      testResults.push({ test: 'Acesso Rota Protegida', status: 'PASSOU' });
    } else if (res.status === 302 || res.status === 401) {
      log('error', `Acesso negado - redirecionado (HTTP ${res.status}). Possível falta de token.`);
      testResults.push({ test: 'Acesso Rota Protegida', status: 'FALHOU' });
    } else {
      log('error', `Erro inesperado (HTTP ${res.status})`);
      testResults.push({ test: 'Acesso Rota Protegida', status: 'FALHOU' });
    }

    // TESTE 4: Cadastro MEI (empresa)
    log('test', 'CADASTRO DE EMPRESA (MEI)');
    const cadastroData = {
      razao_social: 'Empresa Teste LTDA',
      cnpj: '12345678000195',
      telefone: '(11) 98765-4321'
    };
    
    res = await makeRequest('POST', '/cadastro_mei', cadastroData);
    if (res.status === 302 || res.status === 200 || res.body.includes('sucesso') || res.body.includes('Cadastro')) {
      log('success', `Cadastro MEI bem-sucedido (HTTP ${res.status})`);
      testResults.push({ test: 'Cadastro MEI', status: 'PASSOU' });
    } else {
      log('error', `Falha no cadastro MEI (HTTP ${res.status}): ${res.body.substring(0, 150)}`);
      testResults.push({ test: 'Cadastro MEI', status: 'FALHOU' });
    }

    // TESTE 5: Listar produtos/itens
    log('test', 'ACESSO À ROTA DE PRODUTOS');
    res = await makeRequest('GET', '/produtos', null, headers);
    if (res.status === 200) {
      log('success', `Rota de produtos acessível (HTTP ${res.status})`);
      testResults.push({ test: 'Listar Produtos', status: 'PASSOU' });
    } else {
      log('error', `Falha ao acessar produtos (HTTP ${res.status})`);
      testResults.push({ test: 'Listar Produtos', status: 'FALHOU' });
    }

    // TESTE 6: Listar serviços
    log('test', 'ACESSO À ROTA DE SERVIÇOS');
    res = await makeRequest('GET', '/servicos', null, headers);
    if (res.status === 200) {
      log('success', `Rota de serviços acessível (HTTP ${res.status})`);
      testResults.push({ test: 'Listar Serviços', status: 'PASSOU' });
    } else {
      log('error', `Falha ao acessar serviços (HTTP ${res.status})`);
      testResults.push({ test: 'Listar Serviços', status: 'FALHOU' });
    }

  } catch (error) {
    log('error', `Erro durante testes: ${error.message}`);
  }

  // RESUMO FINAL
  console.log(`\n${colors.yellow}╔════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.yellow}║   RESUMO DE TESTES                      ║${colors.reset}`);
  console.log(`${colors.yellow}╚════════════════════════════════════════╝${colors.reset}\n`);

  let passed = 0;
  let failed = 0;

  testResults.forEach(result => {
    if (result.status === 'PASSOU') {
      console.log(`${colors.green}✓${colors.reset} ${result.test}: ${colors.green}${result.status}${colors.reset}`);
      passed++;
    } else {
      console.log(`${colors.red}✗${colors.reset} ${result.test}: ${colors.red}${result.status}${colors.reset}`);
      failed++;
    }
  });

  console.log(`\n${colors.cyan}Total: ${testResults.length} | Passou: ${colors.green}${passed}${colors.reset} | Falhou: ${colors.red}${failed}${colors.reset}`);
  console.log(`Taxa de sucesso: ${colors.yellow}${((passed / testResults.length) * 100).toFixed(1)}%${colors.reset}\n`);

  process.exit(0);
}

// Aguardar 2 segundos para garantir que servidor está pronto
setTimeout(runTests, 2000);
