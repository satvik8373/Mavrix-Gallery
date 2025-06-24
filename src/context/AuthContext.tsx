"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { 
  onAuthStateChanged, 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, pass: string) => Promise<any>;
  login: (email: string, pass: string) => Promise<any>;
  logout: () => Promise<any>;
  loginWithGoogle: () => Promise<any>;
}

const firebaseNotConfiguredError = "Firebase is not configured. Please add your credentials to the .env file as described in README.md";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      console.warn(firebaseNotConfiguredError);
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = (email: string, pass: string) => {
    if (!auth) return Promise.reject(new Error(firebaseNotConfiguredError));
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const login = (email: string, pass: string) => {
    if (!auth) return Promise.reject(new Error(firebaseNotConfiguredError));
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const logout = () => {
    if (!auth) return Promise.reject(new Error(firebaseNotConfiguredError));
    return signOut(auth);
  };

  const loginWithGoogle = () => {
    if (!auth) return Promise.reject(new Error(firebaseNotConfiguredError));
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
