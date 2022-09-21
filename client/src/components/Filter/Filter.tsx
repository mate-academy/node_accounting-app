import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './filter.scss';

import { expense as expenseAPI } from '../../api/expense';

const mapSelect = (array: any[]) => {
  return (
    array.map(current => (
      <option key={current} value={current}>{current}</option>
    ))
  );
};

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [users, setUsers] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;

    if (value === '') {
      searchParams.delete(name);
    } else {
      searchParams.set(name, value);
    }

    setSearchParams(searchParams);
  };

  useEffect(() => {
    expenseAPI.getAll().then(expenses => {
      const users = [];
      const categories = [];

      expenses.forEach(expense => {
        const { user, category } = expense;

        if (!users.includes(user)) {
          users.push(user);
        }

        if (!categories.includes(category)) {
          categories.push(category);
        }
      });

      setUsers(users);
      setCategories(categories);
    });
  }, []);

  return (
    <div className="Filter">
      <form className="Filter-Form">
        <fieldset className="Filter-Fieldset">
          <legend>
            Filter
          </legend>

          <label className="Filter-Label">
            User
            <select
              name="user"
              value={searchParams.get('user') || ''}
              onChange={handleChange}
            >
              <option
                value=""
              >
                All
              </option>

              {mapSelect(users)}
            </select>
          </label>

          <div className="Filter-Dates">
            <label className="Filter-Label">
              From
              <input
                type="date"
                name="from"
                value={searchParams.get('from') || ''}
                onChange={handleChange}
              />
            </label>

            <label className="Filter-Label">
              To
              <input
                type="date"
                name="to"
                value={searchParams.get('to') || ''}
                onChange={handleChange}
              />
            </label>
          </div>

          <label className="Filter-Label">
            Category

            <select
              name="category"
              value={searchParams.get('category') || ''}
              onChange={handleChange}
            >
              <option
                value=""
              >
                All
              </option>

              {mapSelect(categories)}
            </select>
          </label>
        </fieldset>
      </form>
    </div>
  );
};

export default Filter;
