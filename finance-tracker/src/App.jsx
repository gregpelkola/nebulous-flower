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

  
}