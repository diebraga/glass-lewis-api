import pool from "../../lib/db";

export const getCompanyByIsinService = async (isin: string) => {
  if (!isin) {
    throw new Error("ISIN must be provided!");
  }

  const companyResult = await pool.query(
    "SELECT * FROM companies WHERE isin = $1 LIMIT 1",
    [isin]
  );
  const company = companyResult.rows[0];

  if (!company) {
    throw new Error("Company not found!");
  }

  return {
    id: company.id,
    name: company.name,
    stock_ticker: company.stock_ticker,
    exchange: company.exchange,
    isin: company.isin,
    website_url: company.website_url,
    user_id: company.user_id,
    created_at: company.created_at,
    updated_at: company.updated_at,
  };
};
