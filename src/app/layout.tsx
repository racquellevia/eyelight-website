import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { site } from "@/lib/site";
import { ACTIVE_THEME } from "@/lib/theme";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  icons: {
    icon: "/logorev2.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sans.variable} data-theme={ACTIVE_THEME}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
