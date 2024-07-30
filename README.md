## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are serverless api routes.

## Environment Variables

Make sure to set the following environment variables in your `.env.local` file:

```sh
DATABASE_URL=
JWT_SECRET=
```

## Deployed

You can access the deployed application at the following URL:

<a href="https://literate-waddle-7pq6x56pv49hpq4q-3000.app.github.dev" target="_blank">Deployed Application</a>

## Database Initialization or Reset

If you wish to initialize or reset the database, run the following command:

```sh
node sqlresetDb.ts
```
## Tests

To run the tests, you can use the following scripts defined in your package.json:

•	Run tests in watch mode: This command runs Jest in watch mode, which means tests will rerun automatically when you make changes to the files.

```sh
npm run test:watch
```

•	Run tests and generate coverage report: This command runs all the tests and generates a coverage report.


```sh
npm run coverage
```

## Documentation

<a href="https://literate-waddle-7pq6x56pv49hpq4q-3000.app.github.dev/docs" target="_blank">Click to view API docs</a>
