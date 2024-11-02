import { account, ID } from "@/app/appwrite";
import { SignupUser } from "@/app/Interfaces";

export async function signup(data: SignupUser) {
  try {
    const { email, name, password, dateOfBirth, picture, gender, bio } = data;
    // Crée l'utilisateur avec email et mot de passe
    let user = await account.create(ID.unique(), email, password, name);
    const formData = new FormData();
    formData.append("userId", user.$id);
    formData.append("dateOfBirth", dateOfBirth.toLocaleDateString("fr-FR"));
    formData.append("gender", gender);
    formData.append("bio", bio);

    // Vérifie si une image a été fournie
    if (picture) {
      formData.append("picture", picture);
    }

    // Appelle l'API pour upload l'image
    const response = await fetch("http://localhost:3000/api/uploadimage", {
      method: "POST",
      body: formData,
    });

    user = await response.json();

    if (response.status !== 200) {
      throw user;
    }

    return user;
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
