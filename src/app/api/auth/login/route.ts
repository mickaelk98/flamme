import { NextResponse } from "next/server";
import { users } from "@/app/api";
import { Query } from "appwrite";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const cookiesStore = await cookies();
    const { email, password } = await req.json();

    // Rechercher l'utilisateur par email
    const response = await users.list([Query.equal("email", email)]);
    const total = response.total;
    const user = response.users[0];

    // Vérifier si l'utilisateur existe
    if (total === 0) {
      return NextResponse.json(
        { message: "Identifiant ou mot de passe incorrect 1" },
        { status: 400 }
      );
    } else {
      // Récupérer le mot de passe de l'utilisateur
      const userPassword = user.password || "";

      // Comparer les mots de passe
      const validPassword = await bcrypt.compare(password, userPassword);

      if (!validPassword) {
        return NextResponse.json(
          { message: "Identifiant ou mot de passe incorrect 2" },
          { status: 400 }
        );
      } else {
        const token = jwt.sign(
          { userId: user.$id },
          process.env.APPWRITE_JWT || "",
          { expiresIn: 3600 * 24 * 7 }
        );

        delete user.password;

        cookiesStore.set("token", token);
        return NextResponse.json({ ...user }, { status: 200 });
      }
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return NextResponse.json(
      {
        message: "Erreur lors de la connexion",
        error,
      },
      { status: 500 }
    );
  }
}
