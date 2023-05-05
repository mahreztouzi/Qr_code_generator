import Swal from "sweetalert2";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dashboard from "../Dashoboard/Dashboard/Dashboard.jsx";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import bgImage from "../../Assets/bg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
function SignIn({ onLogin }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = () => {
    if (
      getValues("email") === "admin@gmail.com" &&
      getValues("password") === "Admin"
    ) {
      Swal.fire({
        icon: "success",
        title: "saha zinou",
        text: "les hommes hbb",
      });
      onLogin();
      navigate("/dashboard");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "teezz ",
      });
    }
  };

  return (
    <div
      style={{
        widht: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bgImage}) `,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        overflow: "hidden",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sign-in-form"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "10% auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "50px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          width: "40%",
          background: "white",
        }}
      >
        <h2 className="title">Sign in</h2>
        <div className="input-field">
          <span className="fIcon">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <input
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>
        {errors.email && (
          <span className="text-warning">Champ obligatoire</span>
        )}
        <div className="input-field">
          <span className="fIcon">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </div>
        {errors.password && (
          <span className="text-warning">Champ obligatoire</span>
        )}
        <input className="iBtn" type="submit" value="sign In" />
      </form>
    </div>
  );
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true);
  };

  return (
    <>
      <SignIn onLogin={handleLogin} />
    </>
  );
};

export default Admin;
