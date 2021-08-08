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
    </div>
  );
}

export default NavBar;
