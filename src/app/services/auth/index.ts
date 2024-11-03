import { SignupUser } from "@/app/Interfaces";

export async function signup(data: SignupUser) {
  try {
    const { email, name, password, dateOfBirth, picture, gender, bio } = data;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("dateOfBirth", dateOfBirth.toLocaleDateString("fr-FR"));
    formData.append("gender", gender);
    formData.append("bio", bio);

    // Vérifie si une image a été fournie
    if (picture) {
      formData.append("picture", picture);
    }

    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: formData,
    });

    const user = await response.json();

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
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const user = await response.json();

    if (response.status !== 200) {
      throw user;
    }
    console.log("user depuis login client", user);

    return user;
  } catch (e) {
    throw e;
  }
}

export async function logout() {
  try {
    const response = await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
    });

    const user = await response.json();

    if (response.status !== 200) {
      throw user;
    }
    return null;
  } catch (e) {
    throw e;
  }
}
