import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Analytics from "./pages/Analytics";
import Home from "./pages/Home";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("https://expense-tracker-mlzm.onrender.com/")
      .then(() => setReady(true))
      .catch(() => setReady(true));
  }, []);

  if (!ready) return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "20px"
    }}>
      ⏳ Loading... Please wait
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;