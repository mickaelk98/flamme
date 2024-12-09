"use server";

import prisma from "@/lib/prisma";

export async function getAllUsers() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      birthDate: true,
      age: true,
      gender: true,
      bio: true,
      picture: true,
      createdAt: true,
    },
  });
  return users;
}
