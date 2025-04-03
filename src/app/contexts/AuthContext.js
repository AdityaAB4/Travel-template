"use client";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    if (token) setUser({ token, isAdmin });
  }, []);

  const login = (token, isAdmin) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isAdmin", isAdmin);
    setUser({ token, isAdmin });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
