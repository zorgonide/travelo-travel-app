import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fget, fpost } from "../Shared/apiCalls";
import Error from "./Error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";

import HottestLocation from "./Manager/HottestLocation";
import TotalStats from "./Manager/TotalStats";
import BikeStats from "./Manager/BikeStats";
import OrdersPerUser from "./Manager/OrdersPerUser";
// import faker from "faker";

function ManagerHomePage() {
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalItems, setTotalItems] = useState([]);
  const [search, setSearch] = useState("");
  const [perBikeStats, setPerBikeStats] = useState([]);
  const [hottestLocation, setHottestLocation] = useState([]);
  const [totalStats, setTotalStats] = useState([]);
  const [ordersPerUser, setOrdersPerUser] = useState([]);
  const getPerBikeStats = () => {
    return fpost({
      url: "customer/PerBikeStats",
      data: {},
    })
      .then((res) => res.data)
      .then(
        (res) => {
          setPerBikeStats(
            res.info.sort(function (a, b) {
              if (a.id < b.id) return -1;
              if (a.id > b.id) return 1;
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
  const getHottestLocation = () => {
    return fpost({
      url: "customer/HottestLocation",
      data: {},
    })
      .then((res) => res.data)
      .then(
        (res) => {
          setHottestLocation(
            res.info.sort(function (a, b) {
              if (a.numberOfTimesRented < b.numberOfTimesRented) return -1;
              if (a.numberOfTimesRented > b.numberOfTimesRented) return 1;
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
  const getTotalStats = () => {
    return fpost({
      url: "customer/TotalStats",
      data: {},
    })
      .then((res) => res.data)
      .then(
        (res) => {
          setTotalStats(res.info);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  const getOrdersPerUser = () => {
    return fpost({
      url: "customer/OrderPerUser",
      data: {},
    })
      .then((res) => res.data)
      .then(
        (res) => {
          setOrdersPerUser(res.info);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    getPerBikeStats().then(() =>
      getHottestLocation().then(() =>
        getTotalStats().then(() => getOrdersPerUser())
      )
    );
  }, []);

  if (!isLoaded) {
    return <Loader></Loader>;
  } else if (error) {
    <Error error={error}></Error>;
  } else {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12">
            <div className="card my-2">
              <div className="card-body text-left">
                <p className="card-title display-6 gray text-center">
                  Dashboard
                </p>
                <hr />
                <div className="row my-4 justify-content-center">
                  <div className="col-12 align-self-center">
                    <TotalStats data={totalStats} />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-12 col-sm">
                    <HottestLocation data={hottestLocation} />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-12">
                    <BikeStats data={perBikeStats} />
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-12">
                    <OrdersPerUser data={ordersPerUser} />
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

export default ManagerHomePage;
