import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        background: "#222",
        color: "white",
      }}
    >
      <h3>Finance Tracker</h3>

      <div>
        <span>Hi, {name} 👋 </span>

        <Link
          to="/dashboard"
          style={{
            color: "white",
            marginLeft: "15px",
          }}
        >
          Dashboard
        </Link>

        <button
          onClick={logout}
          style={{
            marginLeft: "15px",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;