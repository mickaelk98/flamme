import { NextResponse } from "next/server";
import { users } from "@/app/api";

export async function GET() {
  try {
    const response = await users.list();

    // Retirer le mot de passe pour chaque utilisateur
    const sanitizedUsers = response.users.map((user) => {
      delete user.password;
      return user;
    });

    return NextResponse.json({ users: sanitizedUsers }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return NextResponse.json(
      {
        message: "Erreur lors de la récupération des informations utilisateur",
        error,
      },
      { status: 500 }
    );
  }
}
