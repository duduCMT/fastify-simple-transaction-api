import request from "supertest";
import { app } from "../src/app";

export const createTransactionBody = {
  title: "New Transaction",
  amount: 500,
  type: "credit",
};

export const createTransaction = async (cookies: string[] = []) =>
  await request(app.server)
    .post("/transactions")
    .send(createTransactionBody)
    .set("Cookie", cookies);
