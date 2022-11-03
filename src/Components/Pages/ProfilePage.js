import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faPoundSign } from "@fortawesome/free-solid-svg-icons";
import Profile from "../Images/profile.svg";
import { Link, useNavigate } from "react-router-dom";
import { fget, fpost } from "../Shared/apiCalls";
import Error from "./Error";
import { useUser } from "../Shared/user-context";
import Loader from "./Loader";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#4fbfa8",
};
function ProfilePage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWalletLoaded, setIsWalletLoaded] = useState(false);
  const [profile, setProfile] = useState({});
  const [wallet, setWallet] = useState({});
  let [color, setColor] = useState("#ffffff");

  const {
    state: { user },
  } = useUser();
  const fetchUser = () => {
    // var axios = require('axios');
    var data = JSON.stringify({
      user_id: user.user_id,
    });

    var config = {
      method: "get",
      url: "http://127.0.0.1:8000/customer/getCustomerDetails",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setProfile(response.data.info.find((e) => e.id == user.user_id));
        setIsLoaded(true);
      })
      .catch(function (error) {
        setIsLoaded(true);
      });
  };
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
        setIsWalletLoaded(true);
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: `Some error occurred in fetching balance`,
          icon: "error",
          confirmButtonText: "Dismiss",
        });
      });
  };
  useEffect(() => {
    fetchUser();
    fetchWallet();
  }, []);
  if (!isLoaded) {
    return <Loader></Loader>;
  } else if (error) {
    <Error error={error}></Error>;
  } else {
    return (
      <div className="container-fluid">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-5 ">
              <div className="card my-2">
                <div className="card-body">
                  <p className="card-title display-6 gray text-center">
                    Profile
                  </p>
                  <hr />
                  <div className="img text-center">
                    <img
                      src={Profile}
                      width="260"
                      height="230"
                      className=""
                      alt="pic"
                    />
                  </div>
                  <Formik
                    initialValues={{
                      email: profile.email,
                      firstname: profile.first_name,
                      lastname: profile.last_name,
                      userId: user.user_id,
                    }}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <div className="form-floating mb-3">
                          <Field
                            readOnly
                            className="form-control"
                            id="userId"
                            name="userId"
                            placeholder="example@userId.com"
                          />
                          <label htmlFor="userId">User ID</label>
                          <div className="error">
                            <ErrorMessage name="userId" />
                          </div>
                        </div>
                        <div className="form-floating mb-3">
                          <Field
                            readOnly
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="example@email.com"
                          />
                          <label htmlFor="email">Email</label>
                          <div className="error">
                            <ErrorMessage name="email" />
                          </div>
                        </div>
                        <div className="form-floating mb-3">
                          <Field
                            readOnly
                            className="form-control"
                            id="firstname"
                            name="firstname"
                            placeholder="example@firstname.com"
                          />
                          <label htmlFor="firstname">First Name</label>
                          <div className="error">
                            <ErrorMessage name="firstname" />
                          </div>
                        </div>
                        <div className="form-floating ">
                          <Field
                            readOnly
                            className="form-control"
                            id="lastname"
                            name="lastname"
                            placeholder="example@lastname.com"
                          />
                          <label htmlFor="lastname">Last Name</label>
                          <div className="error">
                            <ErrorMessage name="lastname" />
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                  <div className="row">
                    {!isWalletLoaded ? (
                      <ClipLoader
                        color={color}
                        loading={true}
                        cssOverride={override}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      <>
                        <div className="d-grid gap-2 mt-3">
                          <button
                            onClick={() => navigate("/wallet")}
                            className="button button1 mb-3"
                          >
                            Balance <FontAwesomeIcon icon={faPoundSign} />{" "}
                            {wallet.balance < 0 ? (
                              <span className="text-danger">
                                {wallet.balance}
                              </span>
                            ) : (
                              <span>{wallet.balance}</span>
                            )}
                          </button>
                        </div>
                      </>
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

export default ProfilePage;
