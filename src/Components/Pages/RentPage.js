import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMotorcycle,
  faLocationDot,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const sampleData = {
  success: true,
  error_code: 0,
  description: "location details",
  info: [
    {
      id: 1,
      name: "Buchanan",
      address: "NE4 5PH",
      total_bikes: 2,
    },
    {
      id: 2,
      name: "Argyle",
      address: "NE5 5PH",
      total_bikes: 4,
    },
    {
      id: 3,
      name: "Sauchiehall",
      address: "NE7 5PH",
      total_bikes: 5,
    },
    {
      id: 4,
      name: "University of Glasgow",
      address: "NE4 5PH",
      total_bikes: 10,
    },
    {
      id: 5,
      name: "West view",
      address: "NE5 5PH",
      total_bikes: 6,
    },
    {
      id: 6,
      name: "Blackfriar",
      address: "NE6 5PH",
      total_bikes: 9,
    },
  ],
};
function RentPage() {
  const [locationValue, setLocation] = useState("");
  let filteredLocations = sampleData.info.filter((location) => {
    return (
      location.name.toLowerCase().indexOf(locationValue.toLowerCase()) !== -1
    );
  });
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <div className="card my-3" style={{ minWidth: "29rem" }}>
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
              <div className="list-group">
                {filteredLocations.map((element) => {
                  return (
                    <Link
                      to={`${element.id}`}
                      key={element.id}
                      type="button"
                      className="list-group-item list-group-item-action"
                    >
                      <div className="row justify-content-between">
                        <div className="col align-self-center">
                          <p className="name">{element.name}</p>
                        </div>
                        <div className="col">
                          <div className="row">
                            <div className="col-12">
                              <p className="text-muted">
                                <FontAwesomeIcon icon={faLocationDot} />{" "}
                                {element.address}
                              </p>
                            </div>
                            <div className="col">
                              <p className="text-danger">
                                <FontAwesomeIcon icon={faMotorcycle} />{" "}
                                {element.total_bikes}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentPage;
