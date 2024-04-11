import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../Context/usercontext";
import Games from '../Components/Games';
import Axios from 'axios';
import "./HomePage.css"
import RecommendAlgorithm from "../Components/RecommendAlgorithm";


function HomePage(){
    const [games, setGames] = useState([]);
    const { user } = useContext(UserContext);
    const userEmail = user?.email;
    const [starterPage, setStarterPage] = useState(true);
    
    // Function to get all games
    const getGames = () => {
        Axios.get('http://localhost:3001/games').then((response) => {
            setGames(response.data);
            console.log("working");
        });
    }

    // Call getGames when the component mounts
    useEffect(() => {
        getGames();
    }, []);

    const handleStarting = () => {
        setStarterPage(false);
    }

    return(
        <div className="mainPane">
            {(userEmail && starterPage) ? ( 
            <div>
                <div className="imgContainer"> 
                    <img loading="lazy" 
                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&"
                            className="img"
                            alt="banner" />
                </div>
                <div className="mainTitle">
                    <h1>Welcome to Biblicade!</h1>
                    <p>Discover your next favourite game here.</p>
                    <p className="preferenceButton" onClick={handleStarting}>Get Started</p>
                    
                </div>
            </div>) : ( <></>)
            }

            <div className="componentsMain">
                {(userEmail) ? (
                    <div>
                        <RecommendAlgorithm user={user} start={starterPage}/>
                    </div>
                ):(
                    <>
                        <div className="imgContainer"> 
                            <img loading="lazy" 
                                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&"
                                    className="img"
                                    alt="banner" />
                        </div>
                        <div className="mainTitle">
                            <h1>Welcome to Biblicade!</h1>
                            <p>Discover your next favourite game here.</p>
                        </div>
                        <div>
                            <h1 className="gamesCatalogueTitle">Game Catalogue</h1>
                            <Games games={games} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default HomePage;
