import { Inter, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const roboto = Inter({
  variable: "--font-roboto",
  subsets: ["latin"]
});

const grotesk = Hanken_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${grotesk.variable}`}>
      <body className="font-roboto text-stone-700">
        {children}
      </body>
    </html>
  );
}
