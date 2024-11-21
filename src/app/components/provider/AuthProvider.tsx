"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { User, SignupUser } from "../../Interfaces";
import { getCurrentUser, login, logout, signup } from "../../services";

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

  const signupUser = async (data: SignupUser) => {
    const { email, password } = data;
    const user = await signup(data);
    if (user) {
      await loginUser(email, password);
      setUser(user);
    }
  };

  const loginUser = async (email: string, password: string) => {
    const user = await login(email, password);
    setUser(user);
  };

  const logoutUser = async () => {
    const user = await logout();
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, signupUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
