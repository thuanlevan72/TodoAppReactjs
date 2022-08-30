import React from "react";
import PropTypes from "prop-types";

function Paging({ onPage, resPage }) {
  return (
    <>
      <div className="boxBtn">
        <button
          className="btnPage"
          disabled={!resPage.hasPrevious}
          onClick={() =>
            onPage((prev) => ({
              ...prev,
              PageNumber: prev.PageNumber - 1,
            }))
          }
        >
          Prev
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        {Array(resPage.totalPages)
          .fill(1)
          .map((el, i) => (
            <span
              key={i}
              style={
                i + 1 === resPage.currentPage
                  ? { cursor: "pointer", color: "red" }
                  : { cursor: "pointer" }
              }
              sty
              onClick={() =>
                onPage((prev) => ({
                  ...prev,
                  PageNumber: i + 1,
                }))
              }
            >
              {i + 1} &nbsp;&nbsp;&nbsp;&nbsp; {}
            </span>
          ))}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className="btnPage"
          disabled={!resPage.hasNext}
          onClick={() =>
            onPage((prev) => ({
              ...prev,
              PageNumber: prev.PageNumber + 1,
            }))
          }
        >
          Next
        </button>
      </div>
    </>
  );
}

Paging.propTypes = {
  onPage: PropTypes.func,
  resPage: PropTypes.object,
};
Paging.defaultProps = {
  onPage: null,
  resPage: {},
};
export default Paging;
