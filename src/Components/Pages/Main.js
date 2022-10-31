import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../Shared/ProtectedRoute";
import ActionPage from "./ActionPage";
import BikesPage from "./BikesPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import RentPage from "./RentPage";
import ReportPage from "./ReportPage";
import ReturnPage from "./ReturnPage";

function Main() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/rent" element={<RentPage />} />
          <Route path="/rent/:locationId" element={<BikesPage />} />
          <Route path="/return" element={<ReturnPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/action" element={<ActionPage />} />
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
    </div>
  );
}

export default Main;
