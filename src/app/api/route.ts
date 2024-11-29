import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json(null, { status: 401 });
  }
  const decodedToken = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY!
  ) as JwtPayload;

  if (!decodedToken) {
    return NextResponse.json(null, { status: 401 });
  }

  const userId = decodedToken.userId;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const { password: _, ...rest } = user!;
  return NextResponse.json(rest, { status: 200 });
}
