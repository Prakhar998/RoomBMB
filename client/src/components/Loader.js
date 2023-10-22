import { useState, CSSProperties } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  return (
    <div className="sweet-loading" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <ScaleLoader
        color="#36d7b7"
        loading={loading}
        css={override}
        size={150}
      />
    </div>
  );
}

export default Loader;
