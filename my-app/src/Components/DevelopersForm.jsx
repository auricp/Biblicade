import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

function DevelopersForm ({ isOpen, onClose }){
    const[error,setError] = useState('');
    const [developer, setDeveloper] = useState(null);
    const[developerIDColor,setDeveloperIDColor]=useState('#c2c2c2');
    const[nameColor,setNameColor]=useState('#c2c2c2');
    const[typeColor,setTypeColor]=useState('#c2c2c2');
    const[locationColor,setLocationColor]=useState('#c2c2c2');

    useEffect(() => {
        // Fetch developer details when the component mounts
        Axios.get(`http://localhost:3001/developers`)
            .then((response) => {
                setDeveloper(response.data);
            })
            .catch((error) => {
                console.error("Error fetching developers details:", error);
            });
    }, [developer]); // Dependency array ensures the effect runs when 'id' changes

    const [formData, setFormData] = useState({
        developerID: '',
        name: '',
        type: '',
        location: ''
    })
    const clearError=()=>{
        setError('');
        setDeveloperIDColor('#c2c2c2');
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
        if(formData.developerID.length ===0 || formData.name.length ===0 || formData.type.length ===0 || formData.location.length ===0){
            
            setError('All fields must be filled');
            if(formData.developerID.length===0){
                setDeveloperIDColor('red');
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

        // Check if developerID is a number greater than 20
        if (!isNumber(formData.developerID) || parseInt(formData.developerID) <= 16) {
            setError('developerID already exists. Must be a number greater than 16');
            setDeveloperIDColor('red');
            return;
        }

        // Now check if a developer with the same developerID or name already exists in the fetched games
        const developerExists = developer.find(developer => developer.developerID === formData.developerID || developer.name === formData.name);
        if (developerExists) {
            setError('Developer already exists');
            setNameColor('red');
            return;
        }

        const developerInfo = {
            developerID:formData.developerID,
            name:formData.name, 
            type:formData.type,
            location:formData.location
        }
    }

    const adddeveloper = () => {
        // Implement your logic to add the developer to the database
        Axios.post('http://localhost:3001/add-developer', {
            developerID: formData.developerID,
            name: formData.name,
            type: formData.type,
            location: formData.location,
        })
        .then(response => {
            // Handle success response
            console.log('Developer added successfully:', response.data);
            setError('');
        })
        .catch(error => {
            // Handle error
            console.error('Error adding developer:', error);
            setError('Error adding developer');
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
        <p class="register-gFU" id="161:5492">Add A New Developer</p>
        <div class="frame-49-a5x" id="161:5479">
        
        <div class ="search-bar-reg-1" style={{borderColor: developerIDColor}}>
        <p class="inputfields">Developer ID</p>
        <input class="email-input" id="161:5512" name="developerID" placeholder="Developer ID (must be a #)"value={formData.developerID} onChange={handleTextInput}></input>
        </div>
        <div class ="search-bar-reg-2" style={{borderColor: nameColor}}>
        <p class="inputfields">Developer Name</p>
        <input class="email-input" id="30:2361" name="name" placeholder="Developer Name" value={formData.name} onChange={handleTextInput}></input>
        </div>
        <div class ="search-bar-reg-2" style={{borderColor: typeColor}}>
        <p class="inputfields">Developer Type</p>
        <input class="email-input" id="30:2361" name="type" placeholder="EX: Corporation, Studio" value={formData.type} onChange={handleTextInput}></input>
        </div>
        <div class ="search-bar-reg-2" style={{borderColor: locationColor}}>
        <p class="inputfields">Location</p>
        <input class="email-input" id="30:2361" name="location" placeholder="EX: Tokyo" value={formData.location} onChange={handleTextInput}></input>
        </div>

        </div>
        <button type="submit" class="submit-cLi" id="30:2352" onClick={(e) => adddeveloper(e)}>Add Developer to Database</button>
        <span class="error-register">{error}</span>
        </div>
    );
};

export default DevelopersForm;