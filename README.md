📦 AgilStore – Sistema de Controle de Inventário
📌 Sobre o Projeto

A AgilStore é uma loja de eletrônicos que trabalha com produtos como smartphones, laptops e acessórios.
Com a expansão do catálogo, tornou-se necessário substituir o controle manual em planilhas por um sistema automatizado, reduzindo erros e facilitando a gestão do inventário.

Este projeto consiste em uma aplicação em Node.js, executada via terminal, que permite o gerenciamento completo de produtos, incluindo cadastro, consulta, atualização, remoção e persistência dos dados em arquivo JSON.

🎯 Objetivo

Desenvolver uma aplicação que permita:

Gerenciar produtos de forma automatizada

Garantir persistência dos dados

Facilitar operações de inventário

Aplicar conceitos de JavaScript moderno (ES Modules)

Utilizar manipulação de arquivos com Node.js

🛠️ Tecnologias Utilizadas

Node.js

JavaScript (ES Modules)

Bibliotecas nativas do Node.js

fs

path

url

Dependências externas

uuid → geração de identificadores únicos

prompt-sync → entrada de dados via terminal

chalk → estilização do menu no terminal (opcional)

📁 Estrutura do Projeto
Gerenciamento-de-Produtos-para-a-Loja-AgilStore/
├── package.json
├── README.md
└── src/
    ├── index.js
    ├── services/
    │   └── inventoryService.js
    ├── utils/
    │   └── fileHandler.js
    └── data/
        └── produtos.json

⚙️ Funcionalidades
1️⃣ Adicionar Produto

Cadastro de um novo produto solicitando:

Nome

Categoria

Quantidade em estoque

Preço

Geração automática de ID único

Salvamento automático no arquivo JSON

2️⃣ Listar Produtos

Exibe todos os produtos cadastrados

Apresentação em formato de tabela no terminal

3️⃣ Buscar Produto

Busca por:

ID

Parte do nome

Exibe todas as informações do produto encontrado

4️⃣ Atualizar Produto

Permite atualizar:

Nome

Categoria

Quantidade

Preço

Validação da existência do produto pelo ID

5️⃣ Remover Produto

Remove um produto pelo ID

Atualiza automaticamente o arquivo de dados

💾 Persistência de Dados

Os dados são armazenados no arquivo:

src/data/produtos.json

🔒 Como funciona a persistência

O sistema verifica automaticamente se:

A pasta data existe

O arquivo produtos.json existe

Caso não existam, ambos são criados automaticamente

Os dados são lidos e gravados utilizando o módulo fs

📄 Exemplo de conteúdo do arquivo:
[
  {
    "id": "5aaf0e48-749d-473b-b751-82eaa309a396",
    "nome": "Iphone 12",
    "categoria": "Smartphone",
    "qtd": 10,
    "preco": 4999
  }
]

▶️ Como Executar o Projeto
1️⃣ Pré-requisitos

Node.js versão 18 ou superior

Verifique com:

node -v

2️⃣ Instalar dependências
npm install

3️⃣ Executar a aplicação
npm run dev
