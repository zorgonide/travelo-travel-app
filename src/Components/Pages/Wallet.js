import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faPoundSign } from "@fortawesome/free-solid-svg-icons";
import Profile from "../Images/wallet.svg";
import { Link, useNavigate } from "react-router-dom";
import { fget, fpost } from "../Shared/apiCalls";
import Error from "./Error";
import { useUser } from "../Shared/user-context";
import Loader from "./Loader";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";

function Wallet() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [wallet, setWallet] = useState({});

  const {
    state: { user },
  } = useUser();
  const fetchWallet = () => {
    fpost({
      url: "customer/ShowBalance",
      data: {
        user_id: user.user_id,
      },
    })
      .then((res) => res.data)
      .then((res) => {
        setWallet(res.info);
        setIsLoaded(true);
      })
      .catch(() => {
        setError(true);
        Swal.fire({
          title: "Error",
          text: `Some error occurred in fetching balance`,
          icon: "error",
          confirmButtonText: "Dismiss",
        });
      });
  };
  const rechargeWallet = () => {
    Swal.fire({
      title: "Enter Amount",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      confirmButtonColor: "#4fbfa8",
      showCancelButton: true,
      confirmButtonText: "Recharge",
      showLoaderOnConfirm: true,
      preConfirm: (amount) => {
        console.log(typeof amount);
        if (isNaN(+amount)) {
          Swal.fire({
            title: "Error",
            text: `Enter a number`,
            icon: "error",
            confirmButtonText: "Dismiss",
          });
        } else
          fpost({
            url: "customer/RechargeWallet",
            data: {
              user_id: user.user_id,
              amount: parseInt(amount),
            },
          })
            .then((res) => res.data)
            .then((res) => {
              if (res.success) {
                //check if number
                Swal.fire({
                  confirmButtonColor: "#4fbfa8",
                  title: "Order Confirmed",
                  html: `<p>Wallet has been recharged with £ ${amount}`,
                  icon: "success",
                  confirmButtonText: "Okay",
                });
                fetchWallet();
              } else {
                Swal.fire({
                  title: "Error",
                  text: `Some error occurred`,
                  icon: "error",
                  confirmButtonText: "Dismiss",
                });
              }
            });
      },
    }).then((res) => {
      // if (res.isConfirmed) navigate("/");
    });
  };
  useEffect(() => {
    fetchWallet();
  }, []);
  if (!isLoaded) {
    return <Loader></Loader>;
  } else if (error) {
    <Error error={error}></Error>;
  } else {
    return (
      <div className="container">
        <div className="row my-4 justify-content-center">
          <div className="col-12 col-sm-5 ">
            <div className="card my-2">
              <div className="card-body">
                <p className="card-title display-6 gray text-center">Wallet</p>
                <hr />
                <div className="img text-center">
                  <img
                    src={Profile}
                    width="260"
                    height="230"
                    className=""
                    alt="pic"
                  />
                  <br></br>
                  <div className="row list-card1 mx-1 my-3 p-3">
                    <div className="col" style={{ textAlign: "left" }}>
                      Amount spent
                    </div>
                    <div className="col" style={{ textAlign: "right" }}>
                      <FontAwesomeIcon icon={faPoundSign} />{" "}
                      {wallet.amount_spent}
                    </div>
                  </div>
                  <div className="row list-card1 mx-1 my-3 p-3">
                    <div className="col" style={{ textAlign: "left" }}>
                      Balance
                    </div>
                    <div className="col" style={{ textAlign: "right" }}>
                      <FontAwesomeIcon icon={faPoundSign} /> {wallet.balance}
                    </div>
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <button
                      onClick={() => rechargeWallet()}
                      className="button button1 mb-3"
                    >
                      <FontAwesomeIcon icon={faWallet} /> Recharge
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

export default Wallet;
