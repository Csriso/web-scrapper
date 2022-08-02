import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context'
function Navbar() {
  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    textDecoration: "underline",
  };

  const inActiveStyles = {
    textDecoration: "none",
  };

  const { isLoggedIn, user, authenticateUser } = useContext(AuthContext)
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  }

  return (
    <div>
      {user !== null && <p>Bienvenido {user.username}</p>}

      {isLoggedIn === true ? (
        <>
          <NavLink to="/" style={toggleStyles}> Home </NavLink>
          <NavLink to="/scrap" end={true} style={toggleStyles}> Scrap </NavLink>
          <button onClick={handleLogout}>LOGOUT</button>
        </>
      ) : (
        <>
          <NavLink to="/signup" style={toggleStyles}> Registro </NavLink>
          <NavLink to="/login" style={toggleStyles}> Acceder </NavLink>
        </>
      )}

    </div>
  );
}

export default Navbar;
