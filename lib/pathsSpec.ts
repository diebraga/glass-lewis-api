export const paths = {
  "/api/signin": {
    post: {
      summary: "Sign in a user",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/SignIn",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Successful sign in",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  token: {
                    type: "string",
                    description: "JWT token",
                  },
                },
              },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Internal server error",
        },
      },
    },
  },
  "/api/signup": {
    post: {
      summary: "Sign up a new user",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/SignUp",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Successful sign up",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    description: "User ID",
                  },
                  name: {
                    type: "string",
                    description: "User's first name",
                  },
                  surname: {
                    type: "string",
                    description: "User's last name",
                  },
                  email: {
                    type: "string",
                    description: "User email",
                  },
                  isAdmin: {
                    type: "boolean",
                    description: "User's admin status",
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Bad request",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
        "409": {
          description: "Conflict",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/create-company": {
    post: {
      summary: "Create a new company",
      tags: ["Company"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateCompany",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Company created successfully",
          content: {
            "application/json": {
              schema: {
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
                },
              },
            },
          },
        },
        "400": {
          description: "Bad request",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
        "403": {
          description: "Forbidden",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
        "409": {
          description: "Conflict",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/company/{id}": {
    get: {
      summary: "Get a company by ID",
      tags: ["Company"],
      parameters: [
        {
          in: "path",
          name: "id",
          schema: {
            type: "string",
          },
          required: true,
          description: "Company ID",
        },
      ],
      responses: {
        "200": {
          description: "Company data",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Company",
              },
            },
          },
        },
        "400": {
          description: "Company ID must be provided",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Company not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/company/isin/{isin}": {
    get: {
      summary: "Get a company by ISIN",
      tags: ["Company"],
      parameters: [
        {
          in: "path",
          name: "isin",
          schema: {
            type: "string",
          },
          required: true,
          description: "ISIN",
        },
      ],
      responses: {
        "200": {
          description: "Company data",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Company",
              },
            },
          },
        },
        "400": {
          description: "ISIN must be provided",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Company not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/get-all-companies": {
    get: {
      summary: "Get all companies",
      tags: ["Company"],
      responses: {
        "200": {
          description: "List of all companies",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Company",
                },
              },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/company/update": {
    put: {
      summary: "Update a company",
      tags: ["Company"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateCompany",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Company updated successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Company",
              },
            },
          },
        },
        "400": {
          description: "ISIN must start with two letters",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Company not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
        "422": {
          description: "Unprocessable Entity",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
