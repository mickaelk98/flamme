import { NextResponse } from "next/server";
import { account } from "@/app/api/";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    // Attendre la résolution de `cookies()`
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("X-Appwrite-Session");

    if (!sessionCookie || !sessionCookie.value) {
      // Si pas de session, créez une nouvelle session
      const session = await account.createEmailPasswordSession(email, password);

      // Stocker la session dans un cookie
      cookieStore.set("X-Appwrite-Session", session.$id, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      });
    }

    // Récupérer les informations de l'utilisateur
    const user = await account.get();

    // Retourner la réponse avec les infos de l'utilisateur
    return NextResponse.json(
      { message: "Connexion ok", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la connexion", error },
      { status: 401 }
    );
  }
}
