'use strict';
import { Request, Response } from 'express';
import expensesModel from '../models/expenses';
import { IStatsResult } from '../types/IStatsResult';

const getStats = (
  req: Request<never, never, never, {
    from: string,
    to: string,
    user: string,
    category: [],
  }>,
  res: Response<IStatsResult, never>,
) => {
  const {
    from = null,
    to = null,
    user = null,
    category = [],
  } : {
    from: null | string,
    to: null | string,
    user: null | string,
    category: string[]
  } = req.query;

  const statsResult: IStatsResult = {
    user: '',
    from: '',
    to: '',
    categories: [],
    totalEntires: 0,
    totalAmount: 0,
    expenses: [],
  };

  let filteredExpenses = expensesModel.getAll();

  if (user) {
    statsResult.user = user;

    filteredExpenses = filteredExpenses
      .filter(expense => expense.user === user);
  }

  if (category.length) {
    statsResult.categories = category;

    filteredExpenses = filteredExpenses
      .filter(expense => category.includes(expense.category));
  }

  if (from || to) {
    const fromDate = from && new Date(from);
    const toDate = to && new Date(to);

    let fromTime = 0;

    if (fromDate && fromDate.toString() !== 'Invalid Date') {
      fromTime = fromDate.getTime();
      statsResult.from = fromDate.toString();
    }

    let toTime = Infinity;

    if (toDate && toDate.toString() !== 'Invalid Date') {
      toTime = toDate.getTime();
      statsResult.to = toDate.toString();
    }

    if (fromTime > toTime) {
      res.sendStatus(400);

      return;
    }

    filteredExpenses = filteredExpenses
      .filter(expense => expense.date >= fromTime && expense.date <= toTime);
  }

  statsResult.totalEntires = filteredExpenses.length;

  statsResult.totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + +expense.amount, 0,
  );

  statsResult.expenses = filteredExpenses;

  res.send(statsResult);
}

export default {
  getStats,
};
