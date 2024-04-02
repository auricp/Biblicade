import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Context/usercontext";
import { PageProvider, PageContext } from "./Context/pagecontext";
import Nav from "./Components/navbar";
import LoginRegisterNav from "./Components/LoginRegisterNavbar";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserProfile from "./Pages/UserProfile";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FormDataProvider } from "./Context/formdatacontext";

function App() {
  const [isPopOpen, setPopOpen] = useState(false);

  const openPop = () => {
    setPopOpen(true);
  };
  const closePop = () => {
    setPopOpen(false);
  };
  return (
    <FormDataProvider>
      <PageProvider>
        <UserProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Content openPopup={openPop} />} />
              <Route path="/Login" element={<Content openPopup={openPop} />} />
              <Route
                path="/Register"
                element={<Content openPopup={openPop} />}
              />
              <Route
                path={"/UserProfile/:email"}
                element={<Content openPopup={openPop} />}
              />
            </Routes>
          </Router>
        </UserProvider>
      </PageProvider>
    </FormDataProvider>
  );
}
function Content({ openPopup }) {
  const { LoginRegisterPage, setLoginRegister } = useContext(PageContext);
  const { email } = useParams();
  const location = useLocation();
  useEffect(() => {
    handleSwitch();
  }, [location.pathname, setLoginRegister]);
  const handleSwitch = () => {
    if (location.pathname === "/Login" || location.pathname === "/Register") {
      setLoginRegister(true);
    } else {
      setLoginRegister(false);
    }
    if (location.pathname === `/UserProfile/${email}`) {
      setLoginRegister("UserProfilePage", true);
    } else {
      setLoginRegister("UserProfilePage", false);
    }
  };
  return (
    <>
      {LoginRegisterPage ? <LoginRegisterNav /> : <Nav />}
      {location.pathname === "/" && <HomePage openPopup={openPopup} />}
      {location.pathname === "/Login" && <Login />}
      {location.pathname === "/Register" && <Register />}
      {location.pathname === `/UserProfile/${email}` && (
        <UserProfile openPopup={openPopup} />
      )}
    </>
  );
}

export default App;