import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate import

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // ✅ add

  const register = async (e) => {
    e.preventDefault();

    await axios.post(
      "https://expense-tracker-mlzm.onrender.com/api/auth/register",
      { name, email, password }
    );

    alert("Registered successfully!");
    navigate("/"); // ✅ "/" — Login page
  };

  return (
    <div className="mm">
      <div className="auth-container">
        <h2>Create Account ✨</h2>
        <form onSubmit={register}>
          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
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
    
     <button>Register</button>
        </form>
        <Link to="/">Already have an account? Login</Link>
      </div>
    </div>
  );
}

export default Register;