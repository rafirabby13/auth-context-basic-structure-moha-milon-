/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import auth from "../Firebase/Firebase.init.jsx";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, pass) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const userLogin = (email, pass) => {
    setLoading(true)

    return signInWithEmailAndPassword(auth, email, pass);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      
        console.log("current logged in user ", currentUser);
        setUser(currentUser);
        setLoading(false)
      
    });
   //component unmount
    return ()=>{
        unSubscribe()
    }
  }, []);

  const logOutUser =()=>{
    setLoading(true)

    return signOut(auth)
  }

  const authInfo = {
    user,
    loading,
    logOutUser,
    createUser,
    userLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
