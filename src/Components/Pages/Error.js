import React from "react";
import Pic from "../Images/Error.svg";
//Standard error component

function Error({ error }) {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center" style={{ height: "80vh" }}>
          <div className="col-12 col-sm-5 align-self-center">
            <div className="card text-center border">
              <img className="card-img-top" src={Pic} alt="Error" />
              <div className="card-body">
                <h5 className="card-title">Error</h5>
                <p className="card-text">
                  {error.length ? error : "Some error occurred"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Error;
