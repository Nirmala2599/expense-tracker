import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const register = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/auth/register",
      { name,email,password }
    );

    alert("Registered");
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>

      <form onSubmit={register}>
        <input
          placeholder="Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button>Register</button>
      </form>

      <Link to="/">Login</Link>
    </div>
  );
}

export default Register;