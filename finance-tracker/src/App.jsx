import React, { useState, useEffect} from "react";
import axios from "axios";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/expenses")
    .then(response => setExpenses(response.data))
    .catch(error => console.error(error)); 
  }, []);

  const addExpense = () => {
    axios.post("http://localhost:3001/expenses", { name, amount})
    .then(response => setExpenses([...expenses, response.data]))
    .catch(error => console.error(error));
  };

  const deleteExpense = (id) => {
    axios.delete(`http://localhost:3001/expenses/${id}`)
    .then(() => setExpenses(expenses.filter(expense => expense.id !== id)))
    .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={addExpense}>Add Expense</button>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.name}: ${expense.amount}
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;