import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]); // State to store expenses
  const [title, setTitle] = useState(''); // State to store the title of a new expense
  const [amount, setAmount] = useState(''); // State to store the amount of a new expense

  // Fetch expenses from the backend when the component mounts
  useEffect(() => {
    console.log('Fetching expenses...');
    axios.get('/api/expenses') 
      .then(response => {
        console.log('Expenses fetched:', response.data);
        if (Array.isArray(response.data)) {
          setExpenses(response.data); // Set the fetched expenses to state
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => console.error('Error fetching expenses:', error));
  }, []);

  // Add a new expense
  const addExpense = () => {
    console.log('Adding expense:', { title, amount });
    axios.post('/api/expenses', { title, amount }) 
      .then(response => {
        console.log('Expense added:', response.data);
        if (response.data && typeof response.data === 'object') {
          setExpenses([...expenses, response.data]); // Add the new expense to the state
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
    axios.delete(`/api/expenses/${id}`) 
      .then(() => {
        console.log('Expense deleted');
        setExpenses(expenses.filter(expense => expense.id !== id)); // Remove the deleted expense from the state
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
          onChange={e => setTitle(e.target.value)} // Update title state on input change
          className="input"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)} // Update amount state on input change
          className="input"
        />
        <button onClick={addExpense} className="button">Add Expense</button> {/* Button to add a new expense */}
      </div>
      <ul>
        {Array.isArray(expenses) ? ( // Check if expenses is an array
          expenses.map(expense => (
            <li key={expense.id}> {/* Unique key for each expense item */}
              <span>{expense.title}: ${expense.amount}</span> {/* Display expense title and amount */}
              <button onClick={() => deleteExpense(expense.id)}>Delete</button> {/* Button to delete an expense */}
            </li>
          ))
        ) : (
          <li>No expenses found</li> // Message when no expenses are available
        )}
      </ul>
    </div>
  );
}

export default App;