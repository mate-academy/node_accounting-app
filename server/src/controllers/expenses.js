import * as expensesService from '../services/expenses.js';

function compareDates(date1, date2) {
  const date1Obj = new Date(date1);
  const date2Obj = new Date(date2);

  switch (true) {
    case date1Obj < date2Obj: {
      return 1;
    }

    case date1Obj > date2Obj && date1Obj !== date2Obj: {
      return -1;
    }

    case date1Obj === date2Obj: {
      return 0;
    }

    default: {
      return 0;
    }
  }
}

export function getAll(req, res) {
  const { user, category, from, to } = req.query;

  let expenses = expensesService.getAll();

  if (user) {
    expenses = expenses.filter(expenses => expenses.user === user);
  }

  if (category) {
    expenses = expenses.filter(expenses => expenses.category === category);
  }

  if (from) {
    expenses =
      expenses.filter(expenses => compareDates(expenses.date, from) < 1);
  }

  if (to) {
    expenses =
      expenses.filter(expenses => compareDates(expenses.date, to) > -1);
  }

  res.send(expenses);
}

export function add(req, res) {
  const {
    user,
    date,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!user || !date || !title || !amount || !category) {
    res.sendStatus(422);
    return;
  }

  const newExpense = expensesService.create(
    user, date, title, amount, category, note,
  );

  res.statusCode = 201;
  res.send(newExpense);
}

export function remove(req, res) {
  const { expenseId } = req.params;

  const filteredExpense = expensesService.remove(expenseId);

  if (!filteredExpense) {
    res.sendStatus(404);
    return;
  }

  res.statusCode = 200;
  res.send(filteredExpense);
}
