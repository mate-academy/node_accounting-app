import express from 'express';

import * as expensesController from '../controllers/expenses.js';

export const router = express.Router();

router.get('/', expensesController.getAll);

router.post('/', express.json(), expensesController.add);

router.delete('/:expenseId', expensesController.remove);
