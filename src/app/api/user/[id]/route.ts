import { NextRequest, NextResponse } from "next/server";
import { users } from "@/app/api";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await users.get(userId);

    // Suppression du mot de passe
    delete user.password;

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return NextResponse.json(
      {
        message:
          "Erreur lors de la récupération des informations de l'utilisateur",
        error,
      },
      { status: 500 }
    );
  }
}
