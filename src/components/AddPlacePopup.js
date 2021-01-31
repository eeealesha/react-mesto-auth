import {PopupWithForm} from "./PopupWithForm";
import React from "react";
import {useState} from "react";

export function AddPlacePopup(props) {
	const [fileInputState, setFileInputState] = useState('');
	const [previewSource, setPreviewSource] = useState('');
	const [selectedFile, setSelectedFile] = useState();
	const [title, setTitle] = React.useState('');

	function handleTitleChange(e) {
		setTitle(e.target.value);
	}

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

	function handleSubmit(e) {
		e.preventDefault();
		if (!selectedFile) return;
		const reader = new FileReader();
		reader.readAsDataURL(selectedFile);
		reader.onloadend = () => {
			props.onAddPlace({
				name: title,
				base64EncodedImage: reader.result
			})
		};
		reader.onerror = () => {
			console.error('AHHHHHHHH!!');
		};


	}

	React.useEffect(() => {
		setTitle("")
		setFileInputState('');
		setPreviewSource('');
	}, [props.isOpen]);

	return (
		<PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title='Новое место' name='add'
		               buttonText='Создать' children={
			<>

				<label className="form__field">
					<input
						type="text"
						className="form__item form__item_el_place"
						id="place"
						name="place"
						placeholder="Название"
						required
						minLength="1"
						maxLength="30"
						value={title}
						onChange={handleTitleChange}
					/>
					<div className="form__error-text" id="place-error"></div>
				</label>
				<label className="form__field">
					<input
						id="fileInput"
						type="file"
						name="image"
						onChange={handleFileInputChange}
						value={fileInputState}
						className="form__item"
					/>
				</label>
				{previewSource && (
					<img
						src={previewSource}
						alt="chosen"
						style={{height: '300px', width:'300px'}}
					/>
				)}
			</>}/>

	)
}