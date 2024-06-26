import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#001C30" }}
    >
      <div className="container-fluid mx-4">
        <Link className="navbar-brand text-light fw-bold fs-3" to="/">
          eChallan
        </Link>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto fs-5">
            <li className="nav-item">
              <Link className="nav-link active text-light" aria-current="page" to="/userCheckChallan">
                Pay Challan
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-light"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Login
              </Link>
              <ul className="dropdown-menu">

                <li>
                  <Link className="dropdown-item" to="/adminLogin">
                    Admin Login
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/policeLogin">
                    Police Login
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
