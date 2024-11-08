import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "components/navbar/TopBar";
import { getSession } from "app/lib/statless-session";
import {Provider} from '../../src/components/Providers'
import { usePresenceChannel } from "./hooks/usePresenceChannel";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body>
        <Provider>
          <TopBar initialSession={session} />
          <main className='container mx-auto'>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}