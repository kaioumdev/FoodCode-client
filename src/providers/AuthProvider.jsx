import React, { createContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';
// import { GoogleAuthProvider } from 'firebase/auth/web-extension';

export const AuthContext = createContext(null)
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(null)

    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
      setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photo
    })
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser){
        setUser(currentUser)
        setLoading(false)
      }
    })

    return () => {
      return unsubscribe;
    }
  },[])

    const authInfo = {user, loading, createUser, signIn, logOut, updateUserProfile, signInWithGoogle}
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider