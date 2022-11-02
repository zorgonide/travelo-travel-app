import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
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
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" onClick={() => navigate("/")}>
              Home<span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" onClick={() => navigate("/")}>
              Profile
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" onClick={() => navigate("/")}>
              Wallet
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
