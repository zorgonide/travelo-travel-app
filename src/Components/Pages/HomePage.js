import React from "react";
import CustomerHomePage from "./CustomerHomePage";
import ManagerHomePage from "./ManagerHomePage";
import OperatorHomePage from "./OperatorHomePage";

function HomePage() {
  let user = { type: "operator" };
  if (user.type === "customer") return <CustomerHomePage />;
  else if (user.type === "manager") return <ManagerHomePage />;
  else if (user.type === "operator") return <OperatorHomePage />;
}

export default HomePage;
