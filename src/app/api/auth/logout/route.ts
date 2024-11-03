import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookiesStore = await cookies();
    cookiesStore.delete("token");
    return NextResponse.json(
      { message: "Deconnexion reussie" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la deconnexion de l'utilisateur :", error);
    return NextResponse.json(
      { message: "Erreur lors de la deconnexion de l'utilisateur", error },
      { status: 500 }
    );
  }
}
