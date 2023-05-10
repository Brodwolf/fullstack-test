# Documentação

---

## API Reference

## Frontend

![Nodejs](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![VueJS](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)


## Backend

![Nodejs](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![PrismaORM](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

- [Documentação](./docs/backend)

## Database

![Postgree](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

---

## Como executar o projeto?!

### Requisitos
- Node.js
- Docker
- Yarn
- Docker-compose

### 1. Verificar se as imagens base utilizadas na aplicação já estão instaladas
``` shell
  docker pull postgres
  docker pull node
```

### 2. Acessar o repositório frontend e buildar a imagem base da api-frontend.
```shell
  cd api-frontend  
  yarn install 
  docker build -t api-frontend . --no-cache
```
### 3. Acessar o repositório backend e buildar a imagem base da api-backend.
```shell
  cd ..
  cd api-backend
  yarn install 
  docker build -t api-backend . --no-cache
```
### 4. Subir a aplicação backend e o banco de dados através do arquivo docker-compose disponível na aplicação.
```shell
  docker-compose up -d
```
### 5. Executar a migration do banco de dados.
```shell
  docker exec -it api-backend-backend-1 yarn migrations:execute
```

### 4. Acessar a URL da aplicação.
```shell
  localhost:8080
  // Durante meus testes, eu percebi um erro onde ao recarregar uma pagina onde a URL não seja a raiz do projeto, o servidor não fornece os arquivos estáticos, se isso ocorrer, reabra o link original. Observei isso durantes os testes finais, isso seria facilmente resolvido em uma imagem final de building utilizando um reverse-proxy como .nginx, porém não tive tempo de chegar a esse ponto!
```

---

## Project Structure

```bash
  ╮
  ├── backend/
  │   ├── dist/
  │   ├── node_modules/
  │   ├── logs/
  │   ├── prisma/
  │   │   ├── migrations/
  │   │   ╰── schema.prisma
  │   │
  │   ├── src/
  │   │   ├── controllers/
  │   │   ├── database/
  │   │   ├── interfaces/
  │   │   ├── middleware/
  │   │   ├── repositories/
  │   │   ├── routes/
  │   │   ├── usecase/
  │   │   ╰── main.ts
  │   │
  │   ├── .env
  │   ├── .eslintrc.json
  │   ├── .gitignore
  │   ├── ..dockerignore
  │   ├── docker-compose.yaml
  │   ├── Dockerfile
  │   ├── package.json
  │   ├── README.md
  │   ╰── tsconfig.json
  │   
  ├── frontend/
  │   ├── dist/ 
  │   ├── node_modules/
  │   ├── public/
  │   │
  │   ├── src/
  │   │   ├── assets/
  │   │   ├── components/
  │   │   ├── enum/
  │   │   ├── interfaces/
  │   │   ├── service/
  │   │   ├── store/
  │   │   ├── style/
  │   │   ├── utils/
  │   │   ├── views/
  │   │   ├── App.vue
  │   │   ├── registerServiceWorker.ts
  │   │   ╰── main.ts
  │   │
  │   ├── .env
  │   ├── .eslintrc.json
  │   ├── .gitignore
  │   ├── babel.config.js
  │   ├── Dockerfile
  │   ├── package.json
  │   ├── tsconfig.json
  │   ├── postcss.config.js
  │   ├── tailwind.config.js
  │   ╰── vue.config.js
  │
  ╯
```