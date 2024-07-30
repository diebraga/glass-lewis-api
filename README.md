## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are serverless api routes.

# .env.local.example

# The connection string for your PostgreSQL database.

# Replace 'your_database_url' with the actual URL to your PostgreSQL database.

DATABASE_URL=your_database_url

# The secret key for signing JWT tokens.

# Replace 'your_jwt_secret' with a strong secret key.

JWT_SECRET=your_jwt_secret

## Deployed

You can access the deployed application at the following URL:

<a href="https://literate-waddle-7pq6x56pv49hpq4q-3000.app.github.dev/">Deployed Application</a>

## Database Initialization or Reset

If you wish to initialize or reset the database, run the following command:

```sh
node sqlresetDb.ts