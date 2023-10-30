import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import styles from '../styles/register.module.css'
import { useEffect } from "react";

const Login = () => {
  const [type, setType] = React.useState("user");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const {state} = useLocation();

  useEffect(()=>{
    if(state){
        setType(state.prop1);
        console.log(state.prop1)
    }
  })

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleType = (event) => {
    setType(event.target.value);
  };

  const LOGIN_URL = "http://localhost:3001/api/login";

  const onSubmit = (data) => {

    const updatedData = {...data, type:type}
    console.log(updatedData);
    setError("")

    axios
      .post(LOGIN_URL, updatedData)
      .then((response) => {
        // setUser(response.data);
        console.log("posted", response.data)
        setError(response.data.message)
        if(response.data.message==='site'){
            localStorage.setItem('type', 'site');
            navigate("/site-manager")
        }
        else if(response.data.message==='user'){
            navigate(`/user-profile/${response.data.id}`)
        }
        else if(response.data.message==='regional'){
            navigate("/regional-manager")
        }
        else if(response.data.message==='head'){
            navigate("/head-epinet")
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Login</h2>

      <div style={{ margin: "2rem" }}>
        <FormControl style={{ width: "300px" }}>
          <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Select Type"
            onChange={handleType}
          >
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"site"}>Site Data Manger</MenuItem>
            <MenuItem value={"regional"}>Regional Data Manger</MenuItem>
            <MenuItem value={"head"}>Head Epinet</MenuItem>
          </Select>
        </FormControl>
      </div>

      <form className={styles.login_form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input {...register("email")} />
          {errors.email && <span>*{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" {...register("password")} />
          {errors.password && <span>*{errors.password.message}</span>}
        </div>
        <button className={styles.button} type="submit">Login</button>
        <h4 style={{color:"rgb(165, 79, 79)"}}>{error}</h4>
      </form>
    </div>
  );
};

export default Login;
