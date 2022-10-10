import React from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import SignUp from "../Images/signup.svg";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
});

function RegisterPage() {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        {/* <div className="col-12 col-sm-8 align-self-center">
          <div className="img">
            <img
              src={SignUp}
              width="500"
              height="500"
              className=""
              alt="login"
            />
          </div>
        </div> */}
        <div className="col-12 text-center">
        <div className="card my-3">
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
                  confirmpassword: ""
                }}
                validationSchema={SignUpSchema}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  alert(JSON.stringify(values, null, 2));
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="form-floating mb-3">
                      <Field
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
                    <div className="form-floating mb-3">
                      <Field
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
                    <div className="form-floating mb-3">
                      <Field
                        className="form-control"
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
                        className="form-control"
                        id="confirmpassword"
                        type="confirmpassword"
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
  )
}

export default RegisterPage