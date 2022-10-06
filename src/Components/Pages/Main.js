import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../Shared/ProtectedRoute";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function Main() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route
        path="*"
        element={
          <div>
            <p>Page not found!</p>
          </div>
        }
      />
    </Routes>
  );
}

export default Main;
