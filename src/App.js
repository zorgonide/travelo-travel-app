import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage";
import RegisterPage from "./Components/Pages/RegisterPage";
import HomePage from "./Components/Pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
