import { Pool, PoolClient } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function dropAllTables(client: PoolClient) {
  const result = await client.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
  `);

  const tables = result.rows.map((row) => row.table_name);

  if (tables.length > 0) {
    const dropTablesQuery = tables
      .map((table) => `DROP TABLE IF EXISTS ${table} CASCADE`)
      .join("; ");
    await client.query(dropTablesQuery);
    console.log("All tables dropped successfully.");
  } else {
    console.log("No tables found to drop.");
  }
}

async function createTables(client: PoolClient) {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        surname VARCHAR(255),
        password VARCHAR(255) NOT NULL,
        isAdmin BOOLEAN DEFAULT false,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Users table created successfully.");
  } catch (err) {
    console.error("Error creating users table:", err);
  }

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        stock_ticker VARCHAR(10) NOT NULL,
        exchange VARCHAR(255) NOT NULL,
        isin VARCHAR(12) UNIQUE NOT NULL,
        website_url VARCHAR(255),
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT isin_format CHECK (substring(isin from 1 for 2) ~ '^[A-Za-z]{2}')
      );
    `);
    console.log("Companies table created successfully.");
  } catch (err) {
    console.error("Error creating companies table:", err);
  }
}

// Keeping the insertInitialData function commented as per your instruction
// async function insertInitialData(client: Pool) {
//   await client.query(`
//     INSERT INTO users (name, surname, email, password, isAdmin)
//     VALUES
//     ('John', 'Doe', 'john.doe@example.com', '$2a$08$G7S1rSc0TkLs7Jf8IUBHkOa9l9Q1K8gRp6oQTrf7c6EsSD5O3O7vC', true), -- password: password123
//     ('Jane', 'Smith', 'jane.smith@example.com', '$2a$08$S/Bp7ty0jB1rX0NYdWfrjOZpZZLw5aQak4MJik.PN6Bsy3xOW7GWa', false) -- password: password123
//     ON CONFLICT (email) DO NOTHING;
//   `);
//   console.log("Initial data inserted successfully.");
// }

async function resetDatabase() {
  const client = await pool.connect();

  try {
    await dropAllTables(client);
    await createTables(client);
    // await insertInitialData(client);
    console.log("Database reset successfully.");
  } catch (err) {
    console.error("Error resetting database:", err);
  } finally {
    client.release();
  }
}

resetDatabase();
