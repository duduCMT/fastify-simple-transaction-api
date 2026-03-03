# API Documentation

## Base URL (Development)

```
http://localhost:3333
```

## Base URL (Production)

```
https://fastify-simple-transaction-api.onrender.com
```

## Transaction Object Structure

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "session_id": "660e8400-e29b-41d4-a716-446655440001",
  "title": "string",
  "amount": 1000.0,
  "created_at": "2026-02-23T10:30:00.000Z"
}
```

---

## Endpoints

### POST /transactions

Creates a new transaction. If the client has no `sessionId` cookie, the server will create one and set it in the response cookies.

**Request:**

```bash
POST /transactions
```

**Body:**

```json
{
  "title": "Salary",
  "amount": 3000,
  "type": "credit"
}
```

**Parameters:**

- `title` (string, required): Transaction description
- `amount` (number, required): Value of the transaction
- `type` (string, required): `credit` or `debit` — server stores debits as negative values

**Response: 201 Created**

No body is returned on success. The response may set a `sessionId` cookie when one did not exist.

**Error Responses:**

- `400 Bad Request`: Invalid payload

---

### GET /transactions

Lists all transactions for the current session.

**Request:**

```bash
GET /transactions
```

**Authentication:**

- Requires `sessionId` cookie.

**Response: 200 OK**

```json
{
  "transactions": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "session_id": "660e8400-e29b-41d4-a716-446655440001",
      "title": "Salary",
      "amount": 3000.0,
      "created_at": "2026-02-23T10:30:00.000Z"
    }
  ]
}
```

**Error Responses:**

- `401 Unauthorized`: Missing `sessionId` cookie (body: `{ "message": "Unauthorized." }`)

---

### GET /transactions/:id

Retrieve a single transaction by UUID for the current session.

**Request:**

```bash
GET /transactions/:id
```

**Parameters:**

- `id` (string, required): Transaction UUID

**Authentication:**

- Requires `sessionId` cookie.

**Response: 200 OK**

```json
{
  "transaction": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "session_id": "660e8400-e29b-41d4-a716-446655440001",
    "title": "Salary",
    "amount": 3000.0,
    "created_at": "2026-02-23T10:30:00.000Z"
  }
}
```

**Error Responses:**

- `404 Not Found`: `{ "message": "transaction not found." }`
- `401 Unauthorized`: `{ "message": "Unauthorized." }`

---

### GET /transactions/summary

Return the sum of `amount` values for the current session.

**Request:**

```bash
GET /transactions/summary
```

**Authentication:**

- Requires `sessionId` cookie.

**Response: 200 OK**

```json
{
  "summary": { "amount": 1234.0 }
}
```

**Error Responses:**

- `401 Unauthorized`: `{ "message": "Unauthorized." }`

---

### GET /status

Health check endpoint.

**Request:**

```bash
GET /status
```

**Response: 200 OK**

Plain text: `✅ Everything is in order`

---

## Error Handling

Common error shape (example):

```json
{
  "error": "Error message describing what went wrong"
}
```

Note: some endpoints in this API return `{ "message": "..." }` for errors (e.g. unauthorized or not found).

### HTTP Status Codes

| Status | Meaning                                          |
| ------ | ------------------------------------------------ |
| 200    | OK - Request succeeded                           |
| 201    | Created - Resource created successfully          |
| 204    | No Content - Successful deletion                 |
| 400    | Bad Request - Invalid request data               |
| 401    | Unauthorized - Missing or invalid session cookie |
| 404    | Not Found - Resource not found                   |
| 500    | Internal Server Error - Server error             |
