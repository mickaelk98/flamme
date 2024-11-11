"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../Interfaces";
import { getCurrentUser } from "../services";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const initialUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Erreur lors de l'initialisation de l'auth:", error);
        setUser(null);
      }
    };

    initialUser();
  }, []);
  console.log("user dans le provider", user);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
