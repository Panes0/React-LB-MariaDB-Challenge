import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="ui secondary  menu">
      <Link className="item" to="/">
        Home
      </Link>
      <Link className="item" to="/login">
        Login
      </Link>
      <Link className="item" to="/add">
        Add Movie
      </Link>
      <div className="right menu">
        <div className="item">
          <div className="ui icon input">
            <input type="text" placeholder="Search..." />
            <i className="search link icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
