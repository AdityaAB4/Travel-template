// contexts/UserContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

const UserContext = createContext({
  role: "user",
  setUserRole: () => {},
});

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState("user");

  const setUserRole = (newRole) => {
    setRole(newRole);
  };

  return (
    <UserContext.Provider value={{ role, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
