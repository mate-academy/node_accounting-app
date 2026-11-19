/* eslint-disable no-console */
'use strict';

const crypto = require('crypto');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

const DATA_DIR = path.join(__dirname, '..', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const EXPENSES_FILE = path.join(DATA_DIR, 'expenses.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, '[]');
  }

  if (!fs.existsSync(EXPENSES_FILE)) {
    fs.writeFileSync(EXPENSES_FILE, '[]');
  }
}

function readUsers() {
  ensureDataDir();

  const data = fs.readFileSync(USERS_FILE, 'utf8');

  return JSON.parse(data);
}

function writeUsers(users) {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function readExpenses() {
  ensureDataDir();

  const data = fs.readFileSync(EXPENSES_FILE, 'utf8');

  return JSON.parse(data);
}

function writeExpenses(expenses) {
  ensureDataDir();
  fs.writeFileSync(EXPENSES_FILE, JSON.stringify(expenses, null, 2));
}

function generateId() {
  return crypto.randomUUID();
}

function sendJson(res, status, data) {
  res.status(status).json(data);
}

function sendError(res, status, message) {
  res.status(status).json({ error: message });
}

// Users API
app.post('/users', (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return sendError(res, 400, 'Name is required');
  }

  const users = readUsers();
  const user = {
    id: generateId(), name: name.trim(),
  };

  users.push(user);
  writeUsers(users);
  sendJson(res, 201, user);
});

app.get('/users', (req, res) => {
  const users = readUsers();

  sendJson(res, 200, users);
});

app.get('/users/:id', (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === req.params.id);

  if (!user) {
    return sendError(res, 404, 'User not found');
  }
  sendJson(res, 200, user);
});

app.patch('/users/:id', (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return sendError(res, 400, 'Name is required');
  }

  const users = readUsers();
  const index = users.findIndex(u => u.id === req.params.id);

  if (index === -1) {
    return sendError(res, 404, 'User not found');
  }
  users[index].name = name.trim();
  writeUsers(users);
  sendJson(res, 200, users[index]);
});

app.delete('/users/:id', (req, res) => {
  const users = readUsers();
  const index = users.findIndex(u => u.id === req.params.id);

  if (index === -1) {
    return sendError(res, 404, 'User not found');
  }
  users.splice(index, 1);
  writeUsers(users);
  res.status(204).end();
});

// Expenses API
app.post('/expenses', (req, res) => {
  const { spentAt, title, amount, userId, category, note } = req.body;

  if (!spentAt || !title || amount === undefined || !userId) {
    return sendError(res, 400,
      'spentAt, title, amount, and userId are required');
  }

  if (!Number.isFinite(Number(amount))) {
    return sendError(res, 400, 'amount must be a number');
  }

  const users = readUsers();

  if (!users.find(u => u.id === userId)) {
    return sendError(res, 400, 'User not found');
  }

  const expenses = readExpenses();
  const expense = {
    id: generateId(),
    spentAt,
    title,
    amount: Number(amount),
    userId,
    category: category || '',
    note: note || '',
  };

  expenses.push(expense);
  writeExpenses(expenses);
  sendJson(res, 201, expense);
});

function filterExpenses(expenses, query) {
  let result = expenses;

  if (query.userId) {
    result = result.filter(e => e.userId === query.userId);
  }

  if (query.from) {
    result = result.filter(e => e.spentAt >= query.from);
  }

  if (query.to) {
    result = result.filter(e => e.spentAt <= query.to);
  }

  if (query.categories) {
    const categories = query.categories
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    if (categories.length > 0) {
      result = result.filter(e => categories.includes(e.category));
    }
  }

  return result;
}

app.get('/expenses', (req, res) => {
  const expenses = readExpenses();
  const filtered = filterExpenses(expenses, req.query);

  sendJson(res, 200, filtered);
});

app.get('/expenses/:id', (req, res) => {
  const expenses = readExpenses();
  const expense = expenses.find(e => e.id === req.params.id);

  if (!expense) {
    return sendError(res, 404, 'Expense not found');
  }
  sendJson(res, 200, expense);
});

app.patch('/expenses/:id', (req, res) => {
  const expenses = readExpenses();
  const index = expenses.findIndex(e => e.id === req.params.id);

  if (index === -1) {
    return sendError(res, 404, 'Expense not found');
  }

  const { spentAt, title, amount, userId, category, note } = req.body;

  if (userId !== undefined) {
    const users = readUsers();

    if (!users.find(u => u.id === userId)) {
      return sendError(res, 400, 'User not found');
    }
    expenses[index].userId = userId;
  }

  if (spentAt !== undefined) {
    expenses[index].spentAt = spentAt;
  }

  if (title !== undefined) {
    expenses[index].title = title;
  }

  if (amount !== undefined) {
    if (!Number.isFinite(Number(amount))) {
      return sendError(res, 400, 'amount must be a number');
    }

    expenses[index].amount = Number(amount);
  }

  if (category !== undefined) {
    expenses[index].category = category;
  }

  if (note !== undefined) {
    expenses[index].note = note;
  }
  writeExpenses(expenses);
  sendJson(res, 200, expenses[index]);
});

app.delete('/expenses/:id', (req, res) => {
  const expenses = readExpenses();
  const index = expenses.findIndex(e => e.id === req.params.id);

  if (index === -1) {
    return sendError(res, 404, 'Expense not found');
  }
  expenses.splice(index, 1);
  writeExpenses(expenses);
  res.status(204).end();
});

// Stats endpoint
app.get('/stats', (req, res) => {
  const expenses = readExpenses();
  const filtered = filterExpenses(expenses, req.query);
  const totalAmount = filtered.reduce((sum, e) => sum + Number(e.amount), 0);
  const byCategory = {};

  for (const e of filtered) {
    const cat = e.category || 'uncategorized';

    byCategory[cat] = (byCategory[cat] || 0) + Number(e.amount);
  }

  sendJson(res, 200, {
    totalAmount,
    count: filtered.length,
    byCategory,
  });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
