import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMotorcycle,
  faLocationDot,
  faSearch,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { fget } from "../Shared/apiCalls";
import Error from "./Error";
import { useUser } from "../Shared/user-context";
import ReactTooltip from "react-tooltip";
import Loader from "./Loader";

export default function RentPage() {
  const { dispatch } = useUser();
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalItems, setTotalItems] = useState([]);
  const [locationValue, setLocation] = useState("");

  const fetchLocations = () => {
    fget({
      url: `customer/getLocationDetails`,
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

  useEffect(() => {
    fetchLocations();
  }, []);
  const parseAddress = (address) => {
    return address.split(" ").join("+");
  };
  if (!isLoaded) {
    return <Loader></Loader>;
  } else if (error) {
    <Error error={error}></Error>;
  } else {
    const RenderList = () => {
      return (
        <div>
          {filteredLocations.map((element) => {
            return (
              <div
                className="row list-card pt-3 text-uppercase"
                key={element.id}
              >
                <div
                  className="col-6"
                  onClick={() => {
                    dispatch({ type: "location", location: element });
                    navigate(`${element.id}`);
                  }}
                >
                  <p className="name">
                    <FontAwesomeIcon icon={faLocationDot} /> {element.name}
                  </p>
                </div>
                <div
                  className="col-6 col-sm-4"
                  onClick={() =>
                    window
                      .open(
                        `http://maps.google.co.uk/maps?q=${parseAddress(
                          element.address
                        )}`,
                        "_blank"
                      )
                      .focus()
                  }
                >
                  <p className="text-muted" data-tip="Click to navigate">
                    <FontAwesomeIcon icon={faLocationArrow} /> {element.address}
                  </p>
                  <ReactTooltip
                    backgroundColor="#fde2bb"
                    textColor="white"
                    padding="0px 5px 7px"
                  />
                </div>
                <div className="col-12 col-sm-2">
                  <p className="text-danger">
                    <FontAwesomeIcon icon={faMotorcycle} />{" "}
                    {element.total_bikes}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      );
    };
    let filteredLocations = totalItems.info
      ? totalItems.info.filter((location) => {
          return (
            location.name.toLowerCase().indexOf(locationValue.toLowerCase()) !==
            -1
          );
        })
      : [];
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-5 text-center">
            <div className="card my-2 px-3">
              <div className="card-body">
                <p className="card-title display-6 gray">Select Location</p>
                <hr />
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Search"
                    placeholder="Search"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="row px-3">
                  {filteredLocations.length === 0 ? (
                    <div className="row list-card pt-3 text-uppercase text-center">
                      <p className="name">No location found</p>
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
    );
  }
}
