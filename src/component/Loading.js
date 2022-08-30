import React from "react";
import PropTypes from "prop-types";
import "./index.css";
function Loading() {
  return (
    <div className="loader loader-7">
      <div className="line line1"></div>
      <div className="line line2"></div>
      <div className="line line3"></div>
    </div>
  );
}

Loading.propTypes = {};

export default Loading;
