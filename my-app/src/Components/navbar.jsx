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
                <div className="div-11">Game Title</div>
                <div className="div-12">Search games</div>
              </div>
              <div className="div-13">
                <div className="div-14" />
                <div className="div-15">
                  <div className="div-16">Genre</div>
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
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c1d4bb4-e80e-4e78-8391-79dc5e262a64?"
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
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/248ce8f4-51d8-4320-a68c-8957a496b0bd?"
              className="img-6"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/97d36e33-6f9a-4165-916f-a11683446465?"
              className="img-7"
            />
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