import React from 'react';
import banner from "../Images/banner.jpg";

function HomePage(){
    return(
        <div className="banner">
            <img class="banner-img" src={banner} alt={banner} id="I141:2772;1:110" />
            <div className="banner-container">
                <div className="banner-title">Welcome to Biblicade</div>
                <div className="banner-subtitle">Discover the next game you can't get enough of</div>
            </div>
        </div>

    );
}
export default HomePage;