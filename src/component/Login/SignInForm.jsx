import React from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "./FirebaseAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SignInForm = ({ handleResponse }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = () => {
    loginUser(getValues("email"), getValues("password"))
      .then(async (userCredential) => {
        console.log(userCredential);
        console.log("connecté");
        navigate("/employee");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
      <h2 className="title">Connexion</h2>
      <div className="input-field">
        <span className="fIcon">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <input placeholder="Email" {...register("email", { required: true })} />
      </div>
      {errors.email && <span className="text-warning">Champ obligatoire</span>}
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
      <input className="iBtn" type="submit" value="Connexion" />
    </form>
  );
};

export default SignInForm;
