import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
          
 

  return (
    <div>


       <button
          onClick={logout}
          style={{
            marginLeft: "15px",
          }}
        >
          Logout
        </button>
      </div>
  
  );
}

export default Navbar;