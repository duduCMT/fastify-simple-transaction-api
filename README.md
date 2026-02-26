# Fastify Node API

## Description

Repository for learning and practicing NodeJS from the Rockeatseat Course.

## Technologies

- NodeJS
- Typescript
- Fastify (API)
- SQLite (Database)
- Knex (SQL Query Builder)

## Setup

Install Dependencies With

```bash
npm install
```

To run the project, use:

```bash
npm start
```

To run the project in developer mode, use:

```bash
npm run dev
```

## Notations

I'm recording here some important lessons learned during the project implementation.

### Knex

To run Knex with tsx, add this script and use `npm run knex` instead of `npx knex`.

```json
{
  "scripts": {
    "knex": "node --loader tsx ./node_modules/.bin/knex"
  }
}
```

To start a migration with knex, use:

```bash
npm run knex -- migrate:make create-transactions
```

Where `create-transactions` is the name of migration.

To run migrations, use:

```bash
npm run knex -- migrate:latest
```

To undo migrations, use:

```bash
npm run knex -- migrate:rollback
```
