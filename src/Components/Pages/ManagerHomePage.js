import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faGauge } from "@fortawesome/free-solid-svg-icons";
import Manager from "../Images/manager.svg";

function ManagerMainPage() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row my-4 justify-content-center">
        <div className="col-12 col-sm-5 text-center">
          <div className="card my-2">
            <div className="card-body">
              {/* <p className="card-title display-6 gray">Select Action</p> */}
              {/* <hr /> */}
              <div className="img mb-4">
                <img
                  src={Manager}
                  width="300"
                  height="300"
                  className=""
                  alt="Operator"
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  onClick={() => navigate("/users")}
                  className="button button1 mb-3"
                >
                  <FontAwesomeIcon icon={faUsers} /> Manage Users
                </button>
              </div>
              <div className="d-grid gap-2">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="button button1 mb-3"
                >
                  <FontAwesomeIcon icon={faGauge} /> Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerMainPage;
