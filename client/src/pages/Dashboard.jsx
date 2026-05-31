import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaEdit,
  FaTrash
} from "react-icons/fa";


function Dashboard() {

   const [expenses, setExpenses] = useState([]);
   const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [editId, setEditId] = useState(null);


  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");
  const [showFilter, setShowFilter] = useState(false);
 const [filterType, setFilterType] = useState("all");

const navigate = useNavigate();



const categoryTotals = {};

expenses.forEach((e) => {
  if (e.type === "expense") {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount;
  }
});

const topCategory = Object.keys(categoryTotals).reduce(
  (a, b) =>
    categoryTotals[a] > categoryTotals[b] ? a : b,
  ""
);

const API = "https://expense-tracker-mlzm.onrender.com/api/expenses";
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
  .reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

const expense = expenses
  .filter((e) => e.type === "expense")
  .reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

const balance = income - expense;
const filteredExpenses =
  filterType === "income"
    ? expenses.filter(
        (e) => e.type === "income"
      )

    : filterType === "expense"
    ? expenses.filter(
        (e) => e.type === "expense"
      )
          : filterType === "today"
    ? expenses.filter((e) => {
        const expenseDate =
          new Date(e.date);

        const currentDate =
          new Date();

        return (
          expenseDate.toDateString() ===
          currentDate.toDateString()
        );
      })



    : filterType === "month"
    ? expenses.filter((e) => {
        const expenseDate =
          new Date(e.date);

        const currentDate =
          new Date();

        return (
          expenseDate.getMonth() ===
            currentDate.getMonth() &&
          expenseDate.getFullYear() ===
            currentDate.getFullYear()
        );
      })

    : expenses;


  return (
<div className="dashboard-page">

   <Header />
    
  <div className="container">
    
   
    
<h1>Welcome, {name} 👋</h1>
    <h3>Top Spending: {topCategory}</h3>
    <h3>Total Transactions: {expenses.length}</h3>

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
   <h2 className="text-lg font-semibold mb-4 text-gray-700 __web-inspector-hide-shortcut__">➕ Add Transaction</h2>

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
  <option value="">Category</option>
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
            {editId ? "Update" : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>


    {/* LIST */}
    <div className="card">
       <div className="transaction-header">
        
      <h2 class="transaction-title">
        <span>📋</span> Transaction List 
        </h2>

        <div className="top-buttons">
          
     {/* Filter button */}
     <button className="all-btn" onClick={() => setFilterType("all")}>
         All
      </button>
        <button className="analytics-btn" onClick={() => navigate("/analytics")}>
         Analytics
      </button>
     <button
    className="filter-main-btn"
    onClick={() =>
      setShowFilter(!showFilter)
    }
  >
    ☰ Filter
  </button>
   
        <div className="filter-wrapper">
    {showFilter && (
    <div className="filter-dropdown">
    <button
        onClick={() =>
          setFilterType("income")
        }
      >
        Income
      </button>

      <button
        onClick={() =>
          setFilterType("expense")
        }
      >
        Expense
      </button>
      <button
  onClick={() =>
    setFilterType("today")
  }
>
  Today
</button>
<button
  onClick={() =>
    setFilterType("month")
  }
>
  Month
</button>
     </div>
      
  
  )}
  </div>
  </div>
  </div>

 

{/* Transaction list */}
  <table className="expense-table">
  <thead>
    <tr>
      <th>Type</th>
      <th>Category</th>
      <th>Amount</th>
      <th>Date</th>
      <th>Note</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {filteredExpenses.map((e) => (
      <tr >
        <td>
  <span
    style={{
      backgroundColor:
        e.type === "income"
          ? "#d1fae5"
          : "#fee2e2",

      color:
        e.type === "income"
          ? "green"
          : "red",

      padding: "6px 14px",
      borderRadius: "20px",
      fontWeight: "bold",
    }}
  >
    {e.type.charAt(0).toUpperCase() +
      e.type.slice(1)}
  </span>
</td>

        <td>{e.category}</td>

        <td
          style={{
            color:
              e.type === "income"
                ? "green"
                : "red",
            fontWeight: "bold",
          }}
        >
          {e.type === "income"
            ? "+"
            : "-"}{" "}
          ₹{e.amount}
        </td>
        <td>
  {new Date(e.date).toLocaleDateString(
    "en-IN"
  )}
</td>
     <td>{e.note}</td>

        <td>
          <button
            className="edit-btn"
            onClick={() => handleEdit(e)}
          >
            <FaEdit />
          </button>

          <button
            className="delete-btn"
            onClick={() =>
              deleteExpense(e._id)
            }
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
   

  
  </div>
  <Footer />
  </div>

  
);
}
    
        
    

export default Dashboard;