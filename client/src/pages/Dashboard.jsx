import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseChart from "../ExpenseChart";
import Navbar from "../components/Navbar";


function Dashboard() {
   const [expenses, setExpenses] = useState([]);
   const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");
  const [showFilter, setShowFilter] = useState(false);
const [filterType, setFilterType] = useState("all");

  

    
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
  const token = localStorage.getItem("token");

  const res = await axios.get(API, {
    headers: {
      Authorization: token,
    },
  });

  setExpenses(res.data);
};

    useEffect(() => {
    fetchExpenses();
  }, []);
   
  const addExpense = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (editId) {
    await axios.put(
      `${API}/${editId}`,
      {
        type,
        category,
        amount,
        date,
        note,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } else {
    await axios.post(
      API,
      {
        type,
        category,
        amount,
        date,
        note,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  setAmount("");
  setCategory("");
  setNote("");
  setEditId(null);

  fetchExpenses();
};

  const deleteExpense = async (id) => {
  await axios.delete(`${API}/${id}`);
  fetchExpenses(); // refresh
};
 


  function handleEdit(expense) {
    setAmount(expense.amount);
    setCategory(expense.category);
    setNote(expense.note);
    setEditId(expense._id);
  }

    const name = localStorage.getItem("name");
console.log(name);




  const income = expenses
  .filter((e) => e.type === "income")
  .reduce((sum, e) => sum + Number(e.amount), 0);

const expense = expenses
  .filter((e) => e.type === "expense")
  .reduce((sum, e) => sum + Number(e.amount), 0);

const balance = income - expense;
 
const filteredExpenses =
  filterType === "all"
    ? expenses
    : expenses.filter(
        (e) => e.type === filterType
      );



  return (

  <div className={darkMode ? "container dark" : "container"}>
  
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    
 

    <Navbar />

    <h1>Welcome, {name} 👋</h1>

    <div className="summary-container">
  <div className="summary-card income">
    <h3> Income</h3>
    <p>₹{income}</p>
  </div>

  <div className="summary-card expense">
    <h3> Expense</h3>
    <p>₹{expense}</p>
  </div>

  <div className="summary-card balance">
    <h3>Balance</h3>
    <p>₹{balance}</p>
  </div>
</div>


    {/* FORM */}
    <div className="main-card">
      <h2>Add Transaction</h2>

      <div className="card">
        <form onSubmit={addExpense}>

          <select
  value={type}
  onChange={(e) => setType(e.target.value)}
>
  <option value="expense">Expense</option>
  <option value="income">Income</option>
</select>
 
 <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">Select Category</option>
  <option value="Food">Food</option>
  <option value="Travel">Travel</option>
  <option value="Shopping">Shopping</option>
  <option value="Bills">Bills</option>
  <option value="Salary">Salary</option>
  <option value="Other">Other</option>
</select>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
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
    </div>

    {/* CHART */}
    <div className="chart-box">
      <ExpenseChart
        expenses={expenses}
        darkMode={darkMode}
      />
    </div>

    {/* LIST */}
    <div className="card">
      <h3>Transaction List</h3>

       {/* Filter button */}
  <button onClick={() => setShowFilter(!showFilter)}>
    Filter
  </button>

   {/* Show dropdown only when clicked */}
  {showFilter && (
    <select
      value={filterType}
      onChange={(e) => setFilterType(e.target.value)}
    >
      <option value="all">All</option>
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>
  )}

{/* Transaction list */}

      {filteredExpenses.map((e) => (
        <div
          className="list-item"
          key={e._id}
          style={{
            borderLeft: `5px solid ${getColor(e.category)}`,
            paddingLeft: "10px",
            marginBottom: "10px",
          }}
        >
          <div>
            <p>{e.type}</p>
            <strong>{e.category}</strong> - ₹{e.amount}
            <p>{e.note}</p>
          </div>

          <div>
            <button onClick={() => handleEdit(e)}>
              Edit
            </button>

            <button
              onClick={() => deleteExpense(e._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
    
        
    

export default Dashboard;