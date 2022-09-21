import React, { useState } from 'react';

import './newexpense.scss';
import ExpenseType from '../../ts/types/ExpenseType';

interface Props {
  onSubmitNewExpenseButtonClick: (expense: Omit<ExpenseType, 'id'>) => Promise<void>;
}

const initialNewExpense: Omit<ExpenseType, 'id'> = {
  user: '',
  date: '',
  title: '',
  amount: 0,
  category: '',
  note: '',
};

const NewExpense: React.FC<Props> = ({ onSubmitNewExpenseButtonClick }) => {
  const [
    newExpense,
    setNewExpense,
  ] = useState<Omit<ExpenseType, 'id'>>(initialNewExpense);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSubmitNewExpenseButtonClick(newExpense);

    setNewExpense(initialNewExpense);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;

    setNewExpense(prevState => (
      {
        ...prevState,
        [name]: value,
      }
    ));
  };

  return (
    <div className="NewExpense">
      <form className="NewExpense-Form" onSubmit={handleSubmit}>
        <fieldset className="NewExpense-Fieldset">
          <legend>
            New expense
          </legend>

          <label>
            {`User: `}
            <input
              type="text"
              name="user"
              value={newExpense.user}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            {`Date: `}
            <input
              type="date"
              name="date"
              value={newExpense.date}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            {`Title: `}
            <input
              type="text"
              name="title"
              value={newExpense.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            {`Amount: `}
            <input
              type="number"
              name="amount"
              value={newExpense.amount}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            {`Category: `}
            <input
              type="text"
              name="category"
              value={newExpense.category}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            {`Note: `}
            <textarea
              name="note"
              cols={30}
              rows={10}
              value={newExpense.note}
              onChange={handleChange}
            ></textarea>
          </label>

          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
};

export default NewExpense;
