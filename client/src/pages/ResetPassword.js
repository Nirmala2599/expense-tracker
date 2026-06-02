import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ add

  const handleReset = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      `https://expense-tracker-mlzm.onrender.com/api/auth/reset-password/${token}`,
      { password }
    );

    alert(res.data.message);
  };

  return (
     <div className="mm">
    <div className="auth-container">
      <h2>Reset Password</h2>

      <form onSubmit={handleReset}>
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

        <button  >
          Reset Password
        </button>
      </form>
    </div>
    </div>
  );
}

export default ResetPassword;