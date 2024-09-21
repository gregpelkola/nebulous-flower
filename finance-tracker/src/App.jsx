import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    console.log('Fetching expenses...');
    axios.get('http://localhost:5173/expenses')
      .then(response => {
        console.log('Expenses fetched:', response.data);
        setExpenses(response.data);
      })
      .catch(error => console.error('Error fetching expenses:', error));
  }, []);

  const addExpense = () => {
    console.log('Adding expense:', { title, amount });
    axios.post('http://localhost:5173/expenses', { title, amount })
      .then(response => {
        console.log('Expense added:', response.data);
        setExpenses([...expenses, response.data]);
      })
      .catch(error => console.error('Error adding expense:', error));
  };

  const deleteExpense = (id) => {
    console.log('Deleting expense with id:', id);
    axios.delete(`http://localhost:5173/expenses/${id}`)
      .then(() => {
        console.log('Expense deleted');
        setExpenses(expenses.filter(expense => expense.id !== id));
      })
      .catch(error => console.error('Error deleting expense:', error));
  };

  return (
    <div className="container"> 
      <h1 className="title">Expense Tracker</h1> 
      <div className="form-container"> 
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.title}: ${expense.amount}
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;