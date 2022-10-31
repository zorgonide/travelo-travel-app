import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftRotate,
  faCompass,
  faBug,
} from "@fortawesome/free-solid-svg-icons";

function CustomerHomePage() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-5 text-center">
            <div className="card my-3">
              <div className="card-body">
                <p className="card-title display-6 gray">Select Action</p>
                <hr />
                <div className="d-grid gap-2">
                  <button
                    onClick={() => navigate("/return")}
                    className="button button1 mb-3"
                  >
                    <FontAwesomeIcon icon={faArrowLeftRotate} /> Return
                  </button>
                </div>
                <div className="d-grid gap-2">
                  <button
                    onClick={() => navigate("/rent")}
                    className="button button1 mb-3"
                  >
                    <FontAwesomeIcon icon={faCompass} /> Rent
                  </button>
                </div>
                <div className="d-grid gap-2">
                  <button
                    onClick={() => navigate("/report")}
                    className="button button1 mb-3"
                  >
                    <FontAwesomeIcon icon={faBug} /> Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerHomePage;
