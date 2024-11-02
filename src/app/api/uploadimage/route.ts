import { NextResponse } from "next/server";
import { storage, ID, users } from "@/app/api";

export async function POST(req: Request) {
  let imageUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/6721f2b1000f121db4d7/view?project=${process.env.APPWRITE_PROJECTID}`;

  if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
    return NextResponse.json(
      { message: "Veuillez fournir toutes les informations requises." },
      { status: 400 }
    );
  }

  const formData = await req.formData();

  const userId = formData.get("userId")?.toString() || "";
  const dateOfBirth = formData.get("dateOfBirth")?.toString() || "";
  const gender = formData.get("gender")?.toString() || "";
  const bio = formData.get("bio")?.toString() || "";

  if (!userId || !dateOfBirth || !gender || !bio) {
    return NextResponse.json(
      { message: "Veuillez fournir toutes les informations requises." },
      { status: 400 }
    );
  }

  try {
    const picture = formData.get("picture") as File | null;
    if (picture && picture.size > 0) {
      const fileUpload = await storage.createFile(
        `${process.env.APPWRITE_BUCKETID}`,
        ID.unique(),
        picture
      );

      imageUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/${fileUpload.$id}/view?project=${process.env.APPWRITE_PROJECTID}`;
    }

    await users.updatePrefs(userId, {
      dateOfBirth,
      gender,
      bio,
      picture: imageUrl,
    });

    const newUser = await users.get(userId);
    delete newUser.password; // Suppression du mot de passe pour plus de sécurité

    return NextResponse.json({ ...newUser }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image :", error);
    return NextResponse.json(
      { message: "Erreur lors de l'upload de l'image", error },
      { status: 500 }
    );
  }
}
