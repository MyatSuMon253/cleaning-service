import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tidy Home | A little lighter, a lot brighter",
  description: "Thoughtful home cleaning, made wonderfully simple. Book trusted home cleaners with Tidy Home.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
