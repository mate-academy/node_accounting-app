'use strict';
import { v4 as uuidv4 } from 'uuid';
import storageController from '../controllers/storage';
import { IExpense } from '../types/IExpense';

const expensesStorage = 'expenses.json';

const getAll = () => storageController.getDataFromStorage<IExpense>(expensesStorage);

const getById = (id: string): IExpense | null => {
  const expenses = storageController.getDataFromStorage<IExpense>(expensesStorage);
  const foundExpense = expenses.find(expense => expense.id === id);

  return foundExpense || null;
};

const create = (expenseData: Omit<IExpense, 'id'>): IExpense | null => {
  const expenses = storageController.getDataFromStorage<IExpense>(expensesStorage);
  const parsedDate = new Date(expenseData.date);

  if (parsedDate.toString() === 'Invalid Date') {
    return null;
  }

  const newExpense: IExpense = {
    ...expenseData,
    date: parsedDate.getTime(),
    id: uuidv4(),
  };

  expenses.push(newExpense);

  storageController.saveDataToStorage(expensesStorage, expenses);

  return newExpense;
};

const patchById = (
  id: string,
  patchData: Omit<IExpense, 'date'>,
): IExpense | null => {
  const expenses = storageController.getDataFromStorage<IExpense>(expensesStorage);
  const foundExpenseIdx = expenses.findIndex(expense => expense.id === id);
  const toPatch: Omit<IExpense, 'date' | 'id'> = {
    user: patchData.user,
    title: patchData.title,
    amount: patchData.amount,
    category: patchData.category,
  };

  if (foundExpenseIdx === -1) {
    return null;
  }

  const foundExpense = expenses[foundExpenseIdx];
  const patchedExpense = {
    ...foundExpense,
    ...toPatch,
  };

  expenses[foundExpenseIdx] = patchedExpense;

  storageController.saveDataToStorage(expensesStorage, expenses);

  return patchedExpense;
};

const removeById = (id: string): number | null => {
  const expenses = storageController.getDataFromStorage<IExpense>(expensesStorage);
  const foundExpenseIdx = expenses.findIndex(expense => expense.id === id);

  if (foundExpenseIdx === -1) {
    return null;
  }

  expenses.splice(foundExpenseIdx, 1);

  storageController.saveDataToStorage(expensesStorage, expenses);

  return 1;
}

export default {
  getAll,
  getById,
  create,
  patchById,
  removeById,
};
