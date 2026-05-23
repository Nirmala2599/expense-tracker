import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5000/api/auth/forgot-password",
      { email }
    );

    alert(res.data.message);
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>

      <form onSubmit={handleForgot}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button type="submit">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;