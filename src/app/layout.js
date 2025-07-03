import "./globals.css";
import { UserProvider } from "./contexts/UserContext";
import { AuthProvider } from "./contexts/AuthContext";

import { Poppins } from "next/font/google";

const gfont = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Hotel",
  description: "Book your dream package now",
  openGraph: {
    title: "Travel and Enjoy",
    description: "Book your dream package now!",
    url: "https://travel-mvp-dev.vercel.app/admin",
    alternates: {
      canonical: "https://travel-mvp-dev.vercel.app/admin",
    },
    siteName: "Travel and Enjoy",
    images: [
      {
        url: "/travel-preview.png",
        width: 1200,
        height: 630,
        alt: "Twitter ",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel and Enjoy",
    description: "Book your dream package now!",
    images: ["/travel-preview.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${gfont.className}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
