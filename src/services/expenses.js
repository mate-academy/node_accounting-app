'use strict'
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const filepath = path.resolve('src/services','expenses.json');

export function read() {
  const data = fs.readFileSync(filepath, 'utf-8');

  return JSON.parse(data);
}

function write(expenses) {
  const data = JSON.stringify(expenses)

  fs.writeFileSync(filepath, data);
}

export function getAll() {
  return read();
}

export function getById(expensesId) {
  const expenses = read();
  const foundExpenses = expenses.find(expense => expense.id === expensesId);

  return foundExpenses || null;
}

export function create({name,title,amount,date,category,note}) {
  const data = getAll();
  const newExpenses = {
    id: uuidv4(),
    name: name,
    title: title,
    amount: amount,
    date: date,
    category: category,
    note: note,
  }

  data.push(newExpenses);
  write(data);

  return newExpenses;
}

export function remove(expensesId) {
  const expenses = read();
  expenses = expenses.filter(expense => expense.id !== expensesId);
}

export function update({id, name,title,amount,date,category,note}) {
  const expense = getById(id);
  
  Object.assign(expense, {name,title,amount,date,category,note});

  return expense;
}