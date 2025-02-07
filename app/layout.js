import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@components/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Paisa Tracker",
  description:
    "Paisa Tracker is your simple, effective tool for managing personal finances. From tracking expenses to setting savings goals, we help you stay on top of your money and make smarter financial decisions.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
