import chalk from "chalk";
import promptSync from 'prompt-sync';
import {
  adicionarProduto,
  listarProdutos,
  buscarProdutoPorId,
  buscarProdutoPorNome,
  atualizarProduto,
  removerProduto
} from './services/inventoryService.js';


function mostrarMenu(){
  console.log(chalk.blue('\n=== AgilStore | Controle de Inventário ==='));
  console.log('1 - Adicionar produto');
  console.log('2 - Listar produtos');
  console.log('3 - Buscar produto');
  console.log('4 - Atualizar produto');
  console.log('5 - Remover produto');
  console.log('0 - Sair'); 
}

const prompt = promptSync({ sigint: true });

function adicionar(){
    try{
        const nome = prompt('Nome do Produto: ')
        const categoria = prompt('Categoria do Produto: ')
        const quantidade = prompt('Quantidade do Produto: ')
        const preco = prompt('Preço do Produto: ')

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

  console.table(
    produtos.map(p => ({
        ID: p.id,
        Produto: p.nome,
        Categoria: p.categoria,
        Quantidade: p.qtd,
        Preço: `R$ ${p.preco.toFixed(2)}`
    }))
  );
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

function atualizar() {
  try {
    const id = prompt('Informe o ID do produto: ');

    const nome = prompt('Novo nome (Enter para manter): ');
    const categoria = prompt('Nova categoria (Enter para manter): ');
    const quantidadeInput = prompt('Nova quantidade (Enter para manter): ');
    const precoInput = prompt('Novo preço (Enter para manter): ');

    const novosDados = {};

    if (nome) novosDados.nome = nome;
    if (categoria) novosDados.categoria = categoria;
    if (quantidadeInput) novosDados.quantidade = Number(quantidadeInput);
    if (precoInput) novosDados.preco = Number(precoInput);

    const produtoAtualizado = atualizarProduto(id, novosDados);

    console.log(chalk.green('\nProduto atualizado com sucesso!'));
    console.table([produtoAtualizado]);
  } catch (error) {
    console.log(chalk.red(`Erro: ${error.message}`));
  }
}

function remover() {
  try {
    const id = prompt('Informe o ID do produto: ');
    const confirmacao = prompt('Tem certeza que deseja remover? (s/n): ');

    if (confirmacao.toLowerCase() !== 's') {
      console.log(chalk.yellow('Operação cancelada.'));
      return;
    }

    const produtoRemovido = removerProduto(id);
    console.log(chalk.green('\nProduto removido com sucesso!'));
    console.table([produtoRemovido]);
  } catch (error) {
    console.log(chalk.red(`Erro: ${error.message}`));
  }
}

let opcao;

do {
  mostrarMenu();
  opcao = prompt('\nEscolha uma opção: ');

  switch (opcao) {
    case '1':
      adicionar();
      break;
    case '2':
      listar();
      break;
    case '3':
      buscar();
      break;
    case '4':
      atualizar();
      break;
    case '5':
      remover();
      break;
    case '0':
      console.log(chalk.blue('\nEncerrando aplicação...'));
      break;
    default:
      console.log(chalk.red('Opção inválida.'));
  }
} while (opcao !== '0');