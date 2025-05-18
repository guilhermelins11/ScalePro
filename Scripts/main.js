const tiposPorCategoria = {
  "Moveis": ["Cama e Colchoes", "Sofás e Poltronas", "Bancos e Cadeiras", "Mesas", "Racks e Painés", "Outros"],
  "Serviços": ["Serviços domésticos", "Babá", "Eventos/Festas", "Reparação/Conserto/Reforma", "Informatica", "Tradução", "Turismo", "Outros"],
  "Eletro": ["Ar-condicionado", "Ventiladores e Climatizadores", "Geladeiras e Freezers", "Fogões e Fornos", "Eletroportáteis"],
  "Celulares e Telefonia": ["Celulares e Smartphones", "Acessórios de Celular", "Peças de Celular", "Smartwatches", "Outros"],
  "Áudio": ["Fones de Ouvido", "Microfones e Gravadores", "Equipamentos e Acessórios de Som", "Outros"],
  "Moda e Beleza": ["Beleza e Cuidado Pessoal", "Roupas", "Bolsas, malas e mochilas", "Outros"],
  "Animais de estimação": ["Acessórios para pets", "Cachorros", "Gatos", "Roedores", "Outros animais"]
};

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
  const match = [...document.querySelectorAll('.menu-item')].find(item => item.textContent.trim().toLowerCase().includes(id));
  if (match) match.classList.add('active');
}

function atualizarTipos(categoria) {
  const tipoSelect = document.getElementById("tipoSelect");
  tipoSelect.innerHTML = "";

  if (tiposPorCategoria[categoria]) {
    tiposPorCategoria[categoria].forEach(tipo => {
      const option = document.createElement("option");
      option.value = tipo;
      option.textContent = tipo;
      tipoSelect.appendChild(option);
    });
  } else {
    const option = document.createElement("option");
    option.textContent = "-- Selecione uma categoria primeiro --";
    tipoSelect.appendChild(option);
  }
}

function gerarId() {
  return Math.floor(Math.random() * 1000000000);
}

function adicionarProdutoNaTabela(produto) {
  const tbody = document.querySelector("#estoque tbody");
  const tr = document.createElement("tr");
  const receita = produto.valor - produto.gasto;

  tr.innerHTML = `
    <td>${produto.categoria}</td>
    <td>${produto.tipo}</td>
    <td>R$ ${produto.valor.toFixed(2)}</td>
    <td>R$ ${produto.gasto.toFixed(2)}</td>
    <td>R$ ${receita.toFixed(2)}</td>
  `;
  tbody.appendChild(tr);
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formProduto");
  if (form) {
    form.addEventListener("submit", function(event) {
      event.preventDefault();

      const produto = {
        id: gerarId(),
        categoria: document.getElementById("categoriaInput").value,
        tipo: document.getElementById("tipoSelect").value,
        valor: parseFloat(document.getElementById("valor").value),
        gasto: parseFloat(document.getElementById("gasto").value),
        responsavel: document.getElementById("responsavel").value
      };

      const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
      produtos.push(produto);
      localStorage.setItem("produtos", JSON.stringify(produtos));

      adicionarProdutoNaTabela(produto);
      showSection('estoque');
      form.reset();
      atualizarTipos(""); 
    });

 
    const produtosSalvos = JSON.parse(localStorage.getItem("produtos") || "[]");
    produtosSalvos.forEach(adicionarProdutoNaTabela);
  }
});

document.getElementById('btnAcessar').addEventListener('click', function(event) {
  event.preventDefault(); 
  window.location.href = 'interno.html'; 
});