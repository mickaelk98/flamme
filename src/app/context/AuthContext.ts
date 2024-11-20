import { createContext } from "react";
import { AuthContextValue } from "../Interfaces";

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  signupUser: async () => {},
  loginUser: async () => {},
  logoutUser: async () => {},
});
