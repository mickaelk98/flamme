import { AuthContextValue } from "../Interfaces";
import { createContext } from "react";
import {
  AuthSuccess,
  AuthError,
  SignupUser,
  LoginUser,
} from "@/app/Interfaces";

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  signupUser: async ({}: SignupUser) => {
    return Promise.resolve({} as AuthSuccess | AuthError);
  },
  loginUser: async ({}: LoginUser) => {
    return Promise.resolve({} as AuthSuccess | AuthError);
  },
});
