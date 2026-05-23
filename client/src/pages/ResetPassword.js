import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      `http://localhost:5000/api/auth/reset-password/${token}`,
      { password }
    );

    alert(res.data.message);
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>

      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button>
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;