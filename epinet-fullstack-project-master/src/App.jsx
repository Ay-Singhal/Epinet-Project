import { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import HeadEpinet from "./components/HeadEpinet";
import Home from "./components/Home.jsx";
import Login from "./components/Login";
import RegionalManager from "./components/RegionalManager";
import Register from "./components/Register";
import SiteManager from "./components/SiteManager";
import UserProfile from "./components/UserProfile";
import styles from "./styles/home.module.css";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.nav}>
        <div onClick={() => navigate("/")}>Home</div>
        <div onClick={() => navigate("/login")}>Sign In</div>
        <div onClick={() => navigate("/register")}>Register</div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-profile/:id" element={<UserProfile />} />
        <Route path="/site-manager" element={<SiteManager />} />
        <Route path="/regional-manager" element={<RegionalManager />} />
        <Route path="/head-epinet" element={<HeadEpinet />} />
      </Routes>
    </>
  );
}

export default App;
