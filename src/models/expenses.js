'use strict';

const {
  getDataFromStorage,
  saveDataToStorage,
} = require('../controllers/storage');

const { v4: uuidv4 } = require('uuid');

const expensesStorage = 'expenses.json';

const getAll = () => getDataFromStorage(expensesStorage);

const getById = (id) => {
  const expenses = getDataFromStorage(expensesStorage);
  const foundExpense = expenses.find(expense => expense.id === id);

  return foundExpense || null;
};

const create = (expenseData) => {
  const expenses = getDataFromStorage(expensesStorage);
  const parsedDate = new Date(expenseData.date);

  if (parsedDate.toString() === 'Invalid Date') {
    return null;
  }

  const newExpense = {
    ...expenseData,
    date: parsedDate.getTime(),
    id: uuidv4(),
  };

  expenses.push(newExpense);

  saveDataToStorage(expensesStorage, expenses);

  return newExpense;
};

const patchById = (id, patchData) => {
  const expenses = getDataFromStorage(expensesStorage);
  const foundExpenseIdx = expenses.findIndex(expense => expense.id === id);

  if (foundExpenseIdx === -1) {
    return null;
  }

  const foundExpense = expenses[foundExpenseIdx];
  const patchedExpense = {
    ...foundExpense,
    ...patchData,
  };

  expenses[foundExpenseIdx] = patchedExpense;

  saveDataToStorage(expensesStorage, expenses);

  return patchedExpense;
};

const removeById = (id) => {
  const expenses = getDataFromStorage(expensesStorage);
  const foundExpenseIdx = expenses.findIndex(expense => expense.id === id);

  if (foundExpenseIdx === -1) {
    return null;
  }

  expenses.splice(foundExpenseIdx, 1);

  saveDataToStorage(expensesStorage, expenses);

  return 1;
};

module.exports = {
  getAll,
  getById,
  create,
  patchById,
  removeById,
};
