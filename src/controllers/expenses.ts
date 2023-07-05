'use strict';
import { Request, Response } from 'express';
import expensesModel from '../models/expenses';
import { IExpense } from '../types/IExpense';

const getAll = (
  _req: never,
   res: Response<IExpense[], never>,
) => {
  res.send(expensesModel.getAll());
};

const getById = (
  req: Request<{ expenseId: string }, never, never, never, never>,
  res: Response<IExpense, never>,
) => {
  const expense: IExpense = expensesModel.getById(req.params.expenseId);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (
  req: Request<never, never, Omit<IExpense, 'id'>, never>,
  res: Response<IExpense, never>,
) => {
  const {
    user = null,
    date = null,
    title = null,
    amount = null,
    category = null,
  } = req.body;

  if (!user || !date || !title || !amount || !category) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesModel.create(req.body);

  if (!newExpense) {
    res.sendStatus(422);

    return;
  }

  res.send(newExpense);
}

const patch = (
  req: Request<{ expenseId: string }, never, IExpense, never>,
  res: Response<IExpense, never>,
) => {
  const { expenseId } = req.params;

  const pathcedExpense = expensesModel.patchById(expenseId, {
    ...req.body,
    id: expenseId,
  });

  if (!pathcedExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(pathcedExpense);
};

const remove = (
  req: Request<{ expenseId: string }, never, IExpense, never>,
  res: Response<never, never>,
) => {
  const { expenseId } = req.params;

  const removed = expensesModel.removeById(expenseId);

  if (!removed) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 204;
  res.end();
};

export default {
  getAll,
  getById,
  create,
  patch,
  remove,
};
