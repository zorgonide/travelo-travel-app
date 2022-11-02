import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fget } from "../Shared/apiCalls";
import Error from "./Error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faCircleExclamation,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";
import Track from "../Images/map.svg";
import {
  faBattery5,
  faBattery3,
  faBattery2,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";

function TrackPage() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalItems, setTotalItems] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetchBikes();
  }, []);
  const fetchBikes = () => {
    fget({
      url: `customer/getVehicleDetails`,
    })
      .then((res) => res.data)
      .then(
        (result) => {
          setTotalItems(
            result.info.sort(function (a, b) {
              if (a.id < b.id) return -1;
              if (a.id > b.id) return 1;
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

  const getBatteryLevel = (battery) => {
    if (battery <= 100 && battery >= 70) {
      return faBattery5;
    } else if (battery < 70 && battery >= 50) return faBattery3;
    else return faBattery2;
  };
  const getBatteryColor = (battery) => {
    if (battery <= 100 && battery >= 70) {
      return "green";
    } else if (battery < 70 && battery >= 50) return "orange";
    else return "red";
  };
  const getAvailable = (available) => {
    return available ? faCircleCheck : faCircleXmark;
  };
  const getAvailableColor = (available) => {
    if (available) {
      return "green";
    }
    return "red";
  };
  const getDefective = (def) => {
    return def ? faCircleExclamation : faBolt;
  };
  const getDefectiveColor = (def) => {
    if (def) {
      return "orange";
    }
    return "green";
  };
  const RenderList = () => {
    return (
      <>
        {filteredBikes.map((element, index) => {
          if (index === 0) {
            return (
              <div
                className="row list-card pt-3"
                key={0}
                // onClick={() => navigate(`/action`)}
              >
                <div className="col text-center">
                  <p>
                    {"ID"}
                    {/* <FontAwesomeIcon icon={faHashtag} /> {element.id} */}
                  </p>
                </div>
                <div className="col-3 text-center">
                  <p className="name">{"Vehicle type"}</p>
                </div>
                <div className="col text-center">
                  <p className="">Availability</p>
                </div>
                <div className="col text-center">
                  <p className="">Defective</p>
                </div>
                <div className="col text-center">
                  <p className="">Battery Status</p>
                </div>
              </div>
            );
          }
          return (
            <div
              className="row list-card pt-3"
              key={element.id}
              onClick={() => navigate(`/action/${element.id}`)}
            >
              <div className="col text-center">
                <p>
                  {" "}
                  <FontAwesomeIcon icon={faHashtag} /> {element.id}
                </p>
              </div>
              <div className="col-3 text-center">
                <p className="name">
                  {element.type === "electric_bike"
                    ? "Electric Bike"
                    : "Electric Scooter"}
                </p>
              </div>
              <div className="col text-center">
                <p className="">
                  <FontAwesomeIcon
                    icon={getAvailable(element.is_available)}
                    color={getAvailableColor(element.is_available)}
                  />
                </p>
              </div>
              <div className="col text-center">
                <p className="">
                  <FontAwesomeIcon
                    icon={getDefective(element.is_defective)}
                    color={getDefectiveColor(element.is_defective)}
                  />
                </p>
              </div>
              <div className="col text-center">
                <p className="text-muted">
                  <FontAwesomeIcon
                    icon={getBatteryLevel(element.battery)}
                    color={getBatteryColor(element.battery)}
                  />{" "}
                  {element.battery}
                </p>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  let filteredBikes = totalItems
    ? totalItems.filter((bike) => {
        return bike.type.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      })
    : [];
  if (!isLoaded) {
    return <Loader></Loader>;
  } else if (error) {
    <Error error={error}></Error>;
  } else {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12">
            <div className="card my-3">
              <div className="card-body text-left">
                <p className="card-title display-6 gray text-center ">
                  Track Vehicles
                </p>
                <hr />
                <div className="row">
                  <div className="col-12 col-sm-3 px-4">
                    <div className="row">
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Search"
                        placeholder="Search vehicle type"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div className="row">
                      <div className="img text-center">
                        <img
                          src={Track}
                          width="210"
                          height="210"
                          className=""
                          alt="Return"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col px-4">
                    {filteredBikes.length === 0 ? (
                      <div className="row list-card pt-3 text-uppercase text-center">
                        <p className="name">No vehicle found</p>
                      </div>
                    ) : (
                      <RenderList />
                    )}
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

export default TrackPage;
