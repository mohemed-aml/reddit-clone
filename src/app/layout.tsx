// /src/app/layout.tsx
'use client'
import { RecoilRoot } from "recoil";
import Navbar from "../components/Navbar/Navbar";
import "./globals.css";
import { Providers } from './providers';

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/images/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/images/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
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