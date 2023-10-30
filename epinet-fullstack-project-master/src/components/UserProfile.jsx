import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import verified from "../assets/verified.png";
import styles from "../styles/userPage.module.css";

const UserProfile = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  const GET_USER = `http://localhost:3001/api/user/${id}`;

  const getUser = () => {
    axios
      .get(GET_USER)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.row}>
            <div>Name:</div>
            <div>{user.name}</div>
          </div>
          <hr/>
          <div className={styles.row}>
            <div>Email:</div>
            <div>{user.email}</div>
          </div>
          <hr/>
          <div className={styles.row}>
            <div>Mobile:</div>
            <div>{user.mobile}</div>
          </div>
          <hr/>
          <div className={styles.row}>
            <div>CPF No.:</div>
            <div>{user.cpf}</div>
          </div>
          <hr/>
          <div className={styles.row}>
            <div>Designation:</div>
            <div>{user.designation}</div>
          </div>
          <hr/>
          <div className={styles.row}>
            <div>Department:</div>
            <div>{user.department}</div>
          </div>
        </div>

        <div className={styles.right}>
          <div>Site Data Manager : <span>Approved ✅</span></div>
          <div>Regional Data Manager : <span>Approved ✅</span></div>
          <div>Head Epinet : <span>Approved ✅</span></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
