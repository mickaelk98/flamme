import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { users } from "@/app/api";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.log("pas de token");
      return NextResponse.json(null, { status: 401 });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.APPWRITE_JWT || ""
    ) as JwtPayload;

    const userId = decodedToken.userId;
    const user = await users.get(userId);
    delete user.password;

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return NextResponse.json(null, { status: 500 });
  }
}
