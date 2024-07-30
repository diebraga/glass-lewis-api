import pool from "../../lib/db";

export const getAllCompaniesService = async () => {
  const result = await pool.query("SELECT * FROM companies");

  const companies = result.rows.map((company: any) => ({
    id: company.id,
    name: company.name,
    stock_ticker: company.stock_ticker,
    exchange: company.exchange,
    isin: company.isin,
    website_url: company.website_url,
    user_id: company.user_id,
  }));

  return companies;
};
