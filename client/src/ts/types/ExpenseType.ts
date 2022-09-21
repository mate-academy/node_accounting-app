interface ExpenseType {
  id: string;
  user: string;
  date: string;
  title: string;
  amount: number;
  category: string;
  note?: string;
}

export default ExpenseType;
