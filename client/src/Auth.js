import { useState } from "react";
import axios from "axios";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API = "http://localhost:5000/api/auth";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      const res = await axios.post(`${API}/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login success");
    } else {
      await axios.post(`${API}/register`, {
        name,
        email,
        password,
      });

      alert("Registered successfully");
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "New user? Register"
          : "Already have account? Login"}
      </p>
      <p>
  <a href="/forgot">
    Forgot Password?
  </a>
</p>
    </div>
    
  );
}

export default Auth;