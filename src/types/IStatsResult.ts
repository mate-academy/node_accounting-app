import { IExpense } from './IExpense';

export interface IStatsResult {
  user: string,
  from: string,
  to: string,
  categories: string[],
  totalEntires: number,
  totalAmount: number,
  expenses: IExpense[],
}
