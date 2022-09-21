import express from 'express';
import cors from 'cors';

import { router as expensesRouter } from './routes/expenses.js';
import path from 'path';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.static(path.resolve('client/build')));
app.use('/api/expenses', expensesRouter);

app.listen(PORT, () => {
  console.log(`The server is working on port ${PORT}`);
});
