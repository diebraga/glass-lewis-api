export const components = {
  schemas: {
    SignIn: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
          description: "User email",
        },
        password: {
          type: "string",
          description: "User password",
        },
      },
      example: {
        email: "user@example.com",
        password: "password123",
      },
    },
    SignUp: {
      type: "object",
      required: ["email", "password", "name", "surname"],
      properties: {
        email: {
          type: "string",
          description: "User email",
        },
        password: {
          type: "string",
          description: "User password",
        },
        name: {
          type: "string",
          description: "User's first name",
        },
        surname: {
          type: "string",
          description: "User's last name",
        },
        isAdmin: {
          type: "boolean",
          description: "User's admin status (optional)",
        },
      },
      example: {
        email: "user@example.com",
        password: "password123",
        name: "John",
        surname: "Doe",
        isAdmin: false,
      },
    },
    CreateCompany: {
      type: "object",
      required: ["name", "stock_ticker", "exchange", "isin", "website_url"],
      properties: {
        name: {
          type: "string",
          description: "Company name",
        },
        stock_ticker: {
          type: "string",
          description: "Company stock ticker",
        },
        exchange: {
          type: "string",
          description: "Stock exchange",
        },
        isin: {
          type: "string",
          description: "ISIN code",
        },
        website_url: {
          type: "string",
          description: "Company website URL",
        },
      },
      example: {
        name: "Example Company",
        stock_ticker: "EXM",
        exchange: "NASDAQ",
        isin: "US1234567890",
        website_url: "https://example.com",
      },
    },
    Company: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Company ID",
        },
        name: {
          type: "string",
          description: "Company name",
        },
        stock_ticker: {
          type: "string",
          description: "Company stock ticker",
        },
        exchange: {
          type: "string",
          description: "Stock exchange",
        },
        isin: {
          type: "string",
          description: "ISIN code",
        },
        website_url: {
          type: "string",
          description: "Company website URL",
        },
        user_id: {
          type: "string",
          description: "User ID of the creator",
        },
        created_at: {
          type: "string",
          description: "Creation timestamp",
        },
        updated_at: {
          type: "string",
          description: "Update timestamp",
        },
      },
    },
  },
};
