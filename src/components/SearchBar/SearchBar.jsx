import React from "react";
import s from "./SearchBar.module.css";
const SearchBar = ({ handleChangeQuery }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const topic = form.elements.input.value.trim();
    if (topic === "") {
      return;
    }
    handleChangeQuery(topic);
    form.reset();
  };
  return (
    <div className={s.wrapper}>
      <form onSubmit={handleSubmit}>
        <input
          className={s.inputArea}
          type="text"
          name="input"
          autoComplete="off"
          autoFocus
          placeholder="Please, enter searching title"
        />
        <button className={s.btn} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
