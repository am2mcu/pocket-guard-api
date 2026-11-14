# Pocket Guard API

Pocket Guard API is a personal finance and expense tracking backend REST API built with Node.js, Express 5, and MongoDB (Mongoose). It powers user authentication, card management, transaction tracking, and categorization with labels.

## Features

- **Authentication** — JWT-based auth with hashed passwords (bcrypt), cookie parsing, and CORS
- **Authorization** — Role-based access control (admin / user)
- **Users** — Registration, login, profile management, and password reset
- **Cards** — Credit/debit card management with masked card numbers
- **Transactions** — Expense tracking with amount, description, card, and label references
- **Labels** — Color-coded categories for organizing transactions
- **Validation** — Request validation with Zod and environment validation at startup
- **Docker** — Containerized API with MongoDB via Docker Compose

## Tech Stack

- Node.js (ESM modules)
- Express 5
- MongoDB with Mongoose
- JWT + bcrypt for authentication
- Zod for schema validation
- Docker & Docker Compose

## Project Structure

```
src/
  app.js              # Express app setup and middleware
  server.js           # Entry point: connects DB and starts the server
  config/
    db.js             # MongoDB connection
    env.js            # Zod-validated environment variables
  controllers/        # Route handlers (auth, user, card, transaction, label)
  middlewares/        # Auth and card middleware
  models/             # Mongoose models (User, Card, Transaction, Label)
  routes/             # API route definitions (auth, me, transactions, labels, cards)
  services/           # Business logic (auth, user, card, transaction, label)
  utils/              # Crypto, JWT, and user role helpers
```

## Getting Started

### Prerequisites

- Node.js (v20+)
- MongoDB (local or remote)
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/pocket-guard.git
cd pocket-guard/api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.example.env`:

```bash
cp .example.env .env
```

4. Fill in the required values in `.env`:

```
PORT=3000
DB_URI=mongodb://127.0.0.1:27017/pocket-guard
ALLOWED_ORIGIN=http://localhost:5173
JWT_SECRET=your-secret-here
JWT_EXPIRY=1h
```

5. Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

### Production

```bash
npm start
```

## Docker

Run the API and MongoDB with Docker Compose:

```bash
docker compose up -d
```

The API exposes port 80 and connects to the `mongo` service. Required environment variables (`ALLOWED_ORIGIN`, `JWT_SECRET`, `JWT_EXPIRY`) are passed from the host environment.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/register` | Register a new user |
| `POST` | `/api/v1/auth/login` | Login and receive auth cookie |
| `POST` | `/api/v1/auth/logout` | Logout |
| `GET` | `/api/v1/me` | Get current user profile |
| `GET` | `/api/v1/transactions` | List transactions |
| `POST` | `/api/v1/transactions` | Create a transaction |
| `GET` | `/api/v1/labels` | List labels |
| `POST` | `/api/v1/labels` | Create a label |
| `GET` | `/api/v1/cards` | List cards |
| `POST` | `/api/v1/cards` | Create a card |

## License

ISC
