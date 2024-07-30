import pool from "../../lib/db";

interface UpdateCompanyParams {
  companyId: number;
  name: string;
  stock_ticker: string;
  exchange: string;
  isin: string;
  website_url: string;
}

export const updateCompanyService = async ({
  companyId,
  name,
  stock_ticker,
  exchange,
  isin,
  website_url,
}: UpdateCompanyParams) => {
  const isinResult = await pool.query(
    "SELECT * FROM companies WHERE isin = $1 AND id != $2 LIMIT 1",
    [isin, companyId]
  );

  if (isinResult.rows.length > 0) {
    throw new Error("Company with this ISIN already exists!");
  }

  const updateCompanyResult = await pool.query(
    `UPDATE companies 
     SET name = $1, stock_ticker = $2, exchange = $3, isin = $4, website_url = $5, updatedat = CURRENT_TIMESTAMP 
     WHERE id = $6 RETURNING id, name, stock_ticker, exchange, isin, website_url`,
    [name, stock_ticker, exchange, isin, website_url, companyId]
  );

  if (updateCompanyResult.rows.length === 0) {
    throw new Error("Company not found!");
  }

  return updateCompanyResult.rows[0];
};
