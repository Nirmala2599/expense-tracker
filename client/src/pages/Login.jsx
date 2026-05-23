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
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("name", res.data.name);

    alert("Login success");
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

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
  );
}

export default Login;