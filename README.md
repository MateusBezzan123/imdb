
# Projeto IMDb Clone

Este  projeto é uma aplicação clone do IMDb que permite aos usuários cadastrarem, votarem e visualizarem filmes. A aplicação é composta por um backend em Node.js com Express e um frontend em React.



## Instalação

## Backend

```bash
 git clone https://github.com/MateusBezzan123/imdb.git
 cd imdb-clone/backend 
```
## Instale as dependências:

```bash
npm install
```
## Crie o arquivo .env na raiz do diretório backend com as seguintes variáveis:

```bash
env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/imdb
JWT_SECRET=sua_chave_secreta
```

##  Execute as migrações do Prisma para configurar o banco de dados:

```bash
npx prisma migrate dev
```

## Frontend
## Navegue até o diretório frontend:

```bash
cd ../frontend

```
## Instale as dependências:
```bash
npm install
```
