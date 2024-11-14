import { SignupUser, User } from "@/app/Interfaces";

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

export async function login(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const user = await response.json();

    if (response.status !== 200) {
      throw user;
    }

    return user as User;
  } catch (e) {
    throw e;
  }
}
export async function logout(): Promise<null> {
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
    console.log(e);
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const response = await fetch("http://localhost:3000/api/auth");
    const user = await response.json();
    return user;
  } catch (e) {
    throw e;
  }
}
