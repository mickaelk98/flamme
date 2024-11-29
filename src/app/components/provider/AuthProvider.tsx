"use client";

import { useState, useEffect } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { LoginUser, User, SignupUser } from "@/app/Interfaces";
import cookies from "js-cookie";
import { signup, login } from "@/actions/auth";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = cookies.get("token");

    if (token) {
      const getCurrentUser = async () => {
        const response = await fetch("http://localhost:3000/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const currentUser = await response.json();
        setUser(currentUser);
      };
      getCurrentUser();
    } else {
      setUser(null);
    }
  }, []);

  const signupUser = async (data: SignupUser) => {
    const result = await signup(data);

    if (result.type === "success") {
      setUser(result.rest);
    }

    return result;
  };

  const loginUser = async (data: LoginUser) => {
    const result = await login(data);

    if (result.type === "success") {
      setUser(result.rest);
    }
    return result;
  };

  return (
    <AuthContext.Provider value={{ user, signupUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
