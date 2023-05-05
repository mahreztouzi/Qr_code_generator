import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./LoginModal.css";
import "firebase/compat/auth";
import log from "../../Assets/log.svg";
import desk from "../../Assets/register.svg";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { handleSignOut } from "./LoginManager";
import { SET_USER, useAppContext } from "../../context";

const Form = () => {
  const { dispatch } = useAppContext();
  const [isSignUp, setSignUp] = useState(false);

  const history = useNavigate();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleResponse = (res) => {
    dispatch({ type: SET_USER, payload: res });
    if (!res.error) {
      toast.success("Successfully Logged In!");
      history(from);
    }
    if (res.email === "admin@mail.com") {
      swal({
        title: "Warning!",
        text: "You have entered the admin panel for testing. Please don't abuse this facility!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((ok) => {
        if (!ok) {
          handleSignOut().then((res) => {
            dispatch({ type: SET_USER, payload: res });
            toast.error("Logged Out!");
          });
        }
      });
    }
  };

  return (
    <div className={`${isSignUp ? "fContainer sign-up-mode" : "fContainer"}`}>
      <Link to="/">
        <span className="pageCloseBtn">
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </Link>
      <div className="forms-container">
        <div className="signIn-singUp">
          <SignInForm handleResponse={handleResponse} />
          <SignUpForm handleResponse={handleResponse} />
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Inscription rapide et facile</h3>
            <p>
              Remplissez notre formulaire pour obtenir votre code QR sécurisé et
              faciliter les contrôles de sécurité dans l'entreprise.
              Inscrivez-vous dès maintenant pour bénéficier de tous les
              avantages de notre système de vérification d'identité !
            </p>
            <button
              className="iBtn transparent"
              onClick={() => setSignUp(true)}
            >
              Inscription
            </button>
          </div>
          <img src={`${log}`} alt="" className="pImg" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>Connectez-vous pour accéder à votre profil !</h3>
            <p>
              Connectez-vous rapidement et facilement à votre compte pour
              accéder à toutes vos informations professionnelles !
            </p>
            <button
              className="iBtn transparent"
              onClick={() => setSignUp(false)}
            >
              Connexion
            </button>
          </div>
          <img src={`${desk}`} alt="" className="pImg" />
        </div>
      </div>
    </div>
  );
};

export default Form;
