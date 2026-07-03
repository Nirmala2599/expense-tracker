import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // ✅ add

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

             {/* Password + Eye icon */}
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"} // ✅
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

        <button>Login</button>
      </form>

      <Link to="/register">Register</Link>
      
      
    </div>
    </div>
  );
}

export default Login;