import "./navbar.css";
import React, { useContext, useState } from "react";
import { UserContext } from "../Context/usercontext";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import { useFormData } from "../Context/formdatacontext";

function Nav() {
  const { user, setUser } = useContext(UserContext);
  const { dispatch } = useFormData();
  const userEmail = user?.email;

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    setUser(null);
  }

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
                  />
                </div>
              </div>
              <div className="div-13">
                <div className="div-14" />
                <div className="div-15">
                  <input
                    className="div-16"
                    type="text"
                    placeholder="Search genres..."
                  />
                </div>
              </div>
              <div className="div-17">
                <div className="div-18">
                </div>
                <div className="div-20" />
              </div>
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/49e2106b4d2d73e8db380f38875f6e70f095001df80651b242f1e82da27ee13b?apiKey=c7b8aa40bb064f6f8fcb00de2b00394b&"
              className="img-4"
            />
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