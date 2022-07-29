# Backend Developer Challenge

Para este desafio eu utilizei:

- Node.js
- Express.js
- MongoDB
- Mongoose
- Jest
- Supertest

### Endpoint dos 10 clientes com maior risco de saúde

![preview higher risk](preview/first-ten.png)

### Testes

![preview tests](preview/tests-preview.png)

## Instruções para rodar o app localmente:

1. Inicie o MongoDB

```bash
mongod
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o app:
```bash
npm start
```
## Instruções para executar os testes:

```bash
npm test
```

## Endpoints da API

- **POST /customers** - Criar um cliente
- **GET /customers** - Listar todos os clientes
- **GET /customers/higher-risk** - Listagem dos 10 clientes om maior risco de saúde
- **PUT /customers/:id** - Atualizar um cliente
- **GET /customers/:id** - Obter um cliente específi-co pelo id
