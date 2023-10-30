import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles/home.module.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h2>EPINET Site</h2>
      <div className={styles.home}>
        <div onClick={() => navigate("/login")}><span>Sign In</span></div>
        <div onClick={() => navigate("/register")}><span>Create User Account</span></div>
        <div onClick={() => navigate("/login", { state: { prop1: "site" } })}><span>
          Sign In as Site Data Manager</span>
        </div>
        <div
          onClick={() => navigate("/login", { state: { prop1: "regional" } })}
        ><span>
          Sign In as Regional Data Manager</span>
        </div>
        <div onClick={() => navigate("/login", { state: { prop1: "head" } })}><span>
          Sign In as Head EPINET</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
