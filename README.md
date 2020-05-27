# Curso Starter NodeJS | Rocketseat

Anotações realizadas durante cada aula do curso.

## O que é API e NodeJS?

## Instalando NodeJS

Apesar da aula não mencionar esta forma de instalação no Linux, resolvi instalar o **Node.js** utilizando o **NVM (Node Version Manager)**, que é o mais recomendado do que a versão do `apt-get`. Além disso, como estou utilizando o ZSH ao invés do bash padrão, os passos para instalação são os seguintes:

#### Instalação do plugin para ZSH do NVM

`git clone https://github.com/lukechilds/zsh-nvm.git ~/.zsh-nvm`

`source ~/.zsh-nvm/zsh-nvm.plugin.zsh`

**DICA:** Adicione essa linha acima dentro do arquivo `.zshrc` do seu diretório `HOME` no Linux.

#### Instalação do Node

`nvm install --lts`

E após instalado, para verificar a versão, basta executar o comando: `node -v`.

## Criando estrutura 

Para iniciar um novo projeto:

`npm init -y`

É necessário instalar o **Express**, que é um "micro-framework" para gerenciamento de rotas e views:

`npm install express`

Agora basta criar o arquivo principal do projeto, ou seja, o arquivo que irá inicializar a aplicação. O nome do arquivo é indiferente, mas neste caso foi usado `server.js` com o seguinte conteúdo:

```
const express = require('express');
const app = express();
app.listen(3001);
```

Para rodá-lo:

`node server.js`

## Utilizando Nodemon

O **Nodemon** é uma ferramenta para ser usada durante o desenvolvimento e um dos seus principais recursos é o reinício automático do servidor após uma alteração no código. Para instalá-lo, basta executar o comando:

`npm install -D nodemon`

Onde o `-D` indica que é um dependência de desenvolvimento. Não será utilizado em produção.

## Instalando MongoDB

No curso foi utilizado uma imagem do **MongoDB** para **Docker** e para instalação do Docker dentro do Linux foi seguindo [os passos do site oficial](https://docs.docker.com/engine/install/ubuntu). Após a instalação, execute o seguinte comando para iniciar o Docker:

`sudo service docker start`

Para configurar um container com MongoDB, vamos baixar uma imagem já pronta da seguinte forma:

`docker pull mongo`

Em seguida, subir este container:

`docker run --name mongodb -p 27017:27017 -d mongo`

Onde: 

- `mongodb` é o nome que você define para seu container;
- `-p 27017:27017` é o parâmetro para direcionamento de porta do container para a porta da sua máquina;
- `-d mongo` é a imagem que você quer usar.

**DICAS DOCKER**: O comando `docker ps` mostra os containers que estão em execução na sua máquina.
Já o comando `docker ps -a` mostra todos containers da sua máquina, inclusive os que não estão em execução. Para inicializar um que esteja parado para rodar o comando `docker start nome_container`.

#### Robo 3T

Para visualizar o banco de dados MongoDB, foi utilizado o programa [Robo 3T](https://robomongo.org).

## Conectando Database

Para a aplicação conectar com este banco de dados, foi utilizado o **Mongoose**, um ORM para banco de dados não-relacionais.

`npm install mongoose`

E dentro do arquivo `server.js`:

```
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://localhost:27017/nodeapi', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
```

## Criando model de produto

`Product.js`

```
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Product', ProductSchema);
```

## Utilizando o Insomnia

O [Insomnia](https://insomnia.rest) é um software que nos auxilia fazer todas as requisições HTTP para nossa API.

**DICAS:** Para criar uma URL de base padrão para não ter que ficar repetindo em todas as requisições, basta adicionar a seguinte linha em `Enviroment > Manage Enviroment`:

```
{
    "base_url": "http://localhost:3001/api"
}
```
Aí ao preencher as URLs das requisições, comece digitando `base` para o software sugerir você usar essa "variável de ambiente" como base de sua URL.

## Paginação da lista

Para criar paginação nos resultados da lista, basta instalar o plugin:

`npm install mongoose-paginate`

E depois basta importar e configurar na classe modelo as seguintes linhas:

```
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate'); // <---essa linha

const ProductSchema = new mongoose.Schema({
  // ...
});

ProductSchema.plugin(mongoosePaginate); // <---essa linha
mongoose.model('Product', ProductSchema);
```

## Adicionando CORS

Para que uma API seja acessada de domínios diferentes, é necessário habilitar o [CORS](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Controle_Acesso_CORS) (Cross-Origin Resource Sharing), que é uma especificação do W3C.

`npm install cors`

E dentro do arquivo `server.js`:

```
const cors = require('cors');
//...

const app = express();
app.use(express.json());
app.use(cors());
```
