import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { MinorLogo } from "@/components/Logo";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Show Time",
  description: "Show us our talent!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={GeistSans.className}>
      <body className="text-foreground">
        {children}
      </body>
    </html>
  );
}
