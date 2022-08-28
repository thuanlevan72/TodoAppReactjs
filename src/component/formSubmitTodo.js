import React from "react";
import PropTypes from "prop-types";

function formSubmitTodo({ inputChange, onInputChange, onSubmit }) {
  return (
    <>
      {" "}
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div>
          <label className="form__label" for="todo">
            ~ Today I need to ~
          </label>
          <input
            className="form__input"
            type="text"
            id="todo"
            name="to-do"
            size="30"
            value={inputChange}
            onChange={(e) => onInputChange(e)}
            required
          />
          <button className="button">
            <span>Submit</span>
          </button>
        </div>
      </form>
    </>
  );
}

formSubmitTodo.propTypes = {
  inputChange: PropTypes.string,
  onInputChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

formSubmitTodo.defaultProps = {
  inputChange: "",
  onInputChange: null,
  onSubmit: null,
};
export default formSubmitTodo;
