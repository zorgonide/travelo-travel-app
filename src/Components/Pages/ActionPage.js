import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fget, fpost } from "../Shared/apiCalls";
import Error from "./Error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { useUser } from "../Shared/user-context";
import Swal from "sweetalert2";
import Repair from "../Images/repair.svg";
import Loader from "./Loader";

function ActionPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bikes, setBikes] = useState("");
  const [vehicleId, setBikeId] = useState("");
  const [option, setOption] = useState("");
  const [locationValue, setLocation] = useState("");
  const [locationId, setLocationId] = useState(null);
  let { bikeId } = useParams();
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
          // setIsLoaded(true);
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
  const fetchBikes = () => {
    fget({
      url: `customer/getVehicleDetails`,
    })
      .then((res) => res.data)
      .then(
        (result) => {
          setBikes(
            result.info
              .map((ele) => {
                return {
                  value: ele.id,
                  label:
                    ele.type === "electric_bike"
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
          setIsLoaded(true);
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
        vehicle_id: vehicleId || bikeId,
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
    return <Loader></Loader>;
  } else if (error) {
    <Error error={error}></Error>;
  } else {
    console.log(bikeId);
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-5">
              <div className="card my-2">
                <div className="card-body text-left">
                  <p className="card-title display-6 gray text-center ">
                    Service
                  </p>
                  <hr />
                  <div className="img text-center">
                    <img
                      src={Repair}
                      width="260"
                      height="230"
                      className=""
                      alt="Repair"
                    />
                  </div>
                  <Select
                    placeholder="Select vehicle"
                    id="bikes"
                    options={bikes}
                    onChange={(e) => setBikeId(e.value)}
                    defaultValue={
                      bikeId ? bikes.find((e) => e.value == bikeId) : null
                    }
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
                  <Select
                    placeholder="Select action"
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
                      <Select
                        placeholder="Select location"
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
                      <FontAwesomeIcon icon={faGear} /> Process
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
