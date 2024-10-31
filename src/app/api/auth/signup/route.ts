// src/app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { users } from "@/app/api";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  try {
    const user = await users.create(
      ID.unique(),
      email,
      undefined,
      password,
      name
    );
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la création de l'utilisateur", error },
      { status: 500 }
    );
  }
}
