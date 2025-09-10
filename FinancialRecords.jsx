import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const FinancialRecords = () => {
  const [records, setRecords] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    axios.get("http://localhost:5000/api/financials", { headers: { Authorization: auth.token } })
      .then(res => setRecords(res.data));
  }, [auth.token]);

  return (
    <div>
      <h3>Financial Records</h3>
      <table>
        <thead>
          <tr><th>Title</th><th>Amount</th><th>Type</th><th>Date</th></tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record._id}>
              <td>{record.title}</td>
              <td>{record.amount}</td>
              <td>{record.type}</td>
              <td>{record.date ? new Date(record.date).toLocaleDateString() : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialRecords;
