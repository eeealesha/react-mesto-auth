import {PopupWithForm} from "./PopupWithForm";
import React from "react";
import {useState} from "react";

export function EditAvatarPopup(props){
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState();

    function handleSubmit(e) {
        e.preventDefault();
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            console.log(typeof(reader.result))
            setPreviewSource(reader.result);
        }
    }

    // React.useEffect(() => {
    //     setFileInputState("");
    // }, [props.isOpen]);

    return(
        <PopupWithForm onClose={props.onClose} isOpen={props.isOpen} title='Обновить аватар'
                       onSubmit={handleSubmit} name='avatar' buttonText='Сохранить' children={<>
            <label className="form__field">
                <input
                    type="file"
                    className="form__item form__item_el_link"
                    id="link"
                    name="link"
                    placeholder="https://somewebsite.com/someimage.jpg"
                    required
                    onChange={handleFileInputChange}
                    value={fileInputState}
                />
                <div className="form__error-text" id="link-error">
                    {previewSource && (<img src={previewSource} alt="avatar" style={{height:"300px"}}/>)}
                </div>
            </label>
        </>}/>
    )
}

