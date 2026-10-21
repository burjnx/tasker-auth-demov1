/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import { load, save } from "./storage";

// Demo authentication: there is no backend, so any email and password
// signs in. The signed-in user is kept in localStorage.
const USER_KEY = "tasker.user";
const PENDING_KEY = "tasker.pendingSignup";

const AuthContext = createContext(null);

function nameFromEmail(email) {
  const part = email.split("@")[0].split(/[._-]/)[0] || "there";
  return part.charAt(0).toUpperCase() + part.slice(1);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => load(USER_KEY, null));
  const [pending, setPending] = useState(() => load(PENDING_KEY, null));

  const persistUser = (next) => {
    setUser(next);
    save(USER_KEY, next);
  };

  // Sign in with an email. Reuses the saved profile if it is the same account.
  const login = (email) => {
    const saved = load("tasker.profile", null);
    const profile =
      saved && saved.email.toLowerCase() === email.toLowerCase()
        ? saved
        : { firstName: nameFromEmail(email), lastName: "", email };
    persistUser(profile);
  };

  // Sign-up keeps the details until the OTP step is complete.
  const startSignup = (details) => {
    setPending(details);
    save(PENDING_KEY, details);
  };

  const completeSignup = () => {
    if (!pending) return false;
    save("tasker.profile", pending);
    persistUser(pending);
    setPending(null);
    save(PENDING_KEY, null);
    return true;
  };

  const updateProfile = (changes) => {
    const next = { ...user, ...changes };
    save("tasker.profile", next);
    persistUser(next);
  };

  const logout = () => persistUser(null);

  return (
    <AuthContext.Provider
      value={{ user, pending, login, startSignup, completeSignup, updateProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
