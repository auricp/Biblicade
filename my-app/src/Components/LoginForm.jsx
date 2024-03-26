import React,{useState,useContext} from 'react';
import "./LoginForm.css";
import {Link,useNavigate} from "react-router-dom";
import userList from '../Components/userList';
import {UserContext} from "../Context/usercontext";
function LoginForm(){
    const {setUser}= useContext(UserContext);
    const navigate = useNavigate();
    const[error,setError] =useState('');
    const[formData,setFormData] = useState({
        email: '',
        password: '',
    });
    const handleTextInput = (e)=>{
        setError('');
        const {name,value} =e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!formData.email || !formData.password){
            setError('All fields must be filled');
        }
        else{
            const user = userList.find((u)=> u.email === formData.email && u.password=== formData.password);
            if(user){
                setUser(user);
                setError('');
                navigate('/');
            }
            else{
                setError('Email or username is incorrect');
            }
        }
    }
    return(
<div class="property-1default-foG" id="161:5197">
<p class="login-grn" id="161:5145">Login</p>
<div class="frame-49-jq4" id="161:5196">
<div class="frame-49-eSE" id="161:5184">
    <div class="search-bar-Zp6">
<p class="email-address-MNa" id="163:5561">Email Address</p>
<input class="email-input" name="email" placeholder="xxx@email.com" value={formData.email} onChange={handleTextInput}></input>
</div>
<div class="search-bar-Zp6">
<p class="email-address-MNa" id="161:5182">Password</p>
<input class="email-input"type="password"  id="30:2332"  name="password" placeholder="xxxxxxxx...." value={formData.password} onChange={handleTextInput}></input>
</div>

</div>
<p class="dont-have-an-account-sign-up-here-A74" id="161:5195">
<span class="dont-have-an-account-sign-up-here-A74-sub-0">Don’t have an account? &#160;</span>
<Link to="../Register">
<span class="dont-have-an-account-sign-up-here-A74-sub-1">Sign up here.</span>
</Link>
</p>
</div>
<button type="submit" class="submit-huc" id="30:2335" onClick={handleSubmit}>Login</button>

<span class="error-login">{error}</span>
</div>

    );
}
export default LoginForm;