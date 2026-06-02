import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "https://expense-tracker-mlzm.onrender.com/api/auth/login",
      { email, password }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("name", res.data.name);

    alert("Login success");
    if (res.data.token) {
  localStorage.setItem(
    "token",
    res.data.token
  );

  navigate("/home");
}
  
  };

  return (
    <div className="mm">
    <div className="auth-container">
      <h2>Welcome Back 👋</h2>

      <form onSubmit={login}>
        <input
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button>Login</button>
      </form>

      <Link to="/register">Register</Link>
      <br />
      <Link to="/forgot">Forgot Password</Link>
    </div>
    </div>
  );
}

export default Login;