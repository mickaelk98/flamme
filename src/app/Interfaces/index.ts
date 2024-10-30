import { Dispatch, SetStateAction } from "react";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  gender: Gender;
  dateOfBirth: Date;
}

export interface SignupFormTwoData {
  profilePicture?: File;
  bio: string;
}
