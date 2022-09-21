import * as handlers from '../handlers.js';

const filePath = 'src/data/expenses/expenses.json';

export function readExpensesSync() {
  return JSON.parse(handlers.readFileSync(filePath).toString());
}

export function writeFile(data) {
  handlers.writeFile(filePath, JSON.stringify(data));
}
