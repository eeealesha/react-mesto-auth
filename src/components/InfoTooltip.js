import fail from "../images/Union.svg";
import success from "../images/Union-2.svg";

export function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className={"popup__container"}>
        <button
          className="button button_type_close"
          type="button"
          onClick={props.onClose}
        />
        <img
          className={"icon"}
          alt={"icon"}
          src={`${props.error ? fail : success}`}
        ></img>
        <h2 className="infotooltip__title">{props.message}</h2>
      </div>
    </div>
  );
}
