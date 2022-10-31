import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fget, fpost } from "../Shared/apiCalls";
import Error from "./Error";
import Select from "react-select";
import { useUser } from "../Shared/user-context";
import Swal from "sweetalert2";

function ActionPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bikes, setBikes] = useState("");
  const [vehicleId, setBikeId] = useState("");
  const [option, setOption] = useState("");
  const [locationValue, setLocation] = useState("");
  const [locationId, setLocationId] = useState(null);
  let options = [
    {
      value: "repair",
      label: "Repair",
    },
    {
      value: "move_vehicle",
      label: "Move Vehicle",
    },
    {
      value: "charge",
      label: "Charge",
    },
  ];

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
    fetchLocations();
  }, []);

  const processBike = () => {
    fpost({
      url: "customer/OperatorOperationsOnVehicle",
      data: {
        vehicle_id: vehicleId,
        action: option, // repair , move_vehicle
        location_id: locationId,
      },
    })
      .then((res) => res.data)
      .then((res) => {
        if (res.success) {
          Swal.fire({
            title: "Success",
            text: `Bike has been processed`,
            icon: "success",
            confirmButtonText: "Home",
            showCancelButton: true,
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
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-4">
              <div className="card my-3">
                <div className="card-body text-left">
                  <p className="card-title display-6 gray text-center ">
                    Service
                  </p>
                  <hr />
                  <label htmlFor="bikes">Select bike</label>
                  <Select
                    id="bikes"
                    options={bikes}
                    onChange={(e) => setBikeId(e.value)}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary: "#4fbfa8",
                      },
                      width: "200px",
                    })}
                    className="mb-3"
                  ></Select>
                  <label htmlFor="actions">Select action</label>
                  <Select
                    id="actions"
                    options={options}
                    onChange={(e) => setOption(e.value)}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary: "#4fbfa8",
                      },
                      width: "200px",
                    })}
                    className="mb-3"
                  ></Select>

                  {option === "move_vehicle" ? (
                    <>
                      <label htmlFor="actions">Select location</label>
                      <Select
                        id="locations"
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
                        className="mb-3"
                      ></Select>
                    </>
                  ) : null}

                  <div className="d-grid gap-2 mt-3">
                    <button
                      onClick={processBike}
                      className="button button1 mb-3"
                    >
                      Process
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

export default ActionPage;
