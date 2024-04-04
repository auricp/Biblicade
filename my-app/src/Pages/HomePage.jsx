import React, { useEffect, useState } from "react";
import Games from '../Components/Games';
import Axios from 'axios';
import "./HomePage.css"

function HomePage(){
    const [games, setGames] = useState([]);

    // function to get all games
    // response contains whatever we get from our backend
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

    return(
        <div>
            <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/8c7ea0e88fe35e88fb7c7c12adb729bff2689be276d999d9d4e43b5049a89489?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&"
            className="img"
            alt="banner"
            />
            <div className="banner-text">
                <div className="title">Welcome to Biblicade</div>
                <div className="subtitle-wrapper">
                    <div className="subtitle">
                        Discover your next favourite game
                    </div>
                </div>
            </div> 
            <div>
            <Games games={getGames()} />
            </div>
      </div>

    );
}
export default HomePage;