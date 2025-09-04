import "../app/globals.css"; 
import { ReactNode } from "react";

export const metadata = {
  title: "School Project",
  description: "Next.js + MySQL app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
