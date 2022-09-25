'use strict';
import express from 'express';
import cors from 'cors';
import {router as expensesRouter} from './routes/expenses.js'
import {router as statisticsRouter} from './routes/statistics.js';

const app = express();

app.use(cors());
app.use('/expenses', expensesRouter);
app.use('/statistics', statisticsRouter);

app.listen(5000, () => {
  console.log(`
  Server is running on http://localhost:5000

  Available endpoints:

  - expenses

    GET http://localhost:5000/expenses
    GET http://localhost:5000/expenses/:expenseId
    POST http://localhost:5000/expenses
    PATCH http://localhost:5000/expenses/:expenseId
    DELETE http://localhost:5000/expenses/:expenseId

  - stats (can be combined)

    GET http://localhost:5000/stats?from={startDate}&to={endDate}
    GET http://localhost:5000/stats?user={userName}
    GET http://localhost:5000/stats?category={categoryTitle}[&category={categoryTitle}...]
  `);
});