import { account, ID } from "@/app/appwrite";

export async function signup(email: string, password: string, name: string) {
  try {
    const user = await account.create(ID.unique(), email, password, name);

    if (user) {
      console.log(user);
      return user;
    } else {
      return null;
    }
  } catch (e) {
    throw e;
  }
}

export async function login(email: string, password: string) {
  try {
    const user = await account.createEmailPasswordSession(email, password);
    await account.get();

    if (user) {
      console.log("user", user);
      console.log("session", await account.get());
      return user;
    } else {
      return null;
    }
  } catch (e) {
    throw e;
  }
}

export async function logout() {
  try {
    await account.deleteSessions();
    return null;
  } catch (e) {
    throw e;
  }
}
