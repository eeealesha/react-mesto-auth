import React from "react";


export function ImagePopup(props) {
	return (
		<div
			className={`popup popup_type_fig ${props.isOpen ? "popup_opened" : ""}`}
		>
			<figure className="popup__figure">
				<button
					className="button button_type_close"
					type="button"
					onClick={props.onClose}
				></button>
				<img
					className="popup__img"
					src={props.card ? props.card.link : ""}
					alt={props.card ? `Картинка с изображением ${props.card.name}` : ""}
				/>
				<figcaption className="popup__figcaption popup__figcaption-text">
					{props.card ? props.card.name : ""}
				</figcaption>
				<figcaption className="popup__figcaption popup__figcaption-owner">
					{props.card ? props.card.owner.name : ""}
				</figcaption>
				<figcaption className="popup__figcaption popup__figcaption-date">
					{props.card ? props.card.createdAt : ""}
				</figcaption>
				<figcaption className="popup__figcaption popup__figcaption-who">
					Кому нравится?
				</figcaption>
				<figcaption className="popup__figcaption popup__figcaption-likes">
					{props.likedUsers
						? props.likedUsers.map((like, i) => <img
							key={like._id}
							src={like.avatar}
							alt="likedAvatar"
							style={{ height: '50px', borderRadius: "50%", width: '50px' }}
						/>
						)
						: ""}
				</figcaption>
			</figure>
		</div>
	);
}
