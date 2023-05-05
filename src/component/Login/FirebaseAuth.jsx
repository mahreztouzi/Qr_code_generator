import { initializeApp } from "firebase/app";
import { React, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWyiJIxv6jZrQ40mjRhDBOk0f_0H_R4V8",
  authDomain: "massi-21276.firebaseapp.com",
  projectId: "massi-21276",
  storageBucket: "massi-21276.appspot.com",
  messagingSenderId: "40405626305",
  appId: "1:40405626305:web:c85ad68620f76fb9e55340",
};

// Initialize Firebase
// firestore = db
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const dbp = getFirestore(app);
export default dbp;

export {
  setDoc,
  getDoc,
  updateDoc,
  getDownloadURL,
  onAuthStateChanged,
  addDoc,
  getDocs,
  deleteDoc,
};

//Inscription
export const signupUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

//connexion
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

//deconnexion
export const logoutUser = () => {
  return signOut(auth);
};

export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const ref = doc(db, "Users", authUser.uid);
      const docSnap = await getDoc(ref);
      setUser(docSnap.data());
      setLoading(false);
    }

    if (!authLoading) {
      if (authUser) fetchData();
      else setLoading(false);
    }
  }, [authLoading]);
  return { user, isLoading, error };
}

export function CurrentUser() {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user.uid);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  return currentUser;
}
