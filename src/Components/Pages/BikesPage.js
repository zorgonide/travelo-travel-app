import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBattery5,
  faBattery3,
  faBattery2,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fget, fpost } from "../Shared/apiCalls";
import Error from "./Error";
import Swal from "sweetalert2";
import { useUser } from "../Shared/user-context";
import Loader from "./Loader";

function BikesPage() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalItems, setTotalItems] = useState([]);
  let { locationId } = useParams();
  const {
    state: { location, user },
  } = useUser();
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
  const confirmOrder = (bikeId) => {
    Swal.fire({
      confirmButtonColor: "#4fbfa8",
      title: "Confirm Order",
      text: `Do you want to book vehicle #${bikeId}`,
      icon: "question",
      confirmButtonText: "Yes",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed)
        fpost({
          url: `customer/AssignBike`,
          data: {
            vehicle_id: bikeId,
            user_id: user.user_id,
          },
        })
          .then((res) => res.data)
          .then((res) => {
            if (res.success) {
              Swal.fire({
                title: "Order Confirmed",
                html: `<p>Vehicle ${bikeId} has been assigned to you</p>`,
                icon: "success",
                confirmButtonText: "Okay",
              }).then((res) => {
                if (res.isConfirmed) navigate("/");
              });
            } else {
              Swal.fire({
                title: "Error",
                text: `Can not rent more than one vehicle`,
                icon: "error",
                confirmButtonText: "Dismiss",
              });
            }
          });
    });
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
  const RenderList = () => {
    return (
      <>
        {totalItems.info.map((element) => {
          return (
            <div
              className="row list-card pt-3 text-uppercase"
              key={element.id}
              onClick={() => confirmOrder(`${element.id}`)}
            >
              <div className="col-2">
                <p>
                  {" "}
                  <FontAwesomeIcon icon={faHashtag} /> {element.id}
                </p>
              </div>
              <div className="col-6">
                <p className="name">
                  {element.type === "electric_bike"
                    ? "Electric Bike"
                    : "Electric Scooter"}
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
  const parseAddress = (address) => {
    return address.split(" ").join("+");
  };
  if (!isLoaded) {
    return <Loader></Loader>;
  } else if (error) {
    <Error error={error}></Error>;
  } else {
    return (
      <div className="container">
        <div className="row my-4 justify-content-center">
          <div className="col-12 col-sm-5 text-center">
            <div className="card my-2 px-3">
              <div className="card-body">
                <p className="card-title display-6 gray">{location.name}</p>
                <hr></hr>
                <div className="row my-4">
                  <div className="col">
                    <iframe
                      src={`https://maps.google.com/maps?q=${parseAddress(
                        location.address
                      )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      title="Location info"
                      width={"100%"}
                    ></iframe>
                  </div>
                </div>
                <div className="row px-3">
                  <div className="col">
                    {totalItems.info.length === 0 ? (
                      <div className="row list-card pt-3 text-uppercase text-center">
                        <p className="name">No bikes at this location</p>
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

export default BikesPage;
