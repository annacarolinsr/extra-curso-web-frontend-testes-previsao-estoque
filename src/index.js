// Função para criar um produto
function criarProduto(nome, preco, quantidade, taxaVenda) {
  return {
    nome,
    preco,
    quantidade,
    taxaVenda,
  };
}

// Função para vender produtos por um dia e atualizar o estoque
function venderDia(produto) {
  produto.quantidade -= produto.taxaVenda;  // Subtrai a taxa de venda diária do estoque
  console.log(`Estoque de ${produto.nome} após a venda de hoje: ${produto.quantidade}`);
}

// Função para calcular quantos dias o estoque de um produto vai durar
function diasAteEstoqueZerado(produto) {
  return Math.floor(produto.quantidade / produto.taxaVenda);
}

// Função para adicionar um produto à loja
function adicionarProdutoNaLoja(produto, loja) {
  loja.push(produto);
  console.log(`${produto.nome} adicionado à loja!`);
}

// Função para verificar qual produto está mais próximo de esgotar o estoque
function produtoMaisProximoDeEsgotar(loja) {
  return loja.reduce((produto1, produto2) => {
    const dias1 = diasAteEstoqueZerado(produto1);
    const dias2 = diasAteEstoqueZerado(produto2);
    return dias1 < dias2 ? produto1 : produto2;
  });
}

// Função para sugerir uma quantidade de reabastecimento com base no histórico de vendas
function sugerirReabastecimento(produto, vendasDiarias) {
  const totalVendidoNosUltimos30Dias = vendasDiarias.reduce((acc, venda) => acc + venda, 0);
  const mediaVendasDiarias = totalVendidoNosUltimos30Dias / 30;
  const reabastecimento = Math.max(0, (produto.quantidade + mediaVendasDiarias * 30) - produto.quantidade);
  return reabastecimento;
}

// Função para simular vendas por 30 dias
function simularVendasPor30Dias(produto) {
  for (let i = 0; i < 30; i++) {
    venderDia(produto);
  }
}

// Função para simular as vendas para todos os produtos da loja
function simularVendasNaLoja(loja) {
  loja.forEach(produto => {
    simularVendasPor30Dias(produto);
  });
}

// Criando a loja e adicionando alguns produtos
const loja = [];

// Criando produtos
const camiseta = criarProduto('Camiseta', 50, 100, 5);
const calca = criarProduto('Calça', 100, 80, 4);

// Adicionando produtos à loja
adicionarProdutoNaLoja(camiseta, loja);
adicionarProdutoNaLoja(calca, loja);

// Exibindo qual produto está mais próximo de esgotar
const produtoMaisProximo = produtoMaisProximoDeEsgotar(loja);
console.log(`Produto mais próximo de esgotar: ${produtoMaisProximo.nome}`);

// Simulando vendas na loja
simularVendasNaLoja(loja);

// Exibindo sugestão de reabastecimento para o produto mais próximo de esgotar
const vendasDiariasCamiseta = [5, 6, 5, 4, 5, 4, 5, 6, 5, 5, 5, 6, 5, 4, 5, 6, 4, 5, 5, 5, 6, 5, 6, 5, 4, 5, 5, 6, 4, 5];
const reabastecimentoCamiseta = sugerirReabastecimento(camiseta, vendasDiariasCamiseta);
console.log(`Sugestão de reabastecimento para a ${camiseta.nome}: ${reabastecimentoCamiseta.toFixed(2)} unidades`);

module.exports = {
  criarProduto,
  venderDia,
  diasAteEstoqueZerado,
  adicionarProdutoNaLoja,
  produtoMaisProximoDeEsgotar,
  sugerirReabastecimento,
  simularVendasNaLoja,
};