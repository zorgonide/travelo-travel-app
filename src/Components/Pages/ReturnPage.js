import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fget, fpost } from "../Shared/apiCalls";
import Error from "./Error";
import Select from "react-select";
import { useUser } from "../Shared/user-context";
import Swal from "sweetalert2";

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
            title: "Success",
            text: `Bike has been returned`,
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
    return <div>Loading Page</div>;
  } else if (error) {
    <Error error={error}></Error>;
  } else {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card my-3" style={{ minWidth: "29rem" }}>
              <div className="card-body text-left">
                <p className="card-title display-6 gray text-center ">
                  Select Location
                </p>
                <hr />
                <Select
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
                    Return
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
