export function InfoTooltip(props){
    return(
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>

            <button className="button button_type_close" type="button" onClick={props.onClose}></button>
            
            <h2 className="popup__title">Привет</h2>

        </div>
    )
}