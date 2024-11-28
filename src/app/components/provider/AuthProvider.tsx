import { useState } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { User } from "../../Interfaces";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
