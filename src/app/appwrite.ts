import { Client, Account } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECTID}`);

export const account = new Account(client);
export { ID } from "appwrite";
