import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Modal from 'react-modal';
import { Link, useNavigate } from "react-router-dom";
import "./GamesForm.css";

function GamesForm({ isOpen, onClose }) {
    const[error,setError] = useState('');
    const [games, setGames] = useState([]);
    const navigate = useNavigate();
    const[gameIDColor,setGameIDColor]=useState('#c2c2c2');
    const[titleColor,setTitleColor]=useState('#c2c2c2');
    const[descriptionColor,setDescriptionColor]=useState('#c2c2c2');
    const[genreColor,setGenreColor]=useState('#c2c2c2');
    const[releaseDayColor,setReleaseDayColor]=useState('#c2c2c2');
    const[releaseMonthColor,setReleaseMonthColor]=useState('#c2c2c2');
    const[releaseYearColor,setReleaseYearColor]=useState('#c2c2c2');
    const[ratingColor,setRatingColor]=useState('#c2c2c2');
    const[ageColor,setAgeColor]=useState('#c2c2c2');
    const[developColor,setDevelopColor]=useState('#c2c2c2');
    const[publishColor,setPublishColor]=useState('#c2c2c2');
    const[selectColor,setSelectColor] = useState('#c2c2c2');

    useEffect(() => {
    // Fetch games when the component mounts
    Axios.get("http://localhost:3001/games")
        .then((response) => {
        setGames(response.data);
        })
        .catch((error) => {
        console.error("Error fetching games:", error);
        });
    }, []);

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
    const clearError=()=>{
        setError('');
        setGameIDColor('#c2c2c2');
        setTitleColor('#c2c2c2');
        setDescriptionColor('#c2c2c2');
        setGenreColor('#c2c2c2');
        setReleaseDayColor('#c2c2c2');
        setReleaseMonthColor('#c2c2c2');
        setReleaseYearColor('#c2c2c2');
        setRatingColor('#c2c2c2');
        setAgeColor('#c2c2c2');
        setPublishColor('#c2c2c2');
        setDevelopColor('#c2c2c2');
        setSelectColor('#c2c2c2');
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
        if(formData.gameID.length ===0 || formData.title.length ===0 || formData.description.length ===0 || formData.genre.length ===0 || formData.releaseDay.length ===0 ||  formData.releaseMonth.length ===0
        ||  formData.releaseYear.length ===0 ||  formData.ratingScore.length ===0 || formData.ageRestriction.length ===0 || formData.developerID.length ===0 || formData.publisherID.length ===0){
            
            setError('All fields must be filled');
            if(formData.gameID.length===0){
                setGameIDColor('red');
            }
            if(formData.title.length===0){
                setTitleColor('red');
            }
            if(formData.description.length===0){
                setDescriptionColor('red');
            }
            if(formData.genre.length===0){
                setGenreColor('red');
            }
            if(formData.releaseDay.length===0){
                setReleaseDayColor('red');
            }
            if(formData.releaseMonth.length===0){
                setReleaseMonthColor('red');
            }
            if(formData.releaseYear.length===0){
                setReleaseYearColor('red');
            }
            if(formData.ratingScore.length===0){
                setRatingColor('red');
            }
            if(formData.ageRestriction.length===0){
                setAgeColor('red');
            }
            if(formData.publisherID.length===0){
                setPublishColor('red');
            }
            if(formData.developerID.length===0){
                setDevelopColor('red');
            }
        }
        // Validation function to check if a value is a number
        const isNumber = (value) => {
            return !isNaN(value);
        };

        // Validation function to check if a value is a valid year (between 1000 and 9999)
        const isValidYear = (year) => {
            return /^\d{4}$/.test(year) && parseInt(year) >= 1000 && parseInt(year) <= 9999;
        };

        // Validation function to check if a value is a valid month (between 1 and 12)
        const isValidMonth = (month) => {
            return /^\d{1,2}$/.test(month) && parseInt(month) >= 1 && parseInt(month) <= 12;
        };

        // Validation function to check if a value is a valid day (between 1 and 31)
        const isValidDay = (day) => {
            return /^\d{1,2}$/.test(day) && parseInt(day) >= 1 && parseInt(day) <= 31;
        };

        // Check if gameID is a number greater than 20
        if (!isNumber(formData.gameID) || parseInt(formData.gameID) <= 20) {
            setError('GameID already exists. Must be a number greater than 20');
            setGameIDColor('red');
            return;
        }

        // Check if releaseYear is a valid year
        if (!isValidYear(formData.releaseYear)) {
            setError('Release year is not in a valid format');
            setReleaseYearColor('red');
            return;
        }

        // Check if releaseMonth is a valid month
        if (!isValidMonth(formData.releaseMonth)) {
            setError('Release month is not in a valid format');
            setReleaseMonthColor('red');
            return;
        }

        // Check if releaseDay is a valid day
        if (!isValidDay(formData.releaseDay)) {
            setError('Release day is not in a valid format');
            setReleaseDayColor('red');
            return;
        }

        // Check if ratingScore is a number
        if (!isNumber(formData.ratingScore)) {
            setError('Rating score must be a number');
            setRatingColor('red');
            return;
        }

        // Check if ageRestriction is a number
        if (!isNumber(formData.ageRestriction)) {
            setError('Age restriction must be a number');
            setAgeColor('red');
            return;
        }

        // Check if developerID is a number greater than 1
        if (!isNumber(formData.developerID) || parseInt(formData.developerID) <= 1) {
            setError('Developer ID must be a number greater than 1');
            setDevelopColor('red');
            return;
        }

        // Check if publisherID is a number greater than 1
        if (!isNumber(formData.publisherID) || parseInt(formData.publisherID) <= 1) {
            setError('Publisher ID must be a number greater than 1');
            setPublishColor('red');
            return;
        }
        // Now check if a game with the same gameID or title already exists in the fetched games
        const gameExists = games.find(game => game.gameID === formData.gameID || game.title === formData.title);
        if (gameExists) {
            setError('Game already exists');
            setTitleColor('red');
            return;
        }

        // If all checks pass and the game doesn't exist, proceed with form submission
        const gameInfo = {
            gameID:formData.gameID,
            title:formData.title,
            description:formData.description,
            genre:formData.genre,
            releaseYear:formData.releaseYear,
            releaseMonth:formData.releaseMonth,
            releaseDay:formData.releaseDay,
            ratingScore:formData.ratingScore,
            ageRestriction:formData.ageRestriction,
            developerID:formData.developerID,
            publisherID:formData.publisherID
        };
    }

    // Function to add the game to the database
    const addGameToDatabase = () => {
        // Implement your logic to add the game to the database
        Axios.post('http://localhost:3001/add-game', {gameID: formData.gameID, title: formData.title, description: formData.description, genre: formData.genre, releaseYear: formData.releaseYear, releaseMonth: formData.releaseMonth, 
        releaseDay: formData.releaseDay, ratingScore: formData.ratingScore, ageRestriction: formData.ageRestriction, developerID: formData.developerID, publisherID: formData.publisherID})
        .then(response => {
            // Handle success response
            console.log('Game added successfully:', response.data);
            setError('');
            navigate('../');
        })
        .catch(error => {
            // Handle error
            console.error('Error adding game:', error);
            setError('Error adding game');
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
        <p class="register-gFU" id="161:5492">Add A New Game</p>
        <div class="frame-49-a5x" id="161:5479">
        
        <div class ="search-bar-reg-1" style={{borderColor: gameIDColor}}>
        <p class="inputfields">Game ID</p>
        <input class="email-input" id="161:5512" name="gameID" placeholder="Game ID (must be a #)"value={formData.gameID} onChange={handleTextInput}></input>
        </div>
        <div class ="search-bar-reg-2" style={{borderColor: titleColor}}>
        <p class="inputfields">Game Title</p>
        <input class="email-input" id="30:2361" name="title" placeholder="Game Title" value={formData.title} onChange={handleTextInput}></input>
        </div>
        <div class ="add-game-container" style={{borderColor: descriptionColor}}>
        <input placeholder="Description (Max 600 characters)" name="description" value={formData.description} onChange={handleTextInput} className="search-bar-eGA"></input>
        </div>

        <div class ="search-bar-reg-4" style={{borderColor: genreColor}}>
        <p class="inputfields">Genre</p>
        <input class="email-input" id="30:2348" name="genre" placeholder="Ex: Horror" value={formData.genre} onChange={handleTextInput}></input>
        </div>
        
        <div class ="search-bar-reg-5" style={{borderColor: releaseDayColor}}>
        <p class="inputfields">Release Year</p>
        <input class="email-input" id="30:2357" name="releaseYear" placeholder= "YYYY" value={formData.releaseYear} onChange={handleTextInput}></input>
        </div>
        
        <div class ="search-bar-reg-5" style={{borderColor: releaseMonthColor}}>
        <p class="inputfields">Release Month</p>
        <input className="email-input" id="30:2357" name="releaseMonth" placeholder="MM" value={formData.releaseMonth} onChange={handleTextInput}></input>
        </div>

        <div class ="search-bar-reg-5" style={{borderColor: releaseMonthColor}}>
        <p class="inputfields">Release Day</p>
        <input className="email-input" id="30:2357" name="releaseDay" placeholder="DD" value={formData.releaseDay} onChange={handleTextInput}></input>
        </div>

        <div class ="search-bar-reg-5" style={{borderColor: releaseMonthColor}}>
        <p class="inputfields">Rating Score</p>
        <input className="email-input" id="30:2357" name="ratingScore" placeholder="EX: 50" value={formData.ratingScore} onChange={handleTextInput}></input>
        </div>
        
        <div class ="search-bar-reg-5" style={{borderColor: releaseMonthColor}}>
        <p class="inputfields">Age Restriction</p>
        <input className="email-input" id="30:2357" name="ageRestriction" placeholder="EX: 17" value={formData.ageRestriction} onChange={handleTextInput}></input>
        </div>

        <div class ="search-bar-reg-5" style={{borderColor: releaseMonthColor}}>
        <p class="inputfields">Developer ID</p>
        <input className="email-input" id="30:2357" name="developerID" placeholder="EX: 6" value={formData.developerID} onChange={handleTextInput}></input>
        </div>

        <div class ="search-bar-reg-5" style={{borderColor: releaseMonthColor}}>
        <p class="inputfields">Publisher ID</p>
        <input className="email-input" id="30:2357" name="publisherID" placeholder="EX: 6" value={formData.publisherID} onChange={handleTextInput}></input>
        </div>

        </div>
        <button type="submit" class="submit-cLi" id="30:2352" onClick={(e) => addGameToDatabase(e)}>Add Game to Database</button>
        <span class="error-register">{error}</span>
        </div>
    );
};
  
export default GamesForm;
