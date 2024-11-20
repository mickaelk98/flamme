import { createContext } from "react";
import { UsersContextValue } from "../Interfaces";

export const UsersContext = createContext<UsersContextValue>({
  users: [],
  likeUser: () => {},
});
