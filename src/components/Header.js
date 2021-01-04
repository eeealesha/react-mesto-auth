import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="login__wrapper">
        <p className="login__text">
          {props.email}
          <Link
            to={props.page}
            onClick={props.onClick}
            className="login__link login__link_header"
          >
            {" "}
            {props.name}
          </Link>
        </p>
      </div>
    </header>
  );
}
