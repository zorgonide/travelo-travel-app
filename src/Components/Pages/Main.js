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
import TrackPage from "./TrackPage";

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
          <Route path="/track" element={<TrackPage />} />
        </Route>
        <Route
          path="*"
          element={
            <div className="container-fluid">
              <div className="row align-items-center gray">
                <div className="col">
                  <p className="display-1">Page not found!</p>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default Main;
