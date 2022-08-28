import React from "react";
import PropTypes from "prop-types";

function ShowList({ listTodo, onDle, onStatus }) {
  const changedStatus = (val, index) => {
    if (onStatus) {
      onStatus(val, index);
    }
  };

  return (
    <>
      {listTodo.map((item, index) => {
        return (
          <li key={item.id}>
            <span
              className={item.isomplete ? "textCheck" : "textNodeCheck"}
              style={{ cursor: "pointer" }}
              onClick={() => onStatus(item)}
            >
              {item.nameToDo}{" "}
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span
              onClick={() => onDle(item.id)}
              style={{ cursor: "pointer" }}
              className="dleCheckBox"
            >
              &#10006;
            </span>
          </li>
        );
      })}
    </>
  );
}

ShowList.propTypes = {
  listTodo: PropTypes.array,
  onDle: PropTypes.func,
  onUpdateStatus: PropTypes.func,
};
ShowList.defaultProps = {
  listTodo: [],
  onDle: null,
  onStatus: null,
};

export default ShowList;
