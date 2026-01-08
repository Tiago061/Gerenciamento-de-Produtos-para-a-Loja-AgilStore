import chalk from "chalk";

function mostrarMenu(){
  console.log(chalk.blue('\n=== AgilStore | Controle de Inventário ==='));
  console.log('1 - Adicionar produto');
  console.log('2 - Listar produtos');
  console.log('3 - Buscar produto');
  console.log('4 - Atualizar produto');
  console.log('5 - Remover produto');
  console.log('0 - Sair'); 
}

function adicionar(){
    try{
        const nome = prompt('Nome do Produto')
        const categoria = prompt('Categoria do Produto')
        const quantidade = prompt('Quantidade do Produto')
        const preco = prompt('Preço do Produto')

        const produto = adicionarProduto({nome, categoria, quantidade, preco})
        console.log(chalk.green('\nProduto adicionado com sucesso!'))
        console.table([produto])
    }catch(error){
        console.log(chalk.red(`Erro: ${error.message}`))
    }
}

function listar() {
  const categoria = prompt('Filtrar por categoria (Enter para ignorar): ');
  const ordenarPor = prompt('Ordenar por (nome | quantidade | preco | Enter): ');

  const produtos = listarProdutos({
    categoria: categoria || undefined,
    ordenarPor: ordenarPor || undefined
  });

  if (produtos.length === 0) {
    console.log(chalk.yellow('Nenhum produto encontrado.'));
    return;
  }

  console.table(produtos);
}

function buscar() {
  const opcao = prompt('Buscar por (1 - ID | 2 - Nome): ');

  if (opcao === '1') {
    const id = prompt('Informe o ID: ');
    const produto = buscarProdutoPorId(id);

    if (!produto) {
      console.log(chalk.yellow('Produto não encontrado.'));
      return;
    }

    console.table([produto]);
  } else if (opcao === '2') {
    const nome = prompt('Informe parte do nome: ');
    const produtos = buscarProdutoPorNome(nome);

    if (produtos.length === 0) {
      console.log(chalk.yellow('Nenhum produto encontrado.'));
      return;
    }

    console.table(produtos);
  } else {
    console.log(chalk.red('Opção inválida.'));
  }
}