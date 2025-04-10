import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Solway } from "next/font/google";
import Provider from "./Provider";

const gaegu = localFont({
  src: [
    {
      path: "../../public/fonts/gaegu/Gaegu-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/gaegu/Gaegu-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/gaegu/Gaegu-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gaegu",
  display: "swap",
});

const solway = Solway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-solway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | Abhishek",
  description:
    "Abhishek Khati is a student and a software developer mostly proficient in frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gaegu.variable} ${solway.variable}`}>
      <body className={`antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
