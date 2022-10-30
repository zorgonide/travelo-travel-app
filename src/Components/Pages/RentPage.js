import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMotorcycle,
  faLocationDot,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { fget } from "../Shared/apiCalls";
import Error from "./Error";
import { useUser } from "../Shared/user-context";

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
    return <div>Loading Page</div>;
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
                  <p className="name">{element.name}</p>
                </div>
                <div
                  className="col"
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
                  <p className="text-muted">
                    <FontAwesomeIcon icon={faLocationDot} /> {element.address}
                  </p>
                </div>
                <div className="col-2">
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
    let filteredLocations = totalItems.info.filter((location) => {
      return (
        location.name.toLowerCase().indexOf(locationValue.toLowerCase()) !== -1
      );
    });
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-4 text-center">
            <div className="card my-3 px-3" style={{ minWidth: "26rem" }}>
              <div className="card-body">
                <p className="card-title display-6 gray">Select Location</p>
                <hr />
                <div className="input-group input-group-sm mb-3">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Search"
                    placeholder="Search"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faSearch} size="xl" />
                    </span>
                  </div>
                </div>
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
    );
  }
}
