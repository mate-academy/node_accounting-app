import { Router } from 'express';
import expensesController from '../controllers/expenses';

export const router = Router();

router
  .get('/', expensesController.getAll)
  .get('/:expenseId', expensesController.getById)
  .post('/', expensesController.create)
  .patch('/:expenseId', expensesController.patch)
  .delete('/:expenseId', expensesController.remove);
