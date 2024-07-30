import pool from "../../lib/db";

interface CreateCompanyParams {
  userId: string;
  name: string;
  stock_ticker: string;
  exchange: string;
  isin: string;
  website_url: string;
}

export const createCompanyService = async ({
  userId,
  name,
  stock_ticker,
  exchange,
  isin,
  website_url,
}: CreateCompanyParams) => {
  const userResult = await pool.query(
    "SELECT * FROM users WHERE id = $1 LIMIT 1",
    [userId]
  );
  const user = userResult.rows[0];

  if (!user) {
    throw new Error("User not found!");
  }

  if (!user.isadmin) {
    throw new Error("Only admins can create a company!");
  }

  if (!/^([A-Za-z]{2}).*/.test(isin)) {
    throw new Error("ISIN must start with two letters!");
  }

  const isinResult = await pool.query(
    "SELECT * FROM companies WHERE isin = $1 LIMIT 1",
    [isin]
  );

  if (isinResult.rows.length > 0) {
    throw new Error("Company with this ISIN already exists!");
  }

  const createCompanyResult = await pool.query(
    "INSERT INTO companies (name, stock_ticker, exchange, isin, website_url, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, stock_ticker, exchange, isin, website_url, user_id",
    [name, stock_ticker, exchange, isin, website_url, userId]
  );
  const createCompany = createCompanyResult.rows[0];

  return {
    id: createCompany.id,
    name: createCompany.name,
    stock_ticker: createCompany.stock_ticker,
    exchange: createCompany.exchange,
    isin: createCompany.isin,
    website_url: createCompany.website_url,
    user_id: createCompany.user_id,
  };
};
