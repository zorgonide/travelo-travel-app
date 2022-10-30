import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import SignUp from "../Images/signup.svg";
import { fpost } from "../Shared/apiCalls";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .label("password")
    .required("Required")
    .min(8, "Seems a bit short...")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "At least 1 letter, 1 number and 1 special character"
    ),
  confirmpassword: Yup.string()
    .required("Required")
    .label("confirmpassword")
    .test("passwords-match", "Passwords don't match", function (value) {
      return this.parent.password === value;
    }),
  firstname: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only letters allowed")
    .required("Required"), //put in number validation
  lastname: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only letters allowed")
    .required("Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
});

function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <div className="card my-3" style={{ minWidth: "29rem" }}>
            {/* <img src="..." class="card-img-top" alt="..."> */}
            <div className="card-body">
              {/* <p className="card-title display-6 gray text-center">Register</p> */}
              <div className="img">
                <img
                  src={SignUp}
                  width="250"
                  height="200"
                  className=""
                  alt="login"
                />
              </div>
              <Formik
                initialValues={{
                  password: "",
                  email: "",
                  firstname: "",
                  lastname: "",
                  phone: "",
                  confirmpassword: "",
                }}
                validationSchema={SignUpSchema}
                onSubmit={async (values) => {
                  fpost({
                    url: "customer/registerUser",
                    data: {
                      first_name: values.firstname,
                      last_name: values.lastname,
                      email: values.email,
                      type: "customer",
                      password: values.password,
                    },
                  })
                    .then((res) => res.data)
                    .then((res) => {
                      if (res.success) {
                        Swal.fire({
                          title: "Success",
                          text: `New user created`,
                          icon: "success",
                          confirmButtonText: "Log In",
                        }).then((res) => {
                          if (res.isConfirmed) navigate("/login");
                        });
                      }
                    })
                    .catch(() => {
                      Swal.fire({
                        title: "Error",
                        text: `User already exists`,
                        icon: "error",
                        confirmButtonText: "Dismiss",
                      });
                    });
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="form-floating mb-3">
                      <Field
                        className={
                          touched.email && errors.email
                            ? "form-control is-invalid"
                            : "form-control"
                        }
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
                        className={
                          touched.firstname && errors.firstname
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="firstname"
                        name="firstname"
                        placeholder="example@firstname.com"
                      />
                      <label htmlFor="firstname">First Name</label>
                      <div className="error">
                        <ErrorMessage name="firstname" />
                      </div>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        className={
                          touched.lastname && errors.lastname
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="lastname"
                        name="lastname"
                        placeholder="example@lastname.com"
                      />
                      <label htmlFor="lastname">Last Name</label>
                      <div className="error">
                        <ErrorMessage name="lastname" />
                      </div>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        className={
                          touched.phone && errors.phone
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="phone"
                        type="phone"
                        name="phone"
                        placeholder="phone"
                      />
                      <label htmlFor="phonenumber">Phone</label>
                      <div className="error">
                        <ErrorMessage name="phone" />
                      </div>
                    </div>
                    <div className="form-floating mb-3">
                      <Field
                        className={
                          touched.password && errors.password
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

                    <div className="form-floating mb-3">
                      <Field
                        className={
                          touched.confirmpassword && errors.confirmpassword
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="confirmpassword"
                        type="password"
                        name="confirmpassword"
                        placeholder="confirmpassword"
                      />
                      <label htmlFor="confirmpassword">Confirm Password</label>
                      <div className="error">
                        <ErrorMessage name="confirmpassword" />
                      </div>
                    </div>
                    <div className="d-grid gap-2">
                      <button type="submit" className="button button1 mb-3">
                        Register
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer text-muted text-center link">
              Already registered? <Link to="/login">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
