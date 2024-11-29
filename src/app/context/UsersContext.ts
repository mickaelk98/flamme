import { createContext } from "react";
import { UsersContextValue } from "@/app/Interfaces";

export const UsersContext = createContext<UsersContextValue>({
  users: [],
  like: () => {},
});
