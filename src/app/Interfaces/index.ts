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
  birthDate: string;
  age: number;
  gender: string;
  bio: string;
  picture: string;
  createdAt: object;
}

export interface AuthSuccess {
  message: string;
  rest: User;
  type: "success";
}

export interface AuthError {
  message: string;
  name: string;
  type: "error";
}

export interface AuthContextValue {
  user: User | null;
  signupUser: (data: SignupUser) => Promise<AuthSuccess | AuthError>;
  loginUser: (email: LoginUser) => Promise<AuthSuccess | AuthError>;
}

export interface UsersContextValue {
  users: User[] | [];
  like: (from: number, to: number, liked: boolean) => void;
}
