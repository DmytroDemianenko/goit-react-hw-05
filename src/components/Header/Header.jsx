import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = () => {
  return (
    <header>
      <nav className={s.wrapper}>
        <NavLink className={s.text} to="/">
          Home
        </NavLink>
        <NavLink className={s.text} to="/movies">
          Movies
        </NavLink>
      </nav>
      <hr />
    </header>
  );
};

export default Header;
