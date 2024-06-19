# Node.js TypeScript Express Boilerplate

This is a boilerplate project for a Node.js application using TypeScript, Express, and PostgreSQL.

## Features

- **TypeScript**: Write clean and robust code using TypeScript, a statically typed superset of JavaScript.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **PostgreSQL**: Powerful, open-source object-relational database system.
- **Sequelize ORM**: Easy-to-use ORM for interacting with PostgreSQL.
- **Environment Configuration**: Manage environment variables using dotenv.
- **ESLint**: Ensure code quality with ESLint.
- **Prettier**: Maintain code style consistency using Prettier.
- **Swagger**: Automatically generate API documentation.
- **Nodemon**: Monitor changes in your source and automatically restart the server.
- **Ts-node**: Run TypeScript code directly without precompiling.
- **API Error Handling**: Centralized error handling mechanism.
- **Project Structure**: Organized project structure for scalability and maintainability.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.19.0)
- [Yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/nodejs-typescript-express-boilerplate.git
cd nodejs-typescript-express-boilerplate
```

### Install Dependencies

```bash
yarn install
```

### Configure Environment
Create a .env file in the root directory and add the following environment variables:

```bash
DB_USER=your_username
DB_HOST=your_host
DB_NAME=your_database
DB_PASSWORD=your_password
DB_PORT=5432
PORT=3000
```

### Database Setup
### Initialize Sequelize
```bash
npx sequelize-cli init
```

### Configure Sequelize
Update the config/config.json file with your database configuration

### Generate a Model and Migration
An example: User model with firstName, lastName, and email attributes.
```bash
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```
### Run Migrations
```bash
npx sequelize-cli db:migrate
```

### Undo Migrations (last migration)
```bash
npx sequelize-cli db:migrate:undo
```

### Undo All Migrations
```bash
npx sequelize-cli db:migrate:undo:all
```

#### Run Project

```bash
yarn dev
```
The server will start on the port specified in your .env file (default is 3000).

### API Documentation (Swagger)
You can access the Swagger documentation to explore and test the API endpoints.

Swagger UI: ```http://localhost:3000/api-docs```

