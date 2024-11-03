import { NextResponse } from "next/server";
import { storage, users, ID } from "@/app/api";
import { Query } from "appwrite";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    // Vérification si la requête contient du JSON ou du multipart/form-data
    if (req.headers.get("content-type")?.includes("multipart/form-data")) {
      const formData = await req.formData();

      const email = formData.get("email")?.toString() || "";
      const password = formData.get("password")?.toString() || "";
      const name = formData.get("name")?.toString() || "";
      const dateOfBirth = formData.get("dateOfBirth")?.toString() || "";
      const gender = formData.get("gender")?.toString() || "";
      const bio = formData.get("bio")?.toString() || "";
      console.log(email, password, name, dateOfBirth, gender, bio);

      // Vérification des champs obligatoires
      if (!email || !password || !name || !dateOfBirth || !gender || !bio) {
        return NextResponse.json(
          { message: "Tous les champs sont requis." },
          { status: 400 }
        );
      }

      // Vérification de l'unicité de l'email
      const response = await users.list([Query.equal("email", email)]);
      if (response.total === 1) {
        return NextResponse.json(
          { message: "Cette adresse email est déjà utilisée" },
          { status: 400 }
        );
      }

      // Hash du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Création de l'utilisateur
      const user = await users.createBcryptUser(
        ID.unique(),
        email,
        hashedPassword,
        name
      );

      // Gestion de l'upload de l'image de profil
      let imageUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/6721f2b1000f121db4d7/view?project=${process.env.APPWRITE_PROJECTID}`;
      const picture = formData.get("picture") as File | null;

      if (picture && picture.size > 0) {
        const fileUpload = await storage.createFile(
          process.env.APPWRITE_BUCKETID!,
          ID.unique(),
          picture
        );

        imageUrl = `${process.env.APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_BUCKETID}/files/${fileUpload.$id}/view?project=${process.env.APPWRITE_PROJECTID}`;
      }

      // Calcul de l'âge à partir de la date de naissance
      const age = calculateAge(dateOfBirth);

      // Mise à jour des préférences de l'utilisateur
      await users.updatePrefs(user.$id, {
        dateOfBirth,
        age,
        gender,
        bio,
        picture: imageUrl,
      });

      // Récupération de l'utilisateur mis à jour
      const updatedUser = await users.get(user.$id);
      delete updatedUser.password; // Suppression du mot de passe pour plus de sécurité

      return NextResponse.json({ ...updatedUser }, { status: 200 });
    } else {
      return NextResponse.json(
        {
          message:
            "Veuillez fournir les données au format multipart/form-data.",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    return NextResponse.json(
      { message: "Erreur lors de la création de l'utilisateur", error },
      { status: 500 }
    );
  }
}

// Fonction pour calculer l'âge à partir de la date de naissance
function calculateAge(dateOfBirth: string): number {
  const [day, month, year] = dateOfBirth.split("/").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthDate.getFullYear();

  const birthdayNotYetOccurred =
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate());

  if (birthdayNotYetOccurred) {
    age -= 1;
  }
  return age;
}
