import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
} from "chart.js";

import { Pie, Bar, Line } from "react-chartjs-2";
ChartJS.register(
    ArcElement, 
    Tooltip, 
    Legend, 
    BarElement, 
    CategoryScale, 
    LinearScale,
    LineElement,
    PointElement
);

function ExpenseChart({ expenses, darkMode }) {

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
};

  // group by category
  const dataMap = {};

  expenses.forEach((e) => {
    dataMap[e.category] = (dataMap[e.category] || 0) + Number(e.amount);
  });

const labels = Object.keys(dataMap);
const values = Object.values(dataMap);

const data = {
  labels,
  datasets: [
    {
      label: "Expenses",
      data: values,
      backgroundColor: labels.map((cat) => getColor(cat)),
      borderColor: darkMode ? "#fff" : "#000",
    },
  ],
};

const monthMap = {};

expenses.forEach((e) => {
  const date = new Date(e.date);
  const month = date.toLocaleString("default", { month: "short" });

  monthMap[month] = (monthMap[month] || 0) + Number(e.amount);
});

const monthOrder = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

const sortedMonths = Object.keys(monthMap).sort(
  (a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)
);

const monthData = {
  labels: sortedMonths,
  datasets: [
    {
      label: "Monthly Expenses",
      data: sortedMonths.map((m) => monthMap[m]),
      borderColor: darkMode ? "#4CAF50" : "#2e7d32",
    backgroundColor: darkMode ? "#4CAF50" : "#2e7d32",
  },

    ],
  };
  
  return (
        <div>
    <div style={{ width: "100%", maxWidth: "400px", margin: "auto" }}>
  <div style={{ flex: 1 }}>
    <Pie data={data} />
  </div>
  <div style={{ flex: 1 }}>
    <Bar data={data} />
  </div>
</div>
      <div className="card">
  <h3>Monthly Expenses</h3>
  <Line data={monthData} />
</div>
    </div>
    
  
  );
}

export default ExpenseChart;