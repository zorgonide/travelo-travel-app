import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fget, fpost } from "../Shared/apiCalls";
import Error from "./Error";
import Select from "react-select";
import { useUser } from "../Shared/user-context";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";
import Return from "../Images/return.svg";

function ReturnPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [locationValue, setLocation] = useState("");
  const [locationId, setLocationId] = useState("");
  const {
    state: { user },
  } = useUser();
  const fetchLocations = () => {
    fget({
      url: `customer/getLocationDetails`,
    })
      .then((res) => res.data)
      .then(
        (result) => {
          setIsLoaded(true);
          setLocation(
            result.info.map((ele) => {
              return {
                value: ele.id,
                label: ele.name,
              };
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
    fetchLocations();
  }, []);

  const returnBike = () => {
    fpost({
      url: "customer/ReturnBike",
      data: {
        user_id: user.user_id,
        location_id: locationId,
      },
    })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          Swal.fire({
            confirmButtonColor: "#4fbfa8",
            title: "Success",
            text: `Bike has been returned`,
            icon: "success",
            confirmButtonText: "Home",
          }).then((res) => {
            if (res.isConfirmed) navigate("/");
          });
        } else {
          Swal.fire({
            title: "Error",
            text: `No vehicles to return`,
            icon: "error",
            confirmButtonText: "Dismiss",
          });
        }
      })
      .catch((error) => {
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
      <div className="container">
        <div className="row my-4 justify-content-center">
          <div className="col-12 col-sm-5">
            <div className="card my-2">
              <div className="card-body text-left">
                <p className="card-title display-6 gray text-center ">
                  Return Vehicle
                </p>
                <hr />
                <div className="img text-center">
                  <img
                    src={Return}
                    width="260"
                    height="230"
                    className=""
                    alt="Return"
                  />
                </div>
                <Select
                  placeholder="Select location"
                  id="location"
                  options={locationValue}
                  onChange={(e) => setLocationId(e.value)}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary: "#4fbfa8",
                    },
                  })}
                ></Select>
                <br></br>
                <div className="d-grid gap-2">
                  <button onClick={returnBike} className="button button1 mb-3">
                    <FontAwesomeIcon icon={faArrowRotateLeft} /> Return
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ReturnPage;
