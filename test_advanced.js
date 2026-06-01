/**
 * Testes Avançados - Validação de Dados e Segurança
 */

const http = require('http');
const querystring = require('querystring');

const BASE_URL = 'http://localhost:3000';
let testResults = [];

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

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
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({
        status: res.statusCode,
        body: body,
        cookies: res.headers['set-cookie'] || []
      }));
    });

    req.on('error', reject);
    if (data) req.write(querystring.stringify(data));
    req.end();
  });
}

async function runTests() {
  console.log(`\n${colors.yellow}╔════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.yellow}║   TESTES AVANÇADOS - Validação & Segurança     ║${colors.reset}`);
  console.log(`${colors.yellow}╚════════════════════════════════════════════════╝${colors.reset}\n`);

  try {
    // TESTE 1: Validar CNPJ duplicado
    console.log(`${colors.cyan}📋 TESTE 1: Validação de CNPJ Duplicado${colors.reset}`);
    const cadastro1 = {
      razao_social: 'Empresa A',
      cnpj: '11111111000181',
      telefone: '(11) 1111-1111'
    };
    
    let res = await makeRequest('POST', '/cadastro_mei', cadastro1);
    console.log(`  └─ Primeiro cadastro: HTTP ${res.status} ${colors.green}✓${colors.reset}`);
    testResults.push({ test: 'CNPJ Único - Primeiro', status: res.status === 302 ? 'PASSOU' : 'FALHOU' });

    const cadastro2 = {
      razao_social: 'Empresa B',
      cnpj: '11111111000181', // mesmo CNPJ
      telefone: '(11) 2222-2222'
    };
    
    res = await makeRequest('POST', '/cadastro_mei', cadastro2);
    const isDuplicateError = res.status !== 302 || res.body.includes('exist') || res.body.includes('duplicate');
    console.log(`  └─ Segundo cadastro (duplicado): HTTP ${res.status} ${isDuplicateError ? colors.green + '✓' : colors.red + '✗'}${colors.reset}`);
    testResults.push({ test: 'CNPJ Duplicado - Rejeição', status: isDuplicateError ? 'PASSOU' : 'FALHOU' });

    // TESTE 2: Validar username duplicado
    console.log(`\n${colors.cyan}📋 TESTE 2: Validação de Username Duplicado${colors.reset}`);
    const user1 = {
      username: 'usuario_unico',
      senha: 'senha123',
      role: 'user'
    };
    
    res = await makeRequest('POST', '/auth/register', user1);
    console.log(`  └─ Primeiro registro: HTTP ${res.status} ${colors.green}✓${colors.reset}`);
    testResults.push({ test: 'Username Único - Primeiro', status: res.status === 302 ? 'PASSOU' : 'FALHOU' });

    const user2 = {
      username: 'usuario_unico', // mesmo username
      senha: 'outrasenha',
      role: 'user'
    };
    
    res = await makeRequest('POST', '/auth/register', user2);
    const isUserDuplicate = res.status !== 302 || res.body.includes('exist') || res.body.includes('duplicate');
    console.log(`  └─ Segundo registro (duplicado): HTTP ${res.status} ${isUserDuplicate ? colors.green + '✓' : colors.red + '✗'}${colors.reset}`);
    testResults.push({ test: 'Username Duplicado - Rejeição', status: isUserDuplicate ? 'PASSOU' : 'FALHOU' });

    // TESTE 3: Login com credenciais erradas
    console.log(`\n${colors.cyan}📋 TESTE 3: Validação de Login (Senha Incorreta)${colors.reset}`);
    const loginFalho = {
      username: 'usuario_unico',
      senha: 'senha_errada'
    };
    
    res = await makeRequest('POST', '/login', loginFalho);
    const isLoginRejected = res.status !== 302 || !res.cookies.some(c => c.includes('token='));
    console.log(`  └─ Login com senha errada: HTTP ${res.status} ${isLoginRejected ? colors.green + '✓' : colors.red + '✗'}${colors.reset}`);
    testResults.push({ test: 'Login Senha Incorreta', status: isLoginRejected ? 'PASSOU' : 'FALHOU' });

    // TESTE 4: Verificar dados sensiveis NO BANCO
    console.log(`\n${colors.cyan}📋 TESTE 4: Verificar Segurança no Banco${colors.reset}`);
    console.log(`  └─ Verificando se há coluna 'senha' na tabela 'cadastro': `);
    
    const { exec } = require('child_process');
    const resultado = await new Promise((resolve) => {
      exec(
        `$env:PGPASSWORD = '123456'; & 'C:\\Program Files\\PostgreSQL\\17\\bin\\psql.exe' -U postgres -h localhost -p 5432 -d cadastro_mei -c "SELECT column_name FROM information_schema.columns WHERE table_name='cadastro';" `,
        (error, stdout, stderr) => {
          resolve(stdout + stderr);
        }
      );
    });

    const temSenha = resultado.includes('senha');
    console.log(`     ${temSenha ? colors.red + '✗ AVISO: Coluna senha encontrada!' : colors.green + '✓ Nenhuma coluna senha'}${colors.reset}`);
    testResults.push({ test: 'Tabela cadastro sem senha', status: !temSenha ? 'PASSOU' : 'FALHOU' });

    // TESTE 5: Validar campos obrigatórios
    console.log(`\n${colors.cyan}📋 TESTE 5: Validação de Campos Obrigatórios${colors.reset}`);
    const cadastroIncompleto = {
      razao_social: 'Empresa Teste',
      // cnpj ausente
      telefone: '(11) 3333-3333'
    };
    
    res = await makeRequest('POST', '/cadastro_mei', cadastroIncompleto);
    const isValidationError = res.status !== 302;
    console.log(`  └─ Cadastro sem CNPJ: HTTP ${res.status} ${isValidationError ? colors.green + '✓' : colors.red + '✗'}${colors.reset}`);
    testResults.push({ test: 'Validação Campo CNPJ', status: isValidationError ? 'PASSOU' : 'FALHOU' });

  } catch (error) {
    console.log(`${colors.red}✗ Erro: ${error.message}${colors.reset}`);
  }

  // RESUMO FINAL
  console.log(`\n${colors.yellow}╔════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.yellow}║   RESUMO DE TESTES AVANÇADOS                    ║${colors.reset}`);
  console.log(`${colors.yellow}╚════════════════════════════════════════════════╝${colors.reset}\n`);

  let passed = 0;
  let failed = 0;

  testResults.forEach((result, idx) => {
    const icon = result.status === 'PASSOU' ? colors.green + '✓' : colors.red + '✗';
    const status = result.status === 'PASSOU' ? colors.green + result.status : colors.red + result.status;
    console.log(`${icon}${colors.reset} ${idx + 1}. ${result.test}: ${status}${colors.reset}`);
    if (result.status === 'PASSOU') passed++;
    else failed++;
  });

  console.log(`\n${colors.cyan}Resumo:${colors.reset} Total=${testResults.length} | ${colors.green}Passou=${passed}${colors.reset} | ${colors.red}Falhou=${failed}${colors.reset}`);
  console.log(`Taxa: ${colors.yellow}${((passed / testResults.length) * 100).toFixed(1)}%${colors.reset}\n`);

  process.exit(0);
}

setTimeout(runTests, 1000);
