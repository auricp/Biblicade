import React, { useState } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
import {useFormData} from '../Context/formdatacontext.js';
import { Link } from "react-router-dom";

function GamesForm({isOpen}) {
    const[error,setError] = useState('');

    const [formData, setFormData] = useState({
        gameID: '',
        title: '',
        description: '',
        genre: '',
        releaseYear: '',
        releaseMonth: '',
        releaseDay: '',
        ratingScore: '',
        ageRestriction: '',
        developerID: '',
        publisherID: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const checkEmptyFields = () =>{
            for(let val in formData.formData){
                    if(Object.hasOwnProperty.call(formData.formData,val)){
                        if(formData.formData[val]===''){
                            return false;
                        }
                    }
                }
            return false;
        }
        const isEmpty = checkEmptyFields();
          
        if(isEmpty){
            setError('Please fill out all fields');
        }
    
        const handleInputChange = (e) => {
            const { title, value } = e.target;
            setFormData({
                ...formData,
                [title]: value,
            });
        };    

        // Example: Add new game
        Axios.post('http://localhost:3001/games', formData)
            .then((response) => {
                console.log('New game added:', response.data);
                // Clear form fields after submission if needed
                setFormData({
                    gameID: '',
                    title: '',
                    description: '',
                    genre: '',
                    releaseYear: '',
                    releaseMonth: '',
                    releaseDay: '',
                    ratingScore: '',
                    ageRestriction: '',
                    developerID: '',
                    publisherID: '',
                });
            })
            .catch((error) => {
                console.error('Error adding new game:', error);
                // Handle error state if needed
            });
    };

    useEffect(()=>{
        if(isOpen){
            document.body.style.overflow='hidden'
        }
        else{
            document.body.style.overflow='auto';
        }
        return()=>{
            document.body.overflow='auto';
        }
    },[isOpen]);

    return (
        <Modal
        isOpen = {isOpen}
        onRequestClose ={()=>requestClose()}
        style={{
 
           overlay: {
        
            backgroundColor: 'rgba(0,0,0,0.5)',
            display:isOpen ? 'block' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right:0,
            bottom: 0,
            zIndex: 2,
           },
           content:{
            display:isOpen ? 'block' : 'none',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            height: '100%',
            width: '26%',
            backgroundColor: 'white',
            overflow:'auto',

           }
        }}
        contentLabel="Example Modal">
        <div id="modal-content">
    </div>

    </Modal>

    );
};
  
export default GamesForm;
