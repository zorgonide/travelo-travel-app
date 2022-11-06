import React from "react";
import CustomerHomePage from "./CustomerHomePage";
import ManagerHomePage from "./ManagerDashboard";
import OperatorHomePage from "./OperatorHomePage";
import { useUser } from "../Shared/user-context";
import ManagerMainPage from "./ManagerHomePage";

function HomePage() {
  const {
    state: { user },
  } = useUser();
  // let user = { type: "operator" };
  if (user.type === "customer") return <CustomerHomePage />;
  else if (user.type === "manager") return <ManagerMainPage />;
  else if (user.type === "operator") return <OperatorHomePage />;
}

export default HomePage;
