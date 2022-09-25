'use strict'
import * as api from './api.js'
const tbody = document.querySelector('tbody');
const form = document.querySelector('form');
console.log(form);
console.log(tbody);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  console.log(formData);
})

// const expenses = getAll();
// console.log(expenses);
// console.log(123);

// for (const expense of expenses) {
//   const tr = document.createElement('tr');
//   for (let item of expense) {
//     const td = document.createElement('td');
//     td.textContent = item;
//     tr.append(td);
//   }
//   tbody.append(tr);
// }
