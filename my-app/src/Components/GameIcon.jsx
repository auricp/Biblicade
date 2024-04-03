import React, { useState, useEffect,useContext} from "react";
import "./GameIcon.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { PageContext } from "../Context/pagecontext";
import userList from "./userList";
import {UserContext} from '../Context/usercontext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormData } from '../Context/formdatacontext';
import {Link,useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";

function GameIcon({ openPopup,game }) {
  const navigate = useNavigate();
  const {formData,dispatch} = useFormData();
  const { pageStates} = useContext(PageContext);
  const [users,setUsers]= useState(userList);
  const {user}= useContext(UserContext);
  const [image, setImage] = useState(null);
  const [isHovered,setHovered] = useState(false);
  const gameId = game.id;
  const isgameInFavourites = ()=>{
    const uL = userList.find((u)=>u.email ===user?.email);
    return uL && uL.favourites && uL.favourites.includes(gameId);
  }
  
  const handleLike = (event,gameId) =>{
    event.preventDefault();
    event.stopPropagation();
  
    if(isgameInFavourites()){
      setUsers((prev)=>{
        return prev.map((u)=>{
          if(u.email === user?.email&&u.favourites){
            u.favourites=u.favourites.filter((id)=>id!==gameId);
          }
          return u;
        })
      })


    }
    else{
      setUsers((prev)=>{
        return prev.map((u)=>{
          if(u.email === user?.email){
            if(!u.favourites){
              u.favourites =[gameId];
            }
            else if(!u.favourites.includes(gameId)){
              u.favourites.push(gameId);
            }
          }
          return u;
        })
      })
    
      
    }
  
  
  }
  const saveData=(event)=>{
    event.preventDefault();
    event.stopPropagation();

    dispatch({type:'UPDATE_DATA',payload:{title:game?.title}});
    dispatch({type:'UPDATE_DATA',payload:{rating:game?.rating}});
    dispatch({type:'UPDATE_DATA',payload:{gameGenre:game?.gameGenre}});
    dispatch({type:'UPDATE_DATA',payload:{id:game?.id}});
    openPopup();
  
  }
  const deleteData= async(event)=>{
    event.preventDefault();
    toast.dismiss();
    toast.info(
      <div>
      <p> Are you sure you want to delete this game?</p>
      <button onClick={()=>handleDelete()}>Yes </button>
      <button onClick={()=>handleCancel()}>No </button>
    </div>,{
      position:'top-center',
      autoClose: false,
      hideProgressBar:true,
      closeOnClick:false,
      pauseOnHover:true,
      draggable: true,
      closeButton: false,
      className:'confirmation-toast',
    })
    
  }
  const handleDelete =async()=>{

    // await removegame(gameId,user.email);
    toast.dismiss();
    navigate('../');
  }
  const handleCancel = ()=>{
    toast.dismiss();
  }

  useEffect(() => {
    const importImages = async()=>{
      if(Array.isArray(game.images)&& game.images.length>0){
        const importedImages = await Promise.all(
          game.images.map((imagePath)=>import(`../Images/Games/${imagePath}`))
        )
        setImage(importedImages[0].default);
      }
      else if(game.image){
        const imageModule = await import(`../Images/Games/${game.image}`);
        setImage(imageModule.default);
      }
    };
    importImages();
    
  }, [game.image,game.images]);
  const cardStyle = {
    background: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <div class="game-card-P14" id="141:5987">
      <div class="frame-70-6gA" id="I141:5987;141:5709" style={cardStyle} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      {(isHovered&&pageStates.UserProfilePage) &&(
          <div class="icon-container">
          <EditIcon onClick={(event)=>saveData(event)} style={{fill:  'white',fontSize:'80px'} }/>
  <Link to='../' onClick={(event)=>deleteData(event)}>
          <DeleteIcon  style={{ fill:  'white',fontSize:'80px'} }/>
          </Link>
          </div>
        )}
        <div class="auto-group-z5tw-2Zp" id="N4EkpPYABDeLgunmSZZ5tW">
          {user && (
          <FavoriteIcon class="vector-Ugi" style={{ fill: isgameInFavourites()  ? 'red':'white'} } onClick={(event)=>handleLike(event,gameId)}/>
          )}
        </div>
      </div>
      <div class="frame-19-sir" id="I141:5987;141:5984">
        <p class="title" id="I141:5987;141:5712">
          {game.title}
        </p>
        <div class="genre">
          <p>
          <img style={{marginRight:'10px'}}
          loading="lazy"
          />
          {game.gameGenre}
          </p>
        </div>
        <p class="rating" id="I141:5987;141:5983">
          {game.rating||game.rating} sqft
        </p>
      </div>
    </div>
  );
}
export default gameCard;