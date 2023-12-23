import { EdgeStoreProvider } from "@/src/lib/edgestore";
import { ClerkProvider } from "@clerk/nextjs";
import { Open_Sans } from "next/font/google";
import { cn } from "@/src/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

import ModalProvider from "@/src/components/providers/ModalProvider";
import ThemeProvider from "@/src/components/providers/ThemeProvider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team chat application",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "flex bg-white dark:bg-[#313338]")}>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              storageKey="discord-theme"
            >
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
