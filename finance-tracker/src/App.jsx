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
}