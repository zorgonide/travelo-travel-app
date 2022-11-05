import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Shared/user-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faHome,
  faWallet,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
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
        className="custom-toggler navbar-toggler"
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
              <FontAwesomeIcon icon={faHome} /> Home
            </a>
          </li>
          {user.type === "customer" ? (
            <>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/profile")}>
                  <FontAwesomeIcon icon={faUser} /> Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/wallet")}>
                  <FontAwesomeIcon icon={faWallet} /> Wallet
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
          <FontAwesomeIcon icon={faRightFromBracket} /> Log Out
        </a>
      </div>
    </nav>
  );
}

export default Header;
