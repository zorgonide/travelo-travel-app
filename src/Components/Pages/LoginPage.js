import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import LogIn from "../Images/login1.svg";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
// import { useCount } from "../Shared/count-context";
import { fpost } from "../Shared/apiCalls";
import Swal from "sweetalert2";
import { useUser } from "../Shared/user-context";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

function LoginPage() {
  const { dispatch } = useUser();
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-5 text-center">
            <div className="card my-3">
              <div className="card-body">
                <p className="card-title display-6 gray">Log In</p>
                <div className="img">
                  <img
                    src={LogIn}
                    width="260"
                    height="230"
                    className=""
                    alt="login"
                  />
                </div>
                <Formik
                  initialValues={{
                    password: "",
                    email: "",
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={async (values) => {
                    fpost({
                      url: `customer/LoginUser`,
                      data: {
                        email: values.email,
                        password: values.password,
                      },
                    })
                      .then((res) => res.data)
                      .then((res) => {
                        if (res.success) {
                          dispatch({ type: "login", user: res.info });
                          navigate("/");
                        } else {
                          Swal.fire({
                            title: "Error",
                            text: `Incorrect username or password`,
                            icon: "error",
                            confirmButtonText: "Dismiss",
                          });
                        }
                      })
                      .catch(() => {
                        Swal.fire({
                          title: "Error",
                          text: `Incorrect username or password`,
                          icon: "error",
                          confirmButtonText: "Dismiss",
                        });
                      });
                    // alert(JSON.stringify(values, null, 2));
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="form-floating mb-3">
                        <Field
                          className={
                            errors.email && touched.email
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          id="email"
                          name="email"
                          placeholder="example@email.com"
                          autoFocus
                        />
                        <label htmlFor="email">Email</label>
                        <div className="error">
                          <ErrorMessage name="email" />
                        </div>
                      </div>
                      <div className="form-floating mb-3">
                        <Field
                          className={
                            errors.password && touched.password
                              ? "form-control is-invalid"
                              : "form-control"
                          }
                          id="password"
                          type="password"
                          name="password"
                          placeholder="password"
                        />
                        <label htmlFor="password">Password</label>
                        <div className="error">
                          <ErrorMessage name="password" />
                        </div>
                      </div>
                      <div className="d-grid gap-2">
                        <button type="submit" className="button button1 mb-3">
                          Log in
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="card-footer text-muted link">
                Not registered? <Link to="/register">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
