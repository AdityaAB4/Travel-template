// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// export const metadata = {
//   title: "Hotel",
//   description: "Book your dream package now",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={``}>{children}</body>
//     </html>
//   );
// }

// app/layout.tsx

import "./globals.css";
import { UserProvider } from "./contexts/UserContext";

export const metadata = {
  title: "Hotel",
  description: "Book your dream package now",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
