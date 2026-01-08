import { loadData, saveData } from '../utils/fileHandler.js'
import { v4 as uuidv4 } from 'uuid';

let produtos = loadData()

export function adicionarProduto({nome, categoria, quantidade, preco}) {
    if(!nome || !categoria){
        throw new Error('Nome e categoria são obrigatórios.')
    }

    if(quantidade < 0 || isNaN(quantidade)){
        throw new Error('Quantidade inválida')
    }

    if(preco < 0 || isNaN(preco)){
        throw new Error('Preço inválido.')
    }

    const novoProduto = {
        id: uuidv4(),
        nome,
        categoria,
        quantidade: Number(quantidade),
        preco: Number(preco)
    }

    produtos.push(novoProduto)
    saveData(produtos)

    return novoProduto
}

export function listarProdutos({ categoria, ordernarPor } = {}){
    let resultado = [...produtos]

    if(categoria){
        resultado = resultado.filter(
            p => p.categoria.toLowerCase() === categoria.toLowerCase()
        )
    }

    if(ordernarPor){
        resultado.sort((a, b) => {
            if(typeof a[ordernarPor] ==='string'){
                return a[ordernarPor].localeCompare(b[ordernarPor])
            }
            return a[ordernarPor] - b[ordernarPor]
        })
    }

    return resultado
}

export function buscarProdutoPorId(id) {
  return produtos.find(p => p.id === id);
}

export function buscarProdutoPorNome(nome){
    return produtos.filter(p =>
        p.nome.toLowerCase().includes(nome.toLowerCase())
    )
}

export function atualizarProduto(id, novosDados){
    const index = produtos.findIndex(p => p.id === id)

    if(index === -1){
        throw new Error('Produto não encontrado.')
    }

    const produtoAtual = produtos[index]

    produtos[index] = {
        ...produtoAtual,
        ...novosDados,
        quantidade: novosDados.quantidade !== undefined
         ? Number(novosDados.quantidade)
         : produtoAtual.quantidade,
        preco: novosDados.preco !== undefined 
         ? Number(novosDados.preco)
         : produtoAtual.preco,
    }

    if(produtos[index].quantidade < 0 || isNaN(produtos[index].quantidade)){
        throw new Error('Quantidade inválida.');
    }

    if (produtos[index].preco < 0 || isNaN(produtos[index].preco)) {
        throw new Error('Preço inválido.');
    }

    saveData(produtos)
    return produtos[index]
}

export function removerProduto(id){
    const index = produtos.findIndex(p => p.id === id)

    if(index === -1){
        throw new Error('Produto não encontrado.');
    }

    const produtoRemovido = produtos.splice(index, 1)[0]
    saveData(produtos)

    return produtoRemovido
}