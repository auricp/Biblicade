import React, { useState, useEffect, useRef } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import ImageIcon from '@mui/icons-material/Image';
import { useFormData } from '../Context/formdatacontext';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import "./AddGames.css";

Modal.setAppElement('#root');

const AddGamesForm = ({ requestClose, onSubmit }) => {
    const [error, setError] = useState('');
    const location = useLocation();
    const errorRef = useRef(null);
    const { formData, dispatch } = useFormData();
    const [errorTitle, setErrorTitle] = useState(false);
    const [images, setImages] = useState([]);

    const handleTextInput = (inputName, value) => {
        if (inputName === "title") {
            setErrorTitle(false);
        }
        dispatch({ type: 'UPDATE_DATA', payload: { [inputName]: value } });
    }

    const handleUpload = () =>{
        const fileInput = document.getElementById('imageFile');
        fileInput.value=null;
        fileInput.click();
     };

    const handleImageChange = (e) => {
        const files = e.target.files;
        const fileArray = Array.from(files);
        setImages(fileArray);
    }

    useEffect(() => {
        if (errorTitle) {
            errorRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [errorTitle]);

    return (
        <div className="add-game-container">
            <div className="game-rectangle"></div>
            <div className="game-line"></div>
            <ClearIcon onClick={requestClose} className="game-clear-icon" src="/api/prod-us-east-2-first-cluster/projects/LZTNXrW..." />
            <p className="add-game">Add a Game</p>
            <p className="game-id"> Game ID </p>
           
            <div className="title-bar">
                <p className="title-label"> Game Title </p>
                <input placeholder="Enter Here" className="title-input" type="text" name="title" value={formData.formData.title} onChange={(e) => handleTextInput(e.target.name, e.target.value)} />
            </div>
            <div className="group-51-kbU">
                <div className="game-description-frame">
                    <p className="description">Game Description</p>
                    <textarea type="text" placeholder="Description (Max 600 characters)" name="description" value={formData.formData.description} onChange={(e) => handleTextInput(e.target.name, e.target.value)} className="search-bar-eGA">
                    </textarea>
                </div>
            </div>
            <div className="game-info">
                <div className="auto-group-xevv-umC">
                        <div>Release Year</div>
                        <div className="frame-15-dWA">Release Month</div>
                        <div className="frame-15-wQN">Release Day</div>
                </div>
                <div className="auto-group-m8ww-hF8">
                    <div className="frame-15-wQN">Rating Score</div>
                    <div className="frame-15-3ri">Age Restriction</div>
                </div>
            </div>
            <div className="search-bar-3LE">
                <div onClick={handleUpload}></div>
                <input id="imageFile" type="file" style={{ display: 'none' }} multiple onChange={handleImageChange} className="file-input"/>
                <label htmlFor="imageFile" className="upload-photos-t5x">Upload Photo</label>
                <ImageIcon className="group-52-MVL"/>

                <p className="game-develop">Developer ID</p>
                <textarea name="input-box" value={formData.formData.developerID} onChange={(e) => handleTextInput(e.target.name, e.target.value)} className="search-bar-HqL">
                </textarea>
                <p className="game-develop">Publisher ID</p>
                <textarea name="input-box" value={formData.formData.publisherID} onChange={(e) => handleTextInput(e.target.name, e.target.value)} className="search-bar-HqL">
                </textarea>

            </div>
            {errorTitle && <p ref={errorRef} className="error-p1">{formData.duplicateTitleError}</p>}
            <div onClick={onSubmit} className="submit-UWv" id="I165:13952;165:8785">Complete </div>
        </div>
    );
};
export default AddGamesForm;
