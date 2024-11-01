import { NextResponse } from "next/server";
import { storage, ID } from "@/app/api";

export async function POST(req: Request) {
  // URL de l'image par défaut
  let imageUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/6721f2b1000f121db4d7/view?project=${process.env.APPWRITE_PROJECTID}`;

  try {
    // Vérification si la requête contient bien un FormData (multipart/form-data)
    if (req.headers.get("content-type")?.includes("multipart/form-data")) {
      const formData = await req.formData();

      // Vérification si "picture" est bien présent et que ce n'est pas un fichier vide
      const picture = formData.get("picture") as File | null;
      if (picture && picture.size > 0) {
        // Si un fichier non vide est présent, on le charge dans le bucket
        const fileUpload = await storage.createFile(
          `${process.env.APPWRITE_BUCKETID}`,
          ID.unique(),
          picture
        );

        // Mettre à jour l'URL avec le lien du fichier uploadé
        imageUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/${fileUpload.$id}/view?project=${process.env.APPWRITE_PROJECTID}`;
      }
    }

    // Retourne l'URL (soit celle par défaut, soit celle du fichier uploadé)
    return NextResponse.json({ imageUrl }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'upload de l'image :", error);
    return NextResponse.json(
      { message: "Erreur lors de l'upload de l'image", error },
      { status: 500 }
    );
  }
}
