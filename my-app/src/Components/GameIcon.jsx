import React, { useState, useEffect, useContext} from "react";
import "./GameIcon.css";
import { PageContext } from "../Context/pagecontext";
import userList from "./userList";
import {UserContext} from '../Context/usercontext';
import { useFormData } from '../Context/formdatacontext';
import {Link,useNavigate} from 'react-router-dom';

function GameIcon({ openPopup, game }) {
  const navigate = useNavigate();
  const {formData,dispatch} = useFormData();
  const { pageStates} = useContext(PageContext);
  const [users,setUsers]= useState(userList);
  const {user}= useContext(UserContext);
  const [image, setImage] = useState(null);
  const [isHovered,setHovered] = useState(false);
  const gameId = game.id;
  
  // useEffect(() => {
  //   const importImages = async()=>{
  //     if(Array.isArray(game.images)&& game.images.length>0){
  //       const importedImages = await Promise.all(
  //         game.images.map((imagePath)=>import(`../Images/Games/${imagePath}`))
  //       )
  //       setImage(importedImages[0].default);
  //     }
  //     else if(game.image){
  //       const imageModule = await import(`../Images/Games/${game.image}`);
  //       setImage(imageModule.default);
  //     }
  //   };
  //   importImages();
    
  // }, [game.image,game.images]);
  // const cardStyle = {
  //   background: `url(${image})`,
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  // };
  return (
    <div class="game-card-P14" id="141:5987">
    </div>
  );
}
export default GameIcon;