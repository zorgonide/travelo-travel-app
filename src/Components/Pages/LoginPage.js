import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import LogIn from "../Images/login1.svg";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

function LoginPage() {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
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
  );
}

export default LoginPage;
