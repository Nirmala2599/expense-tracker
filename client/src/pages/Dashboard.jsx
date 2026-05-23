import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

    const name = localStorage.getItem("name");
console.log(name);
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>

        <>
  <Navbar />
        <h1>Welcome, {name} 👋</h1>

      <button onClick={logout}>
        Logout
      </button>
      </>
    </div>
  );
}

export default Dashboard;