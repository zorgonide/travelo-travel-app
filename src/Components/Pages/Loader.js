import React from "react";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#4fbfa8",
};
function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  return (
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col">
          <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </div>
    </div>
  );
}

export default Loader;
