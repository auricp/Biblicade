import "./navbar.css";
import React, { useContext, useState, useEffect} from "react";
import { UserContext } from "../Context/usercontext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";
import { useFormData } from "../Context/formdatacontext";
import Axios from 'axios';

function Nav() {
  const { user, setUser } = useContext(UserContext);
  const { dispatch } = useFormData();
  const navigate = useNavigate();
  const userEmail = user?.email;
  const [games, setGameList] = useState([]);
  const [gameNames, setGameNames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedGames, setSuggestedGames] = useState([]);


  // getting all game names
  useEffect(() => {
    Axios.get('http://localhost:3001/games').then((response) => {
      setGameList(response.data);
    });
  }, []);

  useEffect(() => {
    const names = games.map(game => game.title);
    setGameNames(names)
  }, [games]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    // Filter game names based on the input value
    const filteredGames = gameNames.filter((name) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    filteredGames.sort((a, b) => {
      // Find the index of the search query in each game name
      const indexA = a.toLowerCase().indexOf(value.toLowerCase());
      const indexB = b.toLowerCase().indexOf(value.toLowerCase());
  
      // Sort based on the index, with smaller indexes (stronger match) first
      return indexA - indexB;
    });

    const limitedGames = filteredGames.slice(0,3);
    setSuggestedGames(limitedGames);
  };



  // Handle search when search icon is clicked
  const handleSearch = (searchQuery) => {
    const path = `/GamePage/${searchQuery}`;
    navigate(path);
  };


  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      //handleSearch(event.target.value.toLowerCase());
    }
  };

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    setUser(null);
  };


  return (
    <div className="div">
      <div className="div-2">
        <div className="div-3">
          <div className="div-4">
            <Link to="/">
              <img
                class="group-6-T94"
                src={logo}
                alt={logo}
                id="I141:2772;1:110"
              />
            </Link>
          </div>
          <div className="div-8">
            <div className="div-9">
              <div className="div-10">
                <div className="div-11">
                  <input
                    className="div-12"
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={(e) => (e.target.value = "")} // Delete current text when input field is selected
                    onKeyDown={(e) => handleEnterPress(e)}
                  />
                  
                </div>
                {/* Conditionally render suggested games */}
                {suggestedGames.length > 0 && (
                  <div className="suggested-games">
                    <ul>
                      {suggestedGames.map((game, index) => (
                        <li key={index}>
                          <Link to={`/GamePage/${game}`}>{game}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="div-13">
                <div className="div-14" />
                <div className="div-15">
                  <input
                    className="div-16"
                    type="text"
                    placeholder="Search genres..."
                    onFocus={(e) => (e.target.value = "")} // Delete current text when input field is selected
                    onKeyDown={(e) => handleEnterPress(e)}
                  />
                </div>
              </div>
            </div>
            <button onClick={() => {
              const gameSearchQuery = document.querySelector('.div-12').value;
              const genreSearchQuery = document.querySelector('.div-16').value;
              handleSearch(`${gameSearchQuery}`);
            }}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/49e2106b4d2d73e8db380f38875f6e70f095001df80651b242f1e82da27ee13b?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&"
                className="img-4"
              />
            </button>
          </div>
          <div className="div-24">
            {userEmail && (
              <Link to={`/UserProfile/${userEmail}`}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ef4d5567-e4d6-40e8-9039-f16f190f3684?"
                  className="img-5"
                />
              </Link>
            )}
            {userEmail && (
              <Link to={`/Favourites/` + user.email}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/97d36e33-6f9a-4165-916f-a11683446465?"
                  className="img-7"
                />
              </Link>
            )}
            <div className="div-25">
              {userEmail && (
                <Link to="/">
                  <div onClick={handleLogout}>Logout</div>
                </Link>
              )}
              {!userEmail && (
                <Link to="/Login">
                  <div>Login</div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Nav;