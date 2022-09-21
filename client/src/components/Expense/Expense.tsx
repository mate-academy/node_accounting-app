import React from 'react';

import './expense.scss';
import ExpenseType from '../../ts/types/ExpenseType';

interface Props {
  expense: ExpenseType;
  onRemoveButtonClick: (id: string) => void;
}

const Expense: React.FC<Props> = ({ expense, onRemoveButtonClick }) => {
  const {
    id,
    user,
    date,
    title,
    amount,
    category,
    note,
  } = expense;

  return (
    <div className="Expense">
      <div className="Expense-Content">

        <div className="Expense-User">
          <b>User: </b>
          {user}
        </div>

        <div className="Expense-Date">
          <b>Date: </b>
          {date}
        </div>

        <div className="Expense-Title">
          <b>Title: </b>
          {title}
        </div>

        <div className="Expense-Amount">
          <b>Amount: </b>
          {amount}
        </div>

        <div className="Expense-Category">
          <b>Category: </b>
          {category}
        </div>

        <div className="Expense-Note">
          <b>Note: </b>
          {note}
        </div>
      </div>

      <div className="Expense-Controls">
        <button
          type="button"
          onClick={() => onRemoveButtonClick(id)}
        >X
        </button>
      </div>
    </div>
  );
};

export default Expense;
