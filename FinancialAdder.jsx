import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const FinancialAdder = ({ onAdded }) => {
  const { auth } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [date, setDate] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:5000/api/financials",
      { title, amount, type, date },
      { headers: { Authorization: auth.token } }
    );
    setTitle(""); setAmount(""); setType("income"); setDate("");
    onAdded && onAdded();
    alert("Record added!");
  };

  return (
    <form onSubmit={handleAdd}>
      <h4>Add Financial Record</h4>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" required />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <button type="submit">Add Record</button>
    </form>
  );
};

export default FinancialAdder;
