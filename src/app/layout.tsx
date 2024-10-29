import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flamme - Rencontres en ligne : Swipez, Matchez et Trouvez l'Amour !",
  description:
    "Flamme - Le site de rencontre moderne pour des célibataires prêts à trouver leur moitié. Swipez, matchez et engagez la conversation avec des personnes près de chez vous. Rejoignez Flamme pour une expérience de rencontre simple, rapide et authentique !",
  icons: "/flamme.webp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className="flex flex-col h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/landing.jpg")' }}
      >
        {children}
      </body>
    </html>
  );
}
