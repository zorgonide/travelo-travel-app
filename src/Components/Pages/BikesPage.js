import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBattery5,
  faBattery3,
  faBattery2,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fget } from "../Shared/apiCalls";
import Error from "./Error";

function BikesPage() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalItems, setTotalItems] = useState([]);
  const [locationValue, setLocation] = useState("");
  let { locationId } = useParams();

  useEffect(() => {
    fetchBikes();
  }, []);
  const fetchBikes = () => {
    fget({
      url: `customer/getBikesPerLocation/${locationId}/`,
    })
      .then((res) => res.data)
      .then(
        (result) => {
          setTotalItems(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  const getBatteryLevel = (battery) => {
    if (battery == 100) {
      return faBattery5;
    } else if (battery < 100 && battery >= 50) return faBattery3;
    else return faBattery2;
  };
  const RenderList = () => {
    return (
      <div>
        {totalItems.info.map((element) => {
          return (
            <div
              className="row list-card pt-3 text-uppercase"
              key={element.id}
              onClick={() => navigate(`${element.id}`)}
            >
              <div className="col-6">
                <p className="name">
                  {element.type === "gas_scooter"
                    ? "Gas Scooter"
                    : "Electric Scooter"}
                </p>
              </div>
              <div className="col text-center">
                <p className="text-muted">
                  <FontAwesomeIcon icon={getBatteryLevel(element.battery)} />{" "}
                  {element.battery}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  if (!isLoaded) {
    return <div>Loading Page</div>;
  } else if (error) {
    <Error error={error}></Error>;
  } else {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-4 text-center">
            <div className="card my-3 px-3" style={{ minWidth: "26rem" }}>
              <div className="card-body">
                <p className="card-title display-6 gray">Select Bike</p>
                <hr></hr>
                <RenderList />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BikesPage;
