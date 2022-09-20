'use strict';

const expensesModel = require('../models/expenses');

const getAll = (req, res) => {
  res.send(expensesModel.getAll());
};

const getById = (req, res) => {
  const expense = expensesModel.getById(req.params.expenseId);

  if (!expense) {
    res.statusCode = 404;
    res.end();

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const {
    user = null,
    date = null,
    title = null,
    amount = null,
    category = null,
  } = req.body;

  if (!user || !date || !title || !amount || !category) {
    res.statusCode = 400;
    res.end();

    return;
  }

  const newExpense = expensesModel.create(req.body);

  if (!newExpense) {
    res.statusCode = 422;
    res.end();

    return;
  }

  res.send(newExpense);
};

const patch = (req, res) => {
  const { expenseId } = req.params;

  const patchedExpense = expensesModel.patchById(expenseId, {
    ...req.body,
    id: expenseId,
  });

  if (!patchedExpense) {
    res.statusCode = 404;
    res.end();

    return;
  }

  res.send(patchedExpense);
};

const remove = (req, res) => {
  const { expenseId } = req.params;

  const removed = expensesModel.removeById(expenseId);

  if (!removed) {
    res.statusCode = 404;
    res.end();

    return;
  }

  res.statusCode = 204;
  res.end();
};

module.exports = {
  getAll,
  getById,
  create,
  patch,
  remove,
};
