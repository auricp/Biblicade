import "./LoginRegisterNavbar.css";
import { Link } from "react-router-dom";
import React from "react";
import logo from "../Images/logo.png";
function LoginRegisterNav() {
  return (
    <nav>
      <div class="header" id="141:2721">
        <div class="banner" id="141:2772">
          <Link to="/">
            <img class="group-6" src={logo} alt={logo} id="I141:2772;1:110" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default LoginRegisterNav;
