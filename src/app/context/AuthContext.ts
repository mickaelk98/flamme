import { AuthContextValue } from "../Interfaces";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextValue>({
  user: null,
});
