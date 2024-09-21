import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  // Fetch expenses from the backend when the component mounts
  useEffect(() => {
    console.log('Fetching expenses...');
    axios.get('/api/expenses') // Ensure this matches the proxy path
      .then(response => {
        console.log('Expenses fetched:', response.data);
        if (Array.isArray(response.data)) {
          setExpenses(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => console.error('Error fetching expenses:', error));
  }, []);

  // Add a new expense
  const addExpense = () => {
    console.log('Adding expense:', { title, amount });
    axios.post('/api/expenses', { title, amount }) // Ensure this matches the proxy path
      .then(response => {
        console.log('Expense added:', response.data);
        if (response.data && typeof response.data === 'object') {
          setExpenses([...expenses, response.data]);
          setTitle(''); // Clear the title input
          setAmount(''); // Clear the amount input
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => console.error('Error adding expense:', error));
  };

  // Delete an expense
  const deleteExpense = (id) => {
    console.log('Deleting expense with id:', id);
    axios.delete(`/api/expenses/${id}`) // Ensure this matches the proxy path
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
          className="input"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="input"
        />
        <button onClick={addExpense} className="button">Add Expense</button>
      </div>
      <ul>
        {Array.isArray(expenses) ? (
          expenses.map(expense => (
            <li key={expense.id}>
              <span>{expense.title}: ${expense.amount}</span>
              <button onClick={() => deleteExpense(expense.id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No expenses found</li>
        )}
      </ul>
    </div>
  );
}

export default App;