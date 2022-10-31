import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fget, fpost } from "../Shared/apiCalls";
import Error from "./Error";
import Select from "react-select";
import { useUser } from "../Shared/user-context";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";
import Air from "../Images/air.svg";

function ReportPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [locationValue, setBikes] = useState("");
  const [vehicleId, setLocationId] = useState("");
  const [remark, setRemark] = useState("");
  const {
    state: { user },
  } = useUser();
  const fetchBikes = () => {
    fget({
      url: `customer/getVehicleDetails`,
    })
      .then((res) => res.data)
      .then(
        (result) => {
          setIsLoaded(true);
          setBikes(
            result.info
              .map((ele) => {
                return {
                  value: ele.id,
                  label:
                    ele.type === "gas_scooter"
                      ? "Electric Bike ID - " + ele.id
                      : "Electric Scooter ID - " + ele.id,
                };
              })
              .sort(function (a, b) {
                if (a.value < b.value) return -1;
                if (a.value > b.value) return 1;
                return 0;
              })
          );
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  useEffect(() => {
    fetchBikes();
  }, []);

  const reportBike = () => {
    fpost({
      url: "customer/ReportBike",
      data: {
        remarks: remark,
        vehicle_id: vehicleId,
      },
    })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          Swal.fire({
            title: "Success",
            text: `Bike has been reported`,
            icon: "success",
            confirmButtonText: "Home",
          }).then((res) => {
            if (res.isConfirmed) navigate("/");
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: `Some error occurred`,
          icon: "error",
          confirmButtonText: "Dismiss",
        });
      });
  };

  if (!isLoaded) {
    return <Loader></Loader>;
  } else if (error) {
    <Error error={error}></Error>;
  } else {
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-5">
              <div className="card my-3">
                <div className="card-body text-left">
                  <p className="card-title display-6 gray text-center ">
                    Report Bike
                  </p>
                  <hr />
                  <div className="img text-center">
                    <img
                      src={Air}
                      width="260"
                      height="230"
                      className=""
                      alt="Air"
                    />
                  </div>
                  <Select
                    placeholder="Select vehicle"
                    options={locationValue}
                    onChange={(e) => setLocationId(e.value)}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary: "#4fbfa8",
                      },
                      width: "200px",
                    })}
                    className="my-3"
                  ></Select>
                  <div class="form-floating">
                    <textarea
                      class="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      style={{ height: "100px" }}
                      onChange={(e) => setRemark(e.target.value)}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Comments</label>
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <button
                      onClick={reportBike}
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
}

export default ReportPage;
