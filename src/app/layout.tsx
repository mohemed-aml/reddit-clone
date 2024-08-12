// /src/app/layout.tsx

'use client'
import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";
import Navbar from "../components/Navbar/Navbar";
import "./globals.css";
import { Providers } from './providers';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRoot>
          <Providers>
            <Navbar/>
            {children}
          </Providers>
        </RecoilRoot>
        
      </body>
    </html>
  );
}