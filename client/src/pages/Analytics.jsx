import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CSVLink } from "react-csv";
import { Legend } from "recharts";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://expense-tracker-mlzm.onrender.com/api/expenses",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setExpenses(res.data);
    };
    fetchExpenses();
  }, []);

  // Income / Expense
  const income = expenses
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const expense = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + Number(e.amount), 0);

  // Pie chart data (category)
  const categoryMap = {};
  expenses.forEach((e) => {
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + Number(e.amount);
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  // Bar chart
  const barData = [
    { name: "Income", amount: income },
    { name: "Expense", amount: expense },
  ];

  // Line chart (date)
  let runningBalance = 0;
  const lineData = expenses.map((e) => {
    const inc = e.type === "income" ? Number(e.amount) : 0;
    const exp = e.type === "expense" ? Number(e.amount) : 0;
    runningBalance = runningBalance + inc - exp;
    return {
      date: new Date(e.date).toLocaleDateString(),
      income: inc,
      expense: exp,
      balance: runningBalance,
    };
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#aa66cc"];

  const csvData = expenses.map((e) => ({
    Type: e.type,
    Category: e.category,
    Amount: e.amount,
    Note: e.note,
    Date: new Date(e.date).toLocaleDateString(),
  }));

  return (
    <div className="analytics-page">
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "clamp(18px, 4vw, 26px)" }}>
          📊 Financial Analytics
        </h1>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <CSVLink
            data={csvData}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              background: "#10b981",
              color: "white",
              fontWeight: "bold",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            ⬇ Download CSV
          </CSVLink>

          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              background: "#6c63ff",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            ← Back
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="analytics-cards">

        {/* PIE CARD */}
        <div className="analytics-card">
          <h2>📊 Expense Category Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={90}>
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CARD */}
        <div className="analytics-card">
          <h2>💰 Income vs Expense</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount">
                <Cell fill="#00C49F" />
                <Cell fill="#FF4D4F" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* LINE CARD */}
        <div className="analytics-card bottom-card">
          <h2>Balance Flow Over Time 📈</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11 }}
                interval="preserveStartEnd"
              />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="green" dot={false} />
              <Line type="monotone" dataKey="expense" stroke="red" dot={false} />
              <Line type="monotone" dataKey="balance" stroke="blue" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default Analytics;