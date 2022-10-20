import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBattery5,
  faBattery3,
  faBattery2,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Select from "../Images/select.svg";

const sampleData = {
  success: true,
  error_code: 0,
  description: "vehicle in given location id",
  info: [
    {
      id: 2,
      type: "electric_scooter",
      battery: 100,
      is_defective: false,
      is_available: true,
      assigned_to_id: null,
      location_id: 1,
    },
    {
      id: 2,
      type: "electric_scooter",
      battery: 100,
      is_defective: false,
      is_available: true,
      assigned_to_id: null,
      location_id: 1,
    },
    {
      id: 2,
      type: "electric_scooter",
      battery: 100,
      is_defective: false,
      is_available: true,
      assigned_to_id: null,
      location_id: 1,
    },
    {
      id: 4,
      type: "gas_scooter",
      battery: 50,
      is_defective: false,
      is_available: true,
      assigned_to_id: null,
      location_id: 1,
    },
    {
      id: 3,
      type: "electric_scooter",
      battery: 10,
      is_defective: false,
      is_available: true,
      assigned_to_id: null,
      location_id: 1,
    },
    {
      id: 2,
      type: "electric_scooter",
      battery: 100,
      is_defective: false,
      is_available: true,
      assigned_to_id: null,
      location_id: 1,
    },
  ],
};
function BikesPage() {
  const getBatteryLevel = (battery) => {
    if (battery == 100) {
      return faBattery5;
    } else if (battery < 100 && battery >= 50) return faBattery3;
    else return faBattery2;
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <div className="card my-3" style={{ minWidth: "23rem" }}>
            <div className="card-body">
              <p className="card-title display-6 gray">Bike</p>
              <hr></hr>
              <div className="list-group">
                {sampleData.info.map((element) => {
                  return (
                    <Link
                      to={`${element.id}`}
                      key={element.id}
                      type="button"
                      className="list-group-item list-group-item-action"
                    >
                      <div className="row">
                        <div className="col align-self-center">
                          <p className="">
                            {element.type === "gas_scooter"
                              ? "Gas Scooter"
                              : "Electric Scooter"}
                          </p>
                        </div>
                        <div className="col">
                          <div className="row">
                            <div className="col-12">
                              <p className="text-muted">
                                <FontAwesomeIcon
                                  icon={getBatteryLevel(element.battery)}
                                />{" "}
                                {element.battery}
                              </p>
                            </div>
                            {/* <div className="col">
                              <p className="text-danger">
                                <FontAwesomeIcon icon={faMotorcycle} />{" "}
                                {element.total_bikes}
                              </p>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </Link>

                    // <ul className="list-group">
                    //   <li className="list-group-item">ID: {element.id}</li>
                    //   <li className="list-group-item">Type: {element.type}</li>
                    //   <li className="list-group-item">
                    //     Battery: {element.battery}
                    //   </li>
                    //   <li className="list-group-item">
                    //     Location ID: {element.location_id}
                    //   </li>
                    // </ul>
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

export default BikesPage;
