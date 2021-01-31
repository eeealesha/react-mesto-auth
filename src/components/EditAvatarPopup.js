import {PopupWithForm} from "./PopupWithForm";
import React from "react";
import {useState} from "react";

export function EditAvatarPopup(props){
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            props.onUpdateAvatar(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };
    };

    React.useEffect(() => {
        setFileInputState('');
        setPreviewSource('');
    }, [props.isOpen]);

    return(
        <PopupWithForm onClose={props.onClose} isOpen={props.isOpen} title='Обновить аватар'
                       onSubmit={handleSubmitFile} name='avatar' buttonText='Сохранить' children={<>
            <label className="form__field">
                <input
                  id="fileInput"
                  type="file"
                  name="image"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                  className="form-input"
                />
            </label>
            {previewSource && (
              <img
                src={previewSource}
                alt="chosen"
                style={{ height: '300px' }}
              />
            )}
        </>}/>
    )
}

