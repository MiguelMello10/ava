const URL_API = "https://sua-api-aqui.com/produtos"; 
const containerCardapio = document.querySelector("#cardapio-container");

async function carregarCardapio() {
  try {
    containerCardapio.innerHTML = "<p>Carregando produtos da API...</p>";
    
    const resposta = await fetch(URL_API);
    
    // Verifica se a resposta da API foi bem-sucedida
    if (!resposta.ok) {
      throw new Error(`Erro na API: ${resposta.status} - ${resposta.statusText}`);
    }

    const produtos = await resposta.json();
    console.log("Dados recebidos da API:", produtos);

    // Limpa o container antes de renderizar
    containerCardapio.innerHTML = "";

    // Verifica se a lista de produtos veio vazia ou indefinida
    if (!produtos || produtos.length === 0) {
      containerCardapio.innerHTML = "<p>Nenhum produto encontrado na API.</p>";
      return;
    }

    produtos.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card-produto");

      // Tratamento para garantir que pegamos as propriedades corretas do JSON
      const nomeProduto = item.produto || item.nome || "Produto sem nome";
      const nomeRestaurante = item.restaurante || "Restaurante";
      const imagemProduto = item.imagem || "https://via.placeholder.com/300";
      const descricaoProduto = item.descricao || "Sem descrição disponível.";
      const idProduto = item.id || item._id; // Trata se o ID vier como id ou _id

      card.innerHTML = `
        <img src="${imagemProduto}" alt="${nomeProduto}" onerror="this.src='https://via.placeholder.com/300'">
        <div class="card-conteudo">
          <h3>${nomeProduto}</h3>
          <p class="restaurante-nome">Restaurante: ${nomeRestaurante}</p>
          <p>${descricaoProduto}</p>
          <button onclick="verDetalhes('${idProduto}')">Ver Detalhes</button>
        </div>
      `;

      containerCardapio.appendChild(card);
    });
  } catch (erro) {
    console.error("Erro detalhado:", erro);
    containerCardapio.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: #c0392b;">
        <h3>Não foi possível carregar o cardápio.</h3>
        <p>Verifique se a URL da API está correta e se o servidor está rodando.</p>
        <p><small>Detalhe técnico: ${erro.message}</small></p>
      </div>
    `;
  }
}

function verDetalhes(id) {
  window.location.href = `detalhes.html?id=${id}`;
}

carregarCardapio();