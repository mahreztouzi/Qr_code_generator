import React from "react";
import { useForm } from "react-hook-form";
import dbp, { signupUser } from "./FirebaseAuth";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  setDoc,
  orderBy,
  addDoc,
  Timestamp,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./FirebaseAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import {
  faEnvelope,
  faLock,
  faUser,
  faKey,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import { usersRef } from "./FirebaseAuth";
import { useState } from "react";
import Swal from "sweetalert2";
const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = () => {
    console.log(getValues());
    //inscription et enregistrement vers la Bdd
    console.log(getValues("email"));
    signupUser(getValues("email"), getValues("password"))
      .then(async (result) => {
        console.log(result);

        const infouser = {
          userId: result.user.uid,
          name: getValues("name"),
          email: getValues("email"),
          secretCode: getValues("secretCode"),
          immatricule: isChecked
            ? getValues("immatricule") || "valeur par défaut"
            : "pas de voiture",
          isConfirmed: false,
          createdAt: Timestamp.fromDate(new Date()),
          password: getValues("password"),
        };

        await setDoc(doc(db, "Users", infouser.userId), infouser)
          .then(() => {
            //redirection vers le profil ....
            console.log("bravo");
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
        alert("email-already-in-use");
      });

    //const handleSubmit = (e) => {
    //e.preventDefault();
  };
  function handleKeyPress(event) {
    const input = event.target;
    const value = input.value;
    const key = event.key;
    const isNumber = /^\d$/.test(key);

    if (isNumber && value.length >= 9) {
      event.preventDefault();
    }
  }
  // const onSubmit = async () => {
  //   const email = getValues("email");

  //   // Récupérez tous les documents de la collection "users"
  //   const q = query(collection(db, "Users"));

  //   // Utilisez get() pour récupérer tous les documents
  //   try {
  //     const querySnapshot = await getDocs(q);
  //     const users = querySnapshot.docs.map((doc) => doc.data());

  //     // Vérifiez si l'email existe dans la liste de tous les utilisateurs
  //     const emailExists = users.some((user) => user.email === email);

  //     if (emailExists) {
  //       console.log("Email déjà utilisé");
  //     } else {
  //       console.log("Email disponible");
  //       const infouser = {
  //         name: getValues("name"),
  //         email: email,
  //         secretCode: getValues("secretCode"),
  //         immatricule: isChecked
  //           ? getValues("immatricule") || "valeur par défaut"
  //           : "pas de voiture",
  //         createdAt: Timestamp.fromDate(new Date()),
  //         password: getValues("password"),
  //         isConfirmed: false,
  //       };

  //       addDoc(collection(db, "Users"), infouser).then(() => {
  //         console.log("Utilisateur ajouté à Firestore");
  //         // redirigez l'utilisateur vers une page de confirmation ou une autre page de votre choix
  //         Swal.fire({
  //           title: "Bravo!",
  //           text: "Parfait ! l'admin va confirmer votre compte au plus vite possible",
  //           icon: "success",
  //           confirmButtonText: "OK",
  //         }).then(() => {
  //           window.location.reload();
  //         });
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de la récupération des utilisateurs", error);
  //   }
  // };

  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange(event) {
    setIsChecked(event.target.checked);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
      <h2 className="title">Inscription</h2>
      <div className="input-field">
        <span className="fIcon">
          <FontAwesomeIcon icon={faUser} />
        </span>
        <input
          placeholder="Nom complet"
          {...register("name", { required: true })}
        />
      </div>
      <div className="input-field">
        <span className="fIcon">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <input
          placeholder="Email"
          type="email"
          {...register("email", { required: true })}
        />
      </div>

      <div className="input-field">
        <span className="fIcon">
          <FontAwesomeIcon icon={faKey} />
        </span>
        <input
          placeholder="Code secret "
          type="number"
          {...register("secretCode", { required: true })}
        />
      </div>
      <div
        className="check"
        style={{
          alignContent: "flex-start",
          width: "100%",
          maxWidth: "335px",
        }}
      >
        <input type="checkbox" onChange={handleCheckboxChange} />
        <span
          style={{
            color: "#aaa",
            fontWeight: "700",
            fontSize: "20px",
          }}
        >
          J'ai un véhicule
        </span>
      </div>

      <div className="input-field">
        <span className="fIcon">
          <FontAwesomeIcon icon={faCar} />
        </span>
        <input
          type="number"
          placeholder="Matricule de véhicule"
          onKeyPress={handleKeyPress}
          disabled={!isChecked}
          {...register("immatricule")}
        />
      </div>
      <div className="input-field">
        <span className="fIcon">
          <FontAwesomeIcon icon={faLock} />
        </span>
        <input
          type="password"
          placeholder="Mot de passe"
          {...register("password", { required: true })}
        />
      </div>
      <div className="input-field">
        <span className="fIcon">
          <FontAwesomeIcon icon={faLock} />
        </span>
        <input
          type="password"
          placeholder="Confirmez votre mot de passe"
          {...register("passwordConfirmation", {
            required: true,
            validate: (value) =>
              value === getValues("password") ||
              "Les mots de passe ne correspondent pas",
          })}
        />
      </div>
      {errors.passwordConfirmation && (
        <span className="text-warning">
          {errors.passwordConfirmation.message}
        </span>
      )}
      {/* <input className="iBtn" type="submit" value="Inscription" /> */}
      <button className="iBtn" type="submit">
        Inscription
      </button>

      {/* <p className="social-text">Or Sign up with social account</p>
            <SocialMedia handleResponse={handleResponse}/> */}
    </form>
  );
};

export default SignUpForm;
