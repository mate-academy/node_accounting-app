import { client } from './axios';

import ExpenseType from '../ts/types/ExpenseType';

const URL = '/expenses';

export const expense = {
  getAll(query = ''): Promise<ExpenseType[]> {
    return client.get(URL + query);
  },
  add(data: Omit<ExpenseType, 'id'>): Promise<ExpenseType> {
    return client.post(URL, data);
  },
  patch(
    id: string,
    data: Partial<Omit<ExpenseType, 'id'>>,
  ): Promise<ExpenseType> {
    return client.patch(`${URL}/${id}`, data);
  },
  put(data: ExpenseType): Promise<ExpenseType> {
    return client.patch(`${URL}/${data.id}`, data);
  },
  remove(id: string): Promise<ExpenseType> {
    return client.delete(`${URL}/${id}`);
  },
};


