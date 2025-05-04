const {
    criarProduto,
    venderDia,
    diasAteEstoqueZerado,
    adicionarProdutoNaLoja,
    produtoMaisProximoDeEsgotar,
    sugerirReabastecimento,
    simularVendasNaLoja,
  } = require('../src/index');
  
  describe('Funções de estoque', () => {
    
    // Teste da função criarProduto
    test('criarProduto deve retornar um objeto com os dados corretos', () => {
      const produto = criarProduto('Tênis', 120, 50, 2);
  
      expect(produto).toEqual({
        nome: 'Tênis',
        preco: 120,
        quantidade: 50,
        taxaVenda: 2,
      });
    });
  
    // Teste da função venderDia
    test('Deve diminuir a quantidade de um produto ao vender um dia', () => {
      const produto = criarProduto('Camiseta', 50, 100, 5);
      venderDia(produto);
      expect(produto.quantidade).toBe(95); // Após a venda, a quantidade deve diminuir 5
    });
  
    // Teste da função diasAteEstoqueZerado
    test('Deve calcular corretamente os dias até o estoque zerar', () => {
      const produto = criarProduto('Camiseta', 50, 100, 5);
      const diasParaZerar = diasAteEstoqueZerado(produto);
      expect(diasParaZerar).toBe(20); // 100 / 5 = 20
    });
  
    // Teste da função adicionarProdutoNaLoja
    test('Deve adicionar um produto à loja', () => {
      const loja = [];
      const produto = criarProduto('Camiseta', 50, 100, 5);
      adicionarProdutoNaLoja(produto, loja);
      expect(loja.length).toBe(1); // A loja deve ter 1 produto
      expect(loja[0].nome).toBe('Camiseta'); // O nome do produto adicionado deve ser 'Camiseta'
    });
  
    // Teste da função produtoMaisProximoDeEsgotar
    test('Deve retornar o produto mais próximo de esgotar', () => {
      const loja = [];
      const camiseta = criarProduto('Camiseta', 50, 100, 5);
      const calca = criarProduto('Calça', 100, 80, 4);
      
      adicionarProdutoNaLoja(camiseta, loja);
      adicionarProdutoNaLoja(calca, loja);
      
      const produtoMaisProximo = produtoMaisProximoDeEsgotar(loja);
      
      expect(produtoMaisProximo.nome).toBe('Calça'); // Calça deve ser o mais próximo de esgotar
    });
  
    // Teste da função sugerirReabastecimento
test('Deve sugerir corretamente a quantidade de reabastecimento', () => {
    // Passo 1: Criar o produto corretamente
    const camiseta = criarProduto('Camiseta', 50, 100, 5);  // Criando o produto 'Camiseta'
    
    // Passo 2: Definir as vendas diárias para o produto
    const vendasDiariasCamiseta = [5, 6, 5, 4, 5, 4, 5, 6, 5, 5, 5, 6, 5, 4, 5, 6, 4, 5, 5, 5, 6, 5, 6, 5, 4, 5, 5, 6, 4, 5];
    
    // Passo 3: Chamar a função sugerirReabastecimento
    const reabastecimentoCamiseta = sugerirReabastecimento(camiseta, vendasDiariasCamiseta);
    
    // Passo 4: Verificar o valor esperado do reabastecimento
    expect(reabastecimentoCamiseta).toBeCloseTo(151, 0);  // O valor de reabastecimento deve ser 151 unidades
  });
  
    // Teste da função simularVendasNaLoja
    test('Deve simular as vendas para todos os produtos da loja', () => {
      const loja = [];
      const camiseta = criarProduto('Camiseta', 50, 100, 5);
      const calca = criarProduto('Calça', 100, 80, 4);
      
      adicionarProdutoNaLoja(camiseta, loja);
      adicionarProdutoNaLoja(calca, loja);
      
      expect(() => simularVendasNaLoja(loja)).not.toThrow(); // Verifica se a função executa sem erro
    });
  
  });

