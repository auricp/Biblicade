import "./navbar.css";
import React, { useContext, useState, useEffect} from "react";
import { UserContext } from "../Context/usercontext";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../Images/logo.png";
import { useFormData } from "../Context/formdatacontext";
import Axios from 'axios';
import FilterNone from "@mui/icons-material/FilterNoneOutlined";
import images from './images.js'
import '../Components/SuggestedGames.css'

function SuggestedGames() {
  const { searchQuery} = useParams(); 
  const [suggestedGames, setSuggestedGames] = useState([]);
  const [games, setGameList] = useState([]);
  const [gameNames, setGameNames] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3001/games').then((response) => {
      setGameList(response.data);
    });
    }, []);


    useEffect(() => {
        const names = games.map(game => game.title);
        setGameNames(names)
        const filteredGames = gameNames.filter((name) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        filteredGames.sort((a, b) => {
            // Find the index of the search query in each game name
            const indexA = a.toLowerCase().indexOf(searchQuery.toLowerCase());
            const indexB = b.toLowerCase().indexOf(searchQuery.toLowerCase());
        
            // Sort based on the index, with smaller indexes (stronger match) first
            return indexA - indexB;
          });
        setSuggestedGames(filteredGames);
    }, [games]);
      
    console.log(suggestedGames);

  return (
    <div>
      <h2 className='title'>Suggested Games</h2>
      <ul>
        {suggestedGames.map((game, index) => (
            <li className="game-icon" key={index}>
          <img src={images[game]} alt={game} className='game-image'/>
          <Link to={`/GamePage/${game}`} className='game-title'>{game}</Link>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default SuggestedGames;
 