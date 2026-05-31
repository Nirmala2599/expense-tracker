import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/home';

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const name = localStorage.getItem("name");

  return (
    <header className="header" style={{ position: isHome ? 'relative' : 'sticky', top: 0, zIndex: 100 }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', cursor: 'pointer' }}>
        💰 Finance Tracker
      </h1>
      <div>
        Hi, {name} 👋
        <button
          className="logout-btn"
          onClick={logout}
          style={{ marginLeft: "15px" }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;