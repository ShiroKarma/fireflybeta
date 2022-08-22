import React from "react";
import MapPath from "../location_map.png";

function LocationMap(props) {
  return (
    <div>
      <div className="row-fluid mt-3 mx-3">
        {/* <img src={MapPath} alt="Location Mapping" className="img-fluid" /> */}
      </div>
      <div className="row pt-2 mx-3" style={{ backgroundColor: "#FFEFEF" }}>
        <b className="row d-flex justify-content-end">Email</b>
        <div className="row d-flex justify-content-end">43322@prc.ac.th</div>
        <b className="row mt-2 d-flex justify-content-end">Address</b>
        <div className="row pb-2 d-flex justify-content-end">
          Chiang Mai, Thailand
        </div>
      </div>
    </div>
  );
}

export default LocationMap;
