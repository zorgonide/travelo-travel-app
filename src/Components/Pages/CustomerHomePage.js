import React from "react";
import { useNavigate } from "react-router-dom";

function CustomerHomePage() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <div className="card my-3" style={{ minWidth: "29rem" }}>
            <div className="card-body">
              <p className="card-title display-6 gray">Select Action</p>
              <hr />
              <div className="d-grid gap-2">
                <button
                  onClick={() => navigate("/return")}
                  className="button button1 mb-3"
                >
                  Return
                </button>
              </div>
              <div className="d-grid gap-2">
                <button
                  onClick={() => navigate("/rent")}
                  className="button button1 mb-3"
                >
                  Rent
                </button>
              </div>
              <div className="d-grid gap-2">
                <button
                  onClick={() => navigate("/report")}
                  className="button button1 mb-3"
                >
                  Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerHomePage;
