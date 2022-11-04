import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Shared/user-context";

function Header() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const { dispatch } = useUser();
  const {
    state: { user },
  } = useUser();
  let navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a className="navbar-brand" onClick={() => navigate("/")}>
        Travelo
      </a>
      <button
        class="custom-toggler navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample09"
        aria-controls="navbarsExample09"
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" onClick={() => navigate("/")}>
              Home<span className="sr-only">(current)</span>
            </a>
          </li>
          {user.type === "customer" ? (
            <>
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
            </>
          ) : (
            <></>
          )}
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
