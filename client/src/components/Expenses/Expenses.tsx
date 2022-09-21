import React from 'react';

import './expenses.scss';

import Expense from '../Expense';
import ExpenseType from '../../ts/types/ExpenseType';

interface Props {
  expenses: ExpenseType[];
  onRemoveExpenseClick: (id: string) => Promise<void>;
}

const Expenses: React.FC<Props> = ({ expenses, onRemoveExpenseClick }) => {
  return (
    <>
      {expenses.map(expense => (
        <Expense
          key={expense.id}
          expense={expense}
          onRemoveButtonClick={onRemoveExpenseClick}
        />
      ))}
    </>
  );
};

export default Expenses;
