export const metadata = {
  title: "Admin",
  description: "Admin | Travel and Enjoy",
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

export default function AdminLayout({ children }) {
  return <div className={``}>{children}</div>;
}
