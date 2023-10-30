import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../styles/register.module.css";
import axios from "axios";

const options = [
    'Data Viewer',
    'GTO Viewer',
    'Documents Download',
    'DTM',
    'Data Loader',
    'GTO Creator',
  ];

const Register = () => {
  const [error, setError] = useState("");

  //Name, designation, email, mobile, cpf, department, password

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    designation: yup.string().required("Designation is required"),
    mobile: yup.string().matches(/^[6-9]\d{9}$/, {message: "Please enter valid number.", excludeEmptyString: false}),
    cpf: yup.string().required("CPF No is required"),
    department: yup.string().required("Department No is required"),
    location: yup.string().required("Location No is required"),
    purpose: yup.string().required("Purpose is required"),
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
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      type: "user",
      hasSiteApproved: false,
      hasRegionalApproved: false,
      hasHeadApproved: false,
      cpf: "",
      designation: "",
      department: "",
      mobile: "",
      options: [],
    },
  });

  const POST_URL = "http://localhost:3001/api/create";

  const onSubmit = (data) => {
    setError("");
    const updatedData = { ...data, type: "user" };
    console.log(updatedData);

    axios
      .post(POST_URL, updatedData)
      .then((response) => {
        // setUser(response.data);
        console.log("posted", response.data);
        setError(response.data.message);
        if(response.data.success===true){
            console.log('success');
            reset();
        }else{
            console.log('failed')
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.register}>
      <h2>Create User Account</h2>
      {/* ------------ form------------- */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.row}>
          <div>
            <label htmlFor="name">Name:</label>
            <input {...register("name")} />
            {errors.name && <span>*{errors.name.message}</span>}
          </div>
          <div>
            <label htmlFor="designation">Designation:</label>
            <input {...register("designation")} />
            {errors.designation && <span>*{errors.designation.message}</span>}
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <label htmlFor="email">Email:</label>
            <input {...register("email")} />
            {errors.email && <span>*{errors.email.message}</span>}
          </div>
          <div>
            <label htmlFor="mobile">Mobile Number:</label>
            <input {...register("mobile")} />
            {errors.mobile && <span>*{errors.mobile.message}</span>}
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <label htmlFor="cpf">CPF No:</label>
            <input {...register("cpf")} />
            {errors.cpf && <span>*{errors.cpf.message}</span>}
          </div>
          <div>
            <label htmlFor="department">Department:</label>
            <input {...register("department")} />
            {errors.department && <span>*{errors.department.message}</span>}
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <label htmlFor="location">Location:</label>
            <input {...register("location")} />
            {errors.location && <span>*{errors.location.message}</span>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" {...register("password")} />
            {errors.password && <span>*{errors.password.message}</span>}
          </div>
        </div>

        <div className={styles.textarea}>
            <label htmlFor="purpose">Purpose:</label>
            <textarea {...register("textarea")} />
            {errors.textarea && <span>*{errors.textarea.message}</span>}
          </div>

        <div className={styles.row}>
            <div style={{marginTop:"1rem", fontWeight:"600"}}>Access:</div>
            <div></div>
        </div>

        <div className={styles.options}>
          {options.map((option) => (
          <div key={option}>
            <input
              type="checkbox"
              value={option}
              {...register('options')}
            />
            <label>{option}</label>
          </div>
        ))}
          </div>

        <button className={styles.button} type="submit">
          Submit
        </button>
        <h4>{error}</h4>
      </form>
    </div>
  );
};

export default Register;
