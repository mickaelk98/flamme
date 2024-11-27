"use server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { SignupUser, LoginUser } from "@/app/Interfaces";
import { storage, ID } from "@/lib/appwrite";

export async function createUser(data: SignupUser) {
  const { email, password, name, bio, gender, birthDate } = data;

  // verifie si tous les champs sont remplis
  if (!email || !password || !name || !birthDate || !gender || !bio) {
    return { message: "Tous les champs sont requis." };
  }

  // verifie si l'email est deja utilise
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (user) {
    return { message: "Cette adresse email est deja utilisée", name: "email" };
  }

  // verifie si il y a une image et si elle est valide et gestion de l'upload
  let imageUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/6721f2b1000f121db4d7/view?project=${process.env.APPWRITE_PROJECTID}`;
  if (data.picture && data.picture.size > 0) {
    const fileUpload = await storage.createFile(
      process.env.APPWRITE_BUCKETID!,
      ID.unique(),
      data.picture
    );

    imageUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/${fileUpload.$id}/view?project=${process.env.APPWRITE_PROJECTID}`;
  }

  // converte la date de naissance en age
  const age = calculateAge(birthDate);

  if (age < 16) {
    return { message: "Vous devez avoir au moins 16 ans", name: "age" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newData = {
    ...data,
    password: hashedPassword,
    picture: imageUrl,
    age,
  };
  const newUser = await prisma.user.create({ data: newData });
  const { password: _, ...rest } = newUser;

  return { message: "Inscription reussie", rest };
}

export async function login(data: LoginUser) {
  const { email, password } = data;
  const cookieStore = await cookies();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { message: "Identifiant ou mot de passe incorrect" };
  } else {
    const userPassword = user.password;
    const validPassword = await bcrypt.compare(password, userPassword);
    const { password: _, ...rest } = user;

    if (!validPassword) {
      return { message: "Identifiant ou mot de passe incorrect" };
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: 3600 * 24 * 7,
    });
    cookieStore.set("token", token);

    return { message: "Connexion reussie", rest };
  }
}

function calculateAge(date: string): number {
  const [year, month, day] = date.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // Vérifier si l'anniversaire est passé cette année
  const birthdayNotYetOccurred =
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate());

  if (birthdayNotYetOccurred) {
    age -= 1;
  }

  return age;
}
