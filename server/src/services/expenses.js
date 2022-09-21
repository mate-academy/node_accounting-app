import { v4 as uuidv4 } from 'uuid';
import * as expensesHandler from '../data/expenses/handlers.js';

let expenses = expensesHandler.readExpensesSync();

export function getAll() {
  return expenses;
}

export function create(
  user, date, title, amount, category, note,
) {
  const newExpense = {
    id: uuidv4(),
    user,
    date,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  expensesHandler.writeFile(expenses);

  return newExpense;
}

export function remove(id) {
  let filteredExpense = null;

  expenses = expenses.filter(expense => {
    if (expense.id === id) {
      filteredExpense = expense;

      return false;
    }

    return true;
  });

  expensesHandler.writeFile(expenses);

  return filteredExpense;
}
