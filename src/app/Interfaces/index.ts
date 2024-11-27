export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface SignupUser {
  name: string;
  email: string;
  password: string;
  gender: string;
  picture?: File | null;
  bio: string;
  birthDate: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  dataOfBirth: string;
  age: number;
  gender: string;
  bio: string;
  picture: string;
}
export interface AuthContextValue {
  user: User | null;
  signupUser: (data: SignupUser) => void;
  loginUser: (email: string, password: string) => void;
  logoutUser: () => void;
}

export interface UsersContextValue {
  users: User[];
  likeUser: (user: User, liked: boolean) => void;
}
