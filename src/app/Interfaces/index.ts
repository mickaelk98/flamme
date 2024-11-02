export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface SignupUser {
  name: string;
  email: string;
  password: string;
  gender: Gender;
  dateOfBirth: Date;
  picture?: File;
  bio: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface User {
  $id: string;
  name: string;
  email: string;
  [prop: string]: unknown;
}
