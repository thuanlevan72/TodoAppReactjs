import React, { useState } from "react";
import PropTypes from "prop-types";

function SearchTodo({ onPage, pageRes }) {
  const [inputSearch, setInputSearch] = useState("");
  const changeSeachSubmit = () => {
    onPage((prev) => ({ ...prev, searchParam: "", PageNumber: 1 }));
    setInputSearch("");
  };
  return (
    <>
      {" "}
      {/* onSubmit={(e) => onSubmit(e)} */}
      <form className="form" style={{ width: "100%", float: "right" }}>
        <div style={{ width: "80%", float: "right" }}>
          <label className="form__label" for="todo">
            ~ Tìm kiếm Todo ~
          </label>
          <input
            className="form__input"
            type="text"
            id="todo"
            name="to-do"
            size="30"
            value={inputSearch}
            placeholder={"tìm kiếm ..."}
            onChange={(event) =>
              onPage(
                (prev) => ({
                  ...prev,
                  searchParam: event.target.value,
                  PageNumber: 1,
                }),
                setInputSearch(event.target.value)
              )
            }
            required
          />{" "}
          {pageRes.searchParam ? (
            <button
              className="button"
              onClick={() => changeSeachSubmit()}
              type="reset"
            >
              <span>Reset</span>
            </button>
          ) : (
            ""
          )}
        </div>
      </form>
    </>
  );
}

SearchTodo.propTypes = {
  onPage: PropTypes.func,
  pageRes: PropTypes.object,
};
SearchTodo.defaultProps = {
  onPage: null,
  pageRes: {},
};

export default SearchTodo;
