import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, FRONTEND_URL } from "../config";

const Menu = () => {
  let [selectedMenu,setSelectedMenu]=useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  let handleMenuClick=(idx)=>{
    setSelectedMenu(idx);
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError("");

    try {
      await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
      window.location.assign(`${FRONTEND_URL}/login`);
    } catch {
      setLogoutError("Unable to log out. Please try again.");
      setIsLoggingOut(false);
    }
  };

  const menuClass="menu";
  const activeMenuClass="menu selected";

  return (
    <div className="menu-container">
      <div className="menus">
        <ul>
          <li>
            <Link to="/"  style={{textDecoration:"none"}} onClick={()=>handleMenuClick(0)} className={selectedMenu===0 ?  activeMenuClass : menuClass }>
              <p>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link to="/orders"  style={{textDecoration:"none"}} onClick={()=>handleMenuClick(1)} className={selectedMenu===1 ?  activeMenuClass : menuClass }>
              <p>Orders</p>
            </Link>
          </li>
          <li>
            <Link to="/holdings"  style={{textDecoration:"none"}} onClick={()=>handleMenuClick(2)} className={selectedMenu===2 ?  activeMenuClass : menuClass }>
              <p>Holdings</p>
            </Link>
          </li>
          <li>
            <Link to="/positions"  style={{textDecoration:"none"}} onClick={()=>handleMenuClick(3)} className={selectedMenu===3 ?  activeMenuClass : menuClass }>
              <p>Positions</p>
            </Link>
          </li>
          <li>
            <Link to="/funds"  style={{textDecoration:"none"}} onClick={()=>handleMenuClick(4)} className={selectedMenu===4 ?  activeMenuClass : menuClass }>
              <p>Funds</p>
            </Link>
          </li>
          <li>
            <Link to="/app"  style={{textDecoration:"none"}} onClick={()=>handleMenuClick(5)} className={selectedMenu===5 ?  activeMenuClass : menuClass }>
              <p>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile">
          <button
            className="logout-button"
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
        {logoutError && <p className="logout-error" role="alert">{logoutError}</p>}
      </div>
    </div>
  );
};

export default Menu;