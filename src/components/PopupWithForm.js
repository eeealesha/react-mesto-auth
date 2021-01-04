import React from "react";

export function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <form
        onSubmit={props.onSubmit}
        className="popup__container"
        name={`${props.name}`}
        noValidate
      >
        <button
          className="button button_type_close"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <fieldset className="form">
          {props.children}
          <button className="button button_type_submit">
            {props.buttonText}
          </button>
        </fieldset>
      </form>
    </div>
  );
}
