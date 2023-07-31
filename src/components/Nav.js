import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo0v3d2MCn0Y5FUxuD_96w5NFuKJwodwlaLPTNXYhKXzDbhQNVjvPcWxr83KNiKhIYKDc&usqp=CAU"
        alt="logo"
        className="logo"
      />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>

          <li>
            <Link to="/add">Add Products</Link>
          </li>

          <li>
            <Link to="/signup" onClick={handleLogout}>
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">SignUp</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
