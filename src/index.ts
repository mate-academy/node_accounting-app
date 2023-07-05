import express from 'express';
import cors from 'cors';
import { router as expensesRouter } from './routes/expenses';
import { router as statsRouter } from './routes/stats';

const PORT = +process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use('/expenses', express.json(), expensesRouter);
app.use('/stats', statsRouter);

app.listen(PORT, () => {
  console.log(`
  Server is running on http://localhost:${PORT}

  Available endpoints:

  - expenses

    GET http://localhost:${PORT}/expenses
    GET http://localhost:${PORT}/expenses/:expenseId
    POST http://localhost:${PORT}/expenses
    PATCH http://localhost:${PORT}/expenses/:expenseId
    DELETE http://localhost:${PORT}/expenses/:expenseId

  - stats (can be combined)

    GET http://localhost:${PORT}/stats?from={startDate}&to={endDate}
    GET http://localhost:${PORT}/stats?user={userName}
    GET http://localhost:${PORT}/stats?category={categoryTitle}[&category={categoryTitle}...]
  `);
});
