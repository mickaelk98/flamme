export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  gender: Gender;
  dateOfBirth: Date;
}
