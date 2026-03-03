# Fastify Simple Transaction API

[![](https://img.shields.io/badge/Project-NodeJS-green)](#)
[![](https://img.shields.io/badge/Framework-Fastify-black)](#)
[![](https://img.shields.io/badge/Category-Project%20to%20Study-red)](#)

## Description

This project is a RESTful financial transactions API built with Fastify that allows users to create credit and debit transactions, track their account balance, and securely access their own transaction history. Instead of using a conventional authentication system, the application follows a no-auth first approach, where users are identified and their data is related across requests through cookies. This design focuses on learning and demonstrating how cookie-based session dynamics work, ensuring that each user can only view and manage the transactions they have created without requiring a traditional login process.

Repository for learning and practicing NodeJS from the Rockeatseat Course.

## Technologies

- NodeJS
- Typescript (tsx and tsup)
- Fastify (API)
- SQLite (Database)
- Knex (SQL Query Builder)
- Vitest (Unit Test Framework)

## Setup

If you are using nvm, run:

```bash
nvm use
```

Else, change your Node Version to `18.13.0`.

Install Dependencies With:

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
