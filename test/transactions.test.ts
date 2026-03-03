import { expect, it, beforeAll, afterAll, describe, beforeEach } from "vitest";
import { execSync } from "node:child_process";
import request from "supertest";

import { app } from "../src/app";
import { createTransaction, createTransactionBody } from "./transactions.mock";

describe("Transactions routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync("npm run knex migrate:rollback --all");
    execSync("npm run knex migrate:latest");
  });

  it("should be able to create a new transaction", async () => {
    const createTransactionResponse = await createTransaction();
    expect(createTransactionResponse.statusCode).toEqual(201);
  });

  it("should be able to list all transactions", async () => {
    const createTransactionResponse = await createTransaction();

    const cookies = createTransactionResponse.get("Set-Cookie") ?? [];

    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    expect(listTransactionsResponse.body).toEqual({
      transactions: [
        expect.objectContaining({
          title: createTransactionBody.title,
          amount: createTransactionBody.amount,
        }),
      ],
    });
  });

  it("should be able to get a specific transaction", async () => {
    const createTransactionResponse = await createTransaction();

    const cookies = createTransactionResponse.get("Set-Cookie") ?? [];

    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies);

    const transactionId = listTransactionsResponse.body.transactions[0].id;

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set("Cookie", cookies)
      .expect(200);

    expect(getTransactionResponse.body).toEqual({
      transaction: expect.objectContaining({
        title: createTransactionBody.title,
        amount: createTransactionBody.amount,
      }),
    });
  });

  it("should be able to get the summary", async () => {
    const createTransactionResponse = await createTransaction();
    const cookies = createTransactionResponse.get("Set-Cookie") ?? [];

    await createTransaction(cookies);

    await request(app.server)
      .post("/transactions")
      .send({
        ...createTransactionBody,
        amount: 200,
        type: "debit",
      })
      .set("Cookie", cookies);

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/summary`)
      .set("Cookie", cookies)
      .expect(200);

    expect(getTransactionResponse.body).toEqual({
      summary: {
        amount:
          createTransactionBody.amount + createTransactionBody.amount - 200,
      },
    });
  });
});
