import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

function PublishersForm ({ isOpen, onClose }){
    const[error,setError] = useState('');
    const navigate = useNavigate();
    const [publisher, setPublisher] = useState(null);
    const[publisherIDColor,setPublisherIDColor]=useState('#c2c2c2');
    const[nameColor,setNameColor]=useState('#c2c2c2');
    const[typeColor,setTypeColor]=useState('#c2c2c2');
    const[locationColor,setLocationColor]=useState('#c2c2c2');

    useEffect(() => {
        // Fetch publisher details when the component mounts
        Axios.get(`http://localhost:3001/publishers`)
            .then((response) => {
                setPublisher(response.data);
            })
            .catch((error) => {
                console.error("Error fetching publisher details:", error);
            });
    }, [publisher]); // Dependency array ensures the effect runs when 'id' changes

    const [formData, setFormData] = useState({
        publisherID: '',
        name: '',
        type: '',
        location: ''
    })
    const clearError=()=>{
        setError('');
        setPublisherIDColor('#c2c2c2');
        setNameColor('#c2c2c2');
        setTypeColor('#c2c2c2');
        setLocationColor('#c2c2c2');
    }
    const handleTextInput = (e)=>{
        clearError();
        const {name,value} =e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(formData.publisherID.length ===0 || formData.name.length ===0 || formData.type.length ===0 || formData.location.length ===0){
            
            setError('All fields must be filled');
            if(formData.publisherID.length===0){
                setPublisherIDColor('red');
            }
            if(formData.name.length===0){
                setNameColor('red');
            }
            if(formData.type.length===0){
                setTypeColor('red');
            }
            if(formData.location.length===0){
                setLocationColor('red');
            }
        }
        // Validation function to check if a value is a number
        const isNumber = (value) => {
            return !isNaN(value);
        };

        // Check if publisherID is a number greater than 20
        if (!isNumber(formData.publisherID) || parseInt(formData.publisherID) <= 15) {
            setError('PublisherID already exists. Must be a number greater than 15');
            setPublisherIDColor('red');
            return;
        }

        // Now check if a publisher with the same publisherID or name already exists in the fetched games
        const publisherExists = publisher.find(publisher => publisher.publisherID === formData.publisherID || publisher.name === formData.name);
        if (publisherExists) {
            setError('Publisher already exists');
            setNameColor('red');
            return;
        }

        const publisherInfo = {
            publisherID:formData.publisherID,
            name:formData.name, 
            type:formData.type,
            location:formData.location
        }
    }

    const addPublisher = () => {
        // Implement your logic to add the publisher to the database
        Axios.post('http://localhost:3001/add-publisher', {
            publisherID: formData.publisherID,
            name: formData.name,
            type: formData.type,
            location: formData.location,
        })
        .then(response => {
            // Handle success response
            console.log('Publisher added successfully:', response.data);
            setError('');
            navigate('../');
        })
        .catch(error => {
            // Handle error
            console.error('Error adding publisher:', error);
            setError('Error adding publisher');
        });
    }

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

    return(
        <div class="register" id="161:5477">
        <p class="register-gFU" id="161:5492">Add A New Publisher</p>
        <div class="frame-49-a5x" id="161:5479">
        
        <div class ="search-bar-reg-1" style={{borderColor: publisherIDColor}}>
        <p class="inputfields">Publisher ID</p>
        <input class="email-input" id="161:5512" name="publisherID" placeholder="Publisher ID (must be a #)"value={formData.publisherID} onChange={handleTextInput}></input>
        </div>
        <div class ="search-bar-reg-2" style={{borderColor: nameColor}}>
        <p class="inputfields">Publisher Name</p>
        <input class="email-input" id="30:2361" name="name" placeholder="Publisher Name" value={formData.name} onChange={handleTextInput}></input>
        </div>
        <div class ="search-bar-reg-2" style={{borderColor: typeColor}}>
        <p class="inputfields">Publisher Type</p>
        <input class="email-input" id="30:2361" name="type" placeholder="EX: Corporation, Studio" value={formData.type} onChange={handleTextInput}></input>
        </div>
        <div class ="search-bar-reg-2" style={{borderColor: typeColor}}>
        <p class="inputfields">Location</p>
        <input class="email-input" id="30:2361" name="location" placeholder="EX: Tokyo" value={formData.location} onChange={handleTextInput}></input>
        </div>

        </div>
        <button type="submit" class="submit-cLi" id="30:2352" onClick={(e) => addPublisher(e)}>Add Publisher to Database</button>
        <span class="error-register">{error}</span>
        </div>
    );
};

export default PublishersForm;