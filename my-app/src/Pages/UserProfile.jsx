import React,{useState,useContext} from 'react';
import "./UserProfile.css";
import Axios from 'axios'
import {Link,useNavigate} from "react-router-dom";
import {UserContext} from "../Context/usercontext";
import { useParams } from 'react-router-dom';

function UserProfile(){
    const { user } = useContext(UserContext);
    let userType = user?.userType;
    const { email } = useParams();

    return(
        <div>

            
        </div>
    );
}
export default UserProfile;