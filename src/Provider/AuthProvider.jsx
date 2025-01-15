import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // setLoading(false);
      console.log("State captured", currentUser?.email);
      if (currentUser?.email) {
        const user = { email: currentUser?.email };
        axios
          .post("https://searching-server.vercel.app/jwt", user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("login", res.data);
            setLoading(false);
          });
      } else {
        axios
          .post(
            "https://searching-server.vercel.app/logout",
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("logout", res.data);
            setLoading(false);
          });
      }
      return () => {
        unsubscribe();
      };
    });
  }, []);

  const newCreateUser = (displayName, email, photoURL, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: displayName,
          photoURL: photoURL,
        }).then(() => {
          return userCredential;
        });
      })
      .catch((error) => {
        console.error("Error creating user: ", error);
        throw error;
      });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setUser(null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
        setLoading(false);
        throw error;
      });
  };

  const userSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const authInfo = {
    newCreateUser,
    user,
    setUser,
    loading,
    setLoading,
    userSignIn,
    signInWithGoogle,
    logOut,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>
        {!loading && children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
