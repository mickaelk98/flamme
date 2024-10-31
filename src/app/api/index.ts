import { Client, Users } from "node-appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECTID || "")
  .setKey(process.env.APPWRITE_APIKEY || "");

export const users = new Users(client);
