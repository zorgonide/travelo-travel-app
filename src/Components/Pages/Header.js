import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Shared/user-context";

function Header() {
  const { dispatch } = useUser();
  let navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a className="navbar-brand" onClick={() => navigate("/")}>
        Travelo
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" onClick={() => navigate("/")}>
              Home<span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => navigate("/profile")}>
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={() => navigate("/wallet")}>
              Wallet
            </a>
          </li>
        </ul>
      </div>
      <div className="col logout">
        <a className="nav-link" onClick={() => dispatch({ type: "logout" })}>
          Log Out
        </a>
      </div>
    </nav>
  );
}

export default Header;
