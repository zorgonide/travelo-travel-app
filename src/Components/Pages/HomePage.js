import React from "react";
import CustomerHomePage from "./CustomerHomePage";
import ManagerHomePage from "./ManagerHomePage";
import OperatorHomePage from "./OperatorHomePage";
import { useUser } from "../Shared/user-context";
import ManagerMainPage from "./ManagerMainPage";

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
