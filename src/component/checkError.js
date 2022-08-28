import React from "react";
import PropTypes from "prop-types";

function checkError({ errors, onSetCheckError }) {
  return (
    <>
      {errors !== "" ? (
        <h2 className="heading__title">
          {errors} &nbsp;&nbsp;&nbsp;&nbsp;
          <span
            style={{ cursor: "pointer" }}
            onClick={() => onSetCheckError("")}
          >
            &#10006;
          </span>
        </h2>
      ) : null}
    </>
  );
}

checkError.propTypes = {
  errors: PropTypes.string,
};
checkError.defaultProps = {
  errors: "",
};
export default React.memo(checkError);
