import React from "react";
import CustomerHomePage from "./CustomerHomePage";
import ManagerHomePage from "./ManagerHomePage";
import OperatorHomePage from "./OperatorHomePage";
import { useUser } from "../Shared/user-context";

function HomePage() {
  // const {
  //   state: { user },
  // } = useUser();
  let user = { type: "customer" };
  if (user.type === "customer") return <CustomerHomePage />;
  else if (user.type === "manager") return <ManagerHomePage />;
  else if (user.type === "operator") return <OperatorHomePage />;
}

export default HomePage;
