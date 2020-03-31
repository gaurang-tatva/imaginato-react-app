import React from "react";
import TopBar from "../Components/TopBar/TopBar";
import Orders from "./Orders";

/**
 * Base Component / Dashboard
 */
export default function BaseContainer() {
  return (
    <React.Fragment>
      <TopBar />
      <Orders />
    </React.Fragment>
  );
}
