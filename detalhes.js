const URL_API_DETALHES = "URL_DA_SUA_API/produtos"; // Mesma base da API

async function carregarDetalhesProduto() {
  // Captura o ID da URL (ex: detalhes.html?id=12345)
  const parametrosURL = new URLSearchParams(window.location.search);
  const produtoId = parametrosURL.get("id");

  const containerDetalhes = document.querySelector("#detalhes-container");

  if (!produtoId) {
    containerDetalhes.innerHTML = "<p>Produto não encontrado.</p>";
    return;
  }

  try {
    // Faz a consulta buscando pelo ID específico (conforme padrão comum de APIs REST: /produtos/id)
    const resposta = await fetch(`${URL_API_DETALHES}/${produtoId}`);
    const produto = await resposta.json();

    // Renderiza as informações detalhadas na tela
    containerDetalhes.innerHTML = `
      <div class="detalhe-card">
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div class="detalhe-info">
          <h1>${produto.produto}</h1>
          <h2>Restaurante: ${produto.restaurante}</h2>
          <p><strong>Responsável/Nome:</strong> ${produto.nome}</p>
          <p class="descricao-completa"><strong>Descrição:</strong> ${produto.descricao || "Sem descrição."}</p>
          <a href="cardapio.html" class="btn-voltar">Voltar ao Cardápio</a>
        </div>
      </div>
    `;
  } catch (erro) {
    console.error("Erro ao buscar detalhes do produto:", erro);
    containerDetalhes.innerHTML = "<p>Erro ao carregar os detalhes do produto.</p>";
  }
}

// Executa ao carregar a página
carregarDetalhesProduto();