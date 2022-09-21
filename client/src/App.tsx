import React, { useCallback, useEffect, useState } from 'react';

import './app.scss';

import NewExpense from './components/NewExpense';
import Expenses from './components/Expenses';
import Filter from './components/Filter';

import { expense as expenseAPI } from './api/expense';

import ExpenseType from './ts/types/ExpenseType';
import { useSearchParams } from 'react-router-dom';

const App = () => {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    expenseAPI.getAll(`?${searchParams.toString()}`).then(setExpenses);
  }, [searchParams]);

  const createExpense = useCallback(async (expense: Omit<ExpenseType, 'id'>) => {
    const newExpense = await expenseAPI.add(expense);

    setExpenses(prevState => [
      ...prevState, newExpense,
    ]);
  }, []);

  const removeExpense = useCallback(async (id: string) => {
    const removed = await expenseAPI.remove(id);

    setExpenses(prevState => {
      return prevState.filter(expense => expense.id !== removed.id);
    });
  }, []);

  return (
    <div className="App">
      <NewExpense onSubmitNewExpenseButtonClick={createExpense} />

      <Filter />

      <Expenses
        expenses={expenses}
        onRemoveExpenseClick={removeExpense}
      />
    </div>
  );
};

export default App;
