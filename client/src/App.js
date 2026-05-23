import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ExpenseChart from "./ExpenseChart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";


function App() {
   const [expenses, setExpenses] = useState([]);
   const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const getColor = (category) => {
  let hash = 0;

  for (let i = 0; i < category.length; i++) {
    hash = category.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 255;
    color += value.toString(16).padStart(2, "0");
  }

  return color;
}
const API = "https://expense-tracker-mlzm.onrender.com/api/expenses";

  // GET
  const fetchExpenses = async () => {
    const res = await axios.get(API);
    setExpenses(res.data);
  }

    useEffect(() => {
    fetchExpenses();
  }, []);
   
const addExpense = async (e) => {
  e.preventDefault();

  if (editId) {
    // UPDATE (PUT)
    await axios.put(`${API}/${editId}`, {
      amount,
      category,
      note,
    });
  } else {
    // CREATE (POST)
    await axios.post(API, {
      amount,
      category,
      note,
    });
  }
  const token = localStorage.getItem("token");
  axios.get(API, {
  headers: {
    Authorization: token,
  },
});

       // reset
    setAmount("");
    setCategory("");
    setNote("");
    setEditId(null);

    // refresh list
    fetchExpenses();
  };
  const deleteExpense = async (id) => {
  await axios.delete(`${API}/${id}`);
  fetchExpenses(); // refresh
};
 
const total = expenses.reduce((sum, e) => sum + e.amount, 0);

const handleEdit = (expense) => {
  setAmount(expense.amount);
  setCategory(expense.category);
  setNote(expense.note);
  setEditId(expense._id);
};


  return (


    <div className={darkMode ? "container dark" : "container"}>
       <h1>Expense Tracker<button onClick={() => setDarkMode(!darkMode)}>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button></h1>

  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>

       <div className="top">
      <div className="card summary">
        <h2>Total</h2>
        <h3>₹{total}</h3>
      </div>
    </div>
        {/* FORM */}
         <div className="card">
      <form onSubmit={addExpense}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button type="submit">
                 {editId ? "Update" : "Add"}
           </button>
      </form>
      </div>

      {/* 🔹 Charts */}
    <div className="chart-box">
      <ExpenseChart expenses={expenses} darkMode={darkMode}/>
    </div>

      {/* LIST */}
      <div className="card">
      <h3>Expenses</h3>

       {expenses.map((e) => (
          <div className="list-item" 
          key={e._id}
          style={{
  borderLeft: `5px solid ${getColor(e.category)}`,
  paddingLeft: "10px",
   marginBottom: "10px"
}}>
            <div>
            <strong>{e.category}</strong> - ₹{e.amount}
            <p>{e.note}</p>
          </div>
          <div>
    <button onClick={() => handleEdit(e)}>Edit</button>
    <button onClick={() => deleteExpense(e._id)}>Delete</button>
     </div>
     </div>
      ))}
      </div>
      </div>
  );
}

export default App;
