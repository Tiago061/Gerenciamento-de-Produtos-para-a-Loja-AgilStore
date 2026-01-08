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