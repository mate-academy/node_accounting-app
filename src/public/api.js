import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000/';

export function getAll() {
  return axios.get('expenses')
    .then(res => res.data);
};

export function add(expenses) {
  return axios.post('expenses', {...expenses})
    .then(res => res.data);
};