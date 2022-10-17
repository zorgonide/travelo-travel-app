import React from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import SignUp from "../Images/signup.svg";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Required"),
  confirmpassword: Yup.string().required("Required"),
});

function RegisterPage() {
  const isPasswordValid = (password, confirmpassword) => {
    if (!password || !confirmpassword) return false;
    return password === confirmpassword;
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
        <div className="card my-3" style={{minWidth: "29rem"}}>
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
                  if (isPasswordValid(values.password, values.confirmpassword)){
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                  }
                  else alert("Passwords do not match")
                  
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
  )
}

export default RegisterPage